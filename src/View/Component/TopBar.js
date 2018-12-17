import React, { Component, PureComponent } from 'react';
import { ViewPropTypes, StyleSheet, Animated, View } from 'react-native';
import TouchableDebounce from './TouchableDebounce';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import { ifAndroid, ifIPhoneX } from '../../Controller/Device/DeviceCheck';

export default class TopBar extends PureComponent {

    /* render */
    render() {
        let leftButton = this.props.leftButton ? this.props.leftButton : <View />;
        if (this.props.backCallback) {
            leftButton = (
                <TouchableDebounce style={styles.back_touch} onPress={this.props.backCallback}>
                    <Ionicons name='ios-arrow-back' style={styles.back_icon} size={30} />
                </TouchableDebounce>
            );
        }
        let rightButton = this.props.rightButton ? this.props.rightButton : <View />;
        let children = this.props.children ? this.props.children : <View />;
        return (
            <Animated.View style={[styles.app_top_bar, this.props.style]}>
                <View style={styles.left_button}>{leftButton}</View>
                {children}
                <View style={styles.right_button}>{rightButton}</View>
            </Animated.View>
        );
    }
}

/* style */
const styles = StyleSheet.create(
    {
        app_top_bar: {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#eee',
            ...ifAndroid(
                { paddingTop: 25 },
                ifIPhoneX({ paddingTop: 40 }, { paddingTop: 25 })
            ),
            paddingBottom: 5,
            width: '100%'
        },
        back_touch: {
            width: '100%',
            paddingRight: 30
        },
        back_icon: {
            color: 'white'
        },
        left_button: {
            position: 'absolute',
            ...ifAndroid(
                { paddingTop: 25 },
                ifIPhoneX({ paddingTop: 40 }, { paddingTop: 25 })
            ),
            left: 10
        },
        right_button: {
            position: 'absolute',
            ...ifAndroid(
                { paddingTop: 25 },
                ifIPhoneX({ paddingTop: 40 }, { paddingTop: 25 })
            ),
            right: 10
        }
    }
);

TopBar.propTypes = {
    backCallback: PropTypes.func,
    style: ViewPropTypes.style
};
TopBar.defaultProps = {
    style: {}
};