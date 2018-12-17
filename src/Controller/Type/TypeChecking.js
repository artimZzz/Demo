/* public */

/**
 * 
 * @param {*} input 
 */
export const isString = (input) => {
    if (input && (typeof (input) === 'string')) {
        return true;
    }
    return false;
}

/**
 * 
 * @param {*} input 
 */
export const isNonEmptyString = (input) => {
    if (isString(input) && input.length > 0) {
        return true;
    }
    return false;
}

/**
 * 
 * @param {*} input 
 */
export const isArray = (input) => {
    if (input && input instanceof Array) {
        return true;
    }
    return false;
}