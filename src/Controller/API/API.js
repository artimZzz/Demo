import { API_URL, NOTIFICATION } from '../../Config/Variables';
import { save, read, removeByKeys } from '../Saving/SaveController';
import NotificationController from '../Notification/NotificationController';
import log from '../Logger/Logger';
import moment from 'moment';

export default class API {

    /* constructor */
    constructor() {
        this.action = '';
        this.parameters = {};
        this.callback = null;
        this.requestUrl = API_URL;
        this.customUrl = null;
        this.showLoading = true;
        this.supportCaching = true;
        this.forceOnline = false;
    }

    /* public */

    /**
     * 
     * @param {string} action 
     * @param {Direction} parameters 
     * @param {Function { success: {}, fail: {} }} callback
     */
    prepare(action, parameters, callback) {
        this.action = action;
        this.parameters = parameters;
        this.callback = callback;
    }

    /**
     * 
     * @param {Function e.g. { success: {}, fail: {} }} callback 
     */
    startAPI(callback = null) { }

    /**
     * 
     * @param {string} action 
     * @param {Dictionary} parameters 
     * @param {Function} callback 
     */
    get(action, parameters, callback) {
        this.fetchData('GET', action, parameters, callback);
    }

    /**
     * 
     * @param {string} action 
     * @param {Dictionary} parameters 
     * @param {Function} callback 
     */
    post(action, parameters, callback) {
        this.fetchData('POST', action, parameters, callback);
    }

    /* private */
    fetchData(method, action, parameters, callback) {
        /* show loading on fetching */
        if (parameters['invisible_fetching']) {
            this.showLoading = false;
        }

        /* support local caching */
        this.supportCaching = parameters['support_caching'] ? true : false;

        /* force fetching online */
        let forceOnline = parameters['force_online'] ? true : false;

        this.trimLocalParameters(parameters);

        let requestURL = this.getRequestURL() + action;
        let data = { ...parameters, ...this.defaultData() };
        let body = (method === 'POST' ? JSON.stringify(data) : '');
        let requestParams = Object.entries(data).map(([key, val]) => `${key}=${val}`).join('&');

        log('API Request [' + method + '][' + requestURL + ']', requestParams);
        if (forceOnline) {
            let cachingKey = requestURL + '?' + requestParams;
            this.fetchOnline(requestURL, method, requestParams, body, cachingKey, callback);
        }
        else {
            this.fetch(requestURL, method, requestParams, body, callback);
        }
    }

    trimLocalParameters(parameters) {
        let localKeys = ['invisible_fetching', 'support_caching', 'force_online'];
        for (let i = 0; i < localKeys.length; i++) {
            let key = localKeys[i];
            if (parameters[key] !== undefined) {
                delete parameters[key];
            }
        }
    }

    getRequestURL() {
        if (this.customUrl) {
            return this.customUrl;
        }
        else {
            return this.requestUrl;
        }
    }

    fetch(requestURL, method, requestParams, body, callback) {
        let cachingKey = requestURL + '?' + requestParams;
        this.readFromCache(
            cachingKey,
            (response) => {
                if (response !== undefined) {
                    log('API Cached Result [' + method + '][' + requestURL + ']', response);
                    if (callback && callback.success) {
                        try {
                            callback.success(response);
                        }
                        catch (error) {}
                    }
                }
                else {
                    this.fetchOnline(requestURL, method, requestParams, body, cachingKey, callback);
                }
            }
        );
    }

    fetchOnline(requestURL, method, requestParams, body, cachingKey, callback) {
        if (this.showLoading) {
            NotificationController.getInstance().fireCallback(NOTIFICATION.LAYOUT_TOGGLE_LOADING, { visible: true });
        }

        fetch(
            requestURL + (method === 'GET' ? ('?' + requestParams) : ''),
            {
                method: method,
                dataType: 'json',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    ...this.defaultHeader()
                },
                body: body
            }
        ).then(response => {
            return response.json();
        }
        ).then(responseData => {
            log('API Result [' + method + '][' + requestURL + ']', responseData);

            if (this.supportCaching && responseData) {
                this.saveAsCache(cachingKey, responseData);
            }

            if (this.showLoading) {
                NotificationController.getInstance().fireCallback(NOTIFICATION.LAYOUT_TOGGLE_LOADING, { visible: false });
            }
            if (callback && callback.success) {
                try {
                    callback.success(responseData);
                }
                catch (error) {}
            }
        }
        ).catch(error => {
            if (this.showLoading) {
                NotificationController.getInstance().fireCallback(NOTIFICATION.LAYOUT_TOGGLE_LOADING, { visible: false });
            }
            if (callback && callback.fail) {
                try {
                    callback.fail(error);
                }
                catch (error) {}
            }
        }
        ).done();
    }

    defaultData() {
        return {};
    }

    defaultHeader() {
        return {
            'Cache-Control': 'no-cache'
        };
    }

    readFromCache = (cachingKey, callback) => {
        cachingKey = cachingKey.replace(/[\/:-?&_.,]/g, '');
        read(
            'api', cachingKey,
            {
                success: (item) => {
                    let responseData = JSON.parse(item);
                    let expiryTime = { value: 1, unit: 'day' }
                    let cachedTime = moment(responseData['cached_time']).add(expiryTime.value, expiryTime.unit);
                    if (cachedTime.isAfter(moment(new Date()))) {
                        callback(responseData);
                        return;
                    }
                    else {
                        removeByKeys(['api@' + cachingKey], {});
                    }
                },
                nodata: () => {
                    callback(undefined);
                },
                error: (error) => {
                    callback(undefined);
                }
            }
        );
    }

    saveAsCache = async (cachingKey, responseData) => {
        responseData['cached_time'] = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        cachingKey = cachingKey.replace(/[\/:-?&_.,]/g, '');
        save('api', cachingKey, JSON.stringify(responseData));
    }
}
