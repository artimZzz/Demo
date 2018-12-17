/* public */
export const log = (title, message) => {
    if (false && __DEV__) {
        console.log('### ' + title + ' ###');
        console.log(message);
    }
}

export default log;