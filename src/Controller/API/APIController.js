import AppleAPI from './AppleAPI/AppleAPI';
import { isNonEmptyString, isArray, isString } from '../Type/TypeChecking';
import { NOTIFICATION } from '../../Config/Variables';
import NotificationController from '../Notification/NotificationController';

const proxyClass = {
    AppleAPI
};

/* add api above */
class DynamicAPI {
    constructor(apiName) {
        return new proxyClass[apiName]();
    }
}

const apiQuery = [];
const apiWorking = [];
const startNextAPI = () => {
    // if (apiWorking.length == 0 && apiQuery.length == 1) {
    //     NotificationController.getInstance().fireCallback(NOTIFICATION.LAYOUT_TOGGLE_LOADING, { visible: true });
    // }

    if (apiWorking.length == 0 && apiQuery.length > 0) {
        let nextApi = apiQuery[0];
        apiWorking.push(nextApi);
        try {
            nextApi.startAPI(
                {
                    success: (responseData) => {
                        if (nextApi.callback && nextApi.callback.success) {
                            nextApi.callback.success(responseData);
                        }
                        apiQuery.splice(0, 1);
                        apiWorking.pop();
                        startNextAPI();
                    },
                    fail: (error) => {
                        if (nextApi.callback && nextApi.callback.fail) {
                            nextApi.callback.fail(error);
                        }
                        apiQuery.splice(0, 1);
                        apiWorking.pop();
                        startNextAPI();
                    }
                }
            );
        }
        catch {
            if (nextApi.callback && nextApi.callback.fail) {
                nextApi.callback.fail(null);
            }
            apiQuery.splice(0, 1);
            apiWorking.pop();
        }
    }

    // if (apiWorking.length == 0 && apiQuery.length == 0) {
    //     NotificationController.getInstance().fireCallback(NOTIFICATION.LAYOUT_TOGGLE_LOADING, { visible: false });
    // }
}

/* public */

/**
 * 
 * @param {string} className 
 * @param {string} action 
 * @param {Dictionary} parameters 
 * @param {Function { success: {}, fail: {} }} callback 
 */
export const startAPI = (className, action, parameters, callback) => {
    if (isNonEmptyString(className) && isString(action) && parameters) {
        let api = new DynamicAPI(className);
        api.prepare(action, parameters, callback);
        api.startAPI(callback);
        // apiQuery.push(api);
        // startNextAPI();
    }
}

export const cancelAllAPI = () => {
    apiQuery.splice(0, apiQuery.length);
    apiWorking.pop();
}