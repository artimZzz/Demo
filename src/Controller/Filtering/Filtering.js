import { isString, isArray } from '../Type/TypeChecking'

/* private */
const __compare = (checkedVal, value) => {
    return checkedVal.toLowerCase().indexOf(value.toLowerCase()) != -1;
}

const __recursiveMatch = (input, data, keys) => {
    if (keys.length == 1) {
        let checkedVal = data[keys[0]];
        if (isArray(checkedVal)) {
            for (let i = 0; i < checkedVal.length; i ++) {
                let __checkedVal = checkedVal[i];
                if (__compare(__checkedVal, input)) {
                    return data;
                }
            }
        }
        else if (isString(checkedVal)) {
            if (__compare(checkedVal, input)) {
                return data;
            }
        }
        return null;
    }

    let nextData = data[keys[0]];
    let nextKeys = keys.splice(1);
    if (nextData === undefined) {
        return null;
    }
    else if (isArray(nextData)) {
        for (let i = 0; i < nextData.length; i++) {
            return __recursiveMatch(input, nextData[i], nextKeys);
        }
    }
    return __recursiveMatch(input, nextData, nextKeys);
}

/* public */

/**
 * 
 * @param {string} input 
 * @param {Array} list 
 * @param {Array} keys 
 * @param {Boolean} fillOnNoInput 
 */
export const filterMatch = (input, list, keys, fillOnNoInput = true) => {
    let results = [];
    if (
        input &&
        input.length > 0 &&
        isArray(list)
    ) {
        if (!isArray(keys)) {
            keys = [keys];
        }
        list.map(
            (data) => {
                for (let k = 0; k < keys.length; k++) {
                    let key = keys[k];
                    let matched = __recursiveMatch(input, data, key.split('>'));
                    if (matched !== null) {
                        results.push(data);
                        break;
                    }
                }
            }
        );
    }
    else {
        results = (fillOnNoInput ? [...list] : []);
    }
    return results;
}

export default filterMatch;