import { AsyncStorage } from 'react-native';
import { isString, isArray } from '../Type/TypeChecking';

/* public */

/**
 * 
 * @param {string} type 
 * @param {string} key 
 * @param {string} value 
 */
export const save = async (type, key, value) => {
    if (isString(type) && isString(key) && isString(value)) {
        try {
            await AsyncStorage.setItem(type + '@' + key, value);
        }
        catch (error) {
            console.log(error);
        }
    }
}

/**
 * 
 * @param {string} type 
 * @param {string} key 
 * @param {Function { success: {}, nodata: {}, error: {} }} callback 
 */
export const read = (type, key, callback) => {
    if (isString(type) && isString(key)) {
        AsyncStorage.getItem(type + '@' + key).then(
            (item) => {
                if (item && callback && callback.success) {
                    callback.success(item);
                }
                else if (callback && callback.nodata) {
                    callback.nodata();
                }
            }
        ).catch(
            (error) => {
                if (callback && callback.error) {
                    callback.error(error);
                }
            }
        );
    }
}

/**
 * 
 * @param {Array} types
 * @param {Function { success: {}, nodata: {}, error: {} }} callback 
 */
export const removeByTypes = (types, callback) => {
    if (isArray(types)) {
        AsyncStorage.getAllKeys(
            (err, keys) => {
                let removeKeys = [];
                for (let i = 0; i < keys.length; i++) {
                    let key = keys[i];
                    for (let k = 0; k < types.length; k++) {
                        let type = types[k];
                        if (key.startsWith(type + '@')) {
                            removeKeys.push(key);
                        }
                    }
                }
                if (removeKeys.length > 0) {
                    AsyncStorage.multiRemove(
                        removeKeys,
                        (err, stores) => {
                            if (callback && callback.success) {
                                callback.success();
                            }
                        }
                    );
                }
                else {
                    if (callback && callback.success) {
                        callback.success();
                    }
                }
            }
        );
    }
}

/**
 * 
 * @param {Array} fullKeys
 * @param {Function { success: {}, nodata: {}, error: {} }} callback 
 */
export const removeByKeys = (fullKeys, callback) => {
    if (isArray(fullKeys)) {
        AsyncStorage.getAllKeys(
            (err, keys) => {
                let removeKeys = [];
                fullKeys.map(
                    (fullKey) => {
                        for (let i = 0; i < keys.length; i++) {
                            let key = keys[i];
                            if (key === fullKey) {
                                removeKeys.push(key);
                            }
                        }
                    }
                )
    
                if (removeKeys.length > 0) {
                    AsyncStorage.multiRemove(
                        removeKeys,
                        (err, stores) => {
                            if (callback && callback.success) {
                                callback.success();
                            }
                        }
                    );
                }
                else {
                    if (callback && callback.success) {
                        callback.success();
                    }
                }
            }
        );
    }
}