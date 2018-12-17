import { isString, isArray } from '../Type/TypeChecking';

export default class NotificationController {

    /* var */
    static instance;

    /* static */
    static getInstance() {
        if (!this.instance) {
            this.instance = new NotificationController();
        }
        return this.instance;
    }

    /* constructor */
    constructor() {
        this.callbackDict = [];
    }

    /* public */

    /**
     * 
     * @param {Component} ref 
     * @param {string} key 
     */
    registerCallback(ref, key) {
        if (ref && isString(key)) {
            let refArray = this.callbackDict[key];
            if (!refArray) {
                refArray = [];
            }
            this.callbackDict[key] = [...refArray, ref];
        }
    }

    /**
     * 
     * @param {Component} ref 
     * @param {string} key 
     */
    removeCallback(ref, key) {
        if (ref && isString(key)) {
            let refArray = this.callbackDict[key];
            if (refArray) {
                for (let i = 0; i < refArray.length; i++) {
                    let __ref = refArray[i];
                    if (__ref === ref) {
                        refArray.splice(i, 1);
                        break;
                    }
                }
            }
        }
    }

    /**
     * 
     * @param {string} key 
     * @param {Dictionary} value 
     */
    fireCallback(key, value) {
        if (isString(key) && value) {
            let refArray = this.callbackDict[key];
            if (refArray) {
                for (let i = 0; i < refArray.length; i++) {
                    let ref = refArray[i];
                    if (ref && ref.callbackFired) {
                        ref.callbackFired(key, value);
                    }
                }
            }
        }
    }

}