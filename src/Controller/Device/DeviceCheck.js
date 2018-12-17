import { Dimensions, Platform } from 'react-native';

/* public */
export const isIPhoneX = () => {
    const { height, width } = Dimensions.get('window');
    return (
        Platform.OS === 'ios' && (height == 812 || width == 812 || height == 896 || width == 896)
    );
}

export const isIPhoneMax = () => {
    const { height, width } = Dimensions.get('window');
    return (
        Platform.OS === 'ios' && (height == 896 || width == 896)
    );
}

export const isPad = () => {
    return Platform.isPad;
}

export const isAndroid = () => {
    return Platform.OS !== 'ios';
}

export const ifIPhoneX = (value, elseVal) => {
    if (isIPhoneX()) {
        return value;
    }
    return elseVal;
}

export const ifIPhoneMax = (value, elseVal) => {
    if (isIPhoneMax()) {
        return value;
    }
    return elseVal;
}

export const ifPad = (value, elseVal) => {
    if (isPad()) {
        return value;
    }
    return elseVal;
}

export const ifAndroid = (value, elseVal) => {
    if (isAndroid()) {
        return value;
    }
    return elseVal;
}