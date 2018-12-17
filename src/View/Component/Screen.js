import React, { Component, PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { NOTIFICATION } from '../../Config/Variables';
import NotificatonController from '../../Controller/Notification/NotificationController';

export default class Screen extends PureComponent {

    static navigationOptions = {
        title: '',
        header: <View />,
        headerStyle: { backgroundColor: '#f4511e' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
    };

    constructor(props) {
        super(props);
        this.notificationKeys = [NOTIFICATION.LAYOUT_ORIENTATION];
        if (this.props.navigation && this.props.navigation.addListener) {
            this.focusListener = this.props.navigation.addListener('willFocus', payload => this.componentWillFocus());
            this.blurListener = this.props.navigation.addListener('willBlur', payload => this.componentWillBlur());
        }
    }

    componentWillMount() {
        this.notificationKeys.map(
            (key) => {
                NotificatonController.getInstance().registerCallback(this, key);
            }
        );
    }

    componentWillUnmount() {
        if (this.focusListener) {
            this.focusListener.remove();
        }
        if (this.blurListener) {
            this.blurListener.remove();
        }
        this.notificationKeys.map(
            (key) => {
                NotificatonController.getInstance().removeCallback(this, key);
            }
        );
    }

    componentWillFocus() {

    }

    componentWillBlur() {

    }

    callbackFired(key, value) {
        
    }

    render() {
        return <View/>;
    }

    push(sceneName, parameters = {}) {
        parameters['parentScene'] = this;
        this.props.navigation.navigate(sceneName, parameters);
    }

    backAndPush(sceneName, parameters = {}) {
        let parentScene = this.props.navigation.state.params.parentScene;
        parentScene.isBackAndNavigating = true;
        this.goBack();
        setTimeout(
            () => {
                parentScene.isBackAndNavigating = false;
                parameters['parentScene'] = parentScene;
                parentScene.props.navigation.navigate(sceneName, parameters);
            },
            300
        );
    }

    // popover(sceneName, parameters = {}) {
    //     parameters['parentScene'] = this;
    //     TC_ObjectPool.getNavigation().navigate(sceneName, parameters);
    // }
}

const styles = StyleSheet.create(
    {

    }
);
