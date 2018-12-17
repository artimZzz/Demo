import React, { Component, PureComponent } from 'react';
import { StyleSheet, Animated, View, Easing, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

/* container */
export default class Loading extends PureComponent {

    /* constructor */
    constructor(props) {
        super(props);
        this.state = { refreshing: false };
        this.assignLoadingRef = (ref) => this.loadingRef = ref;
    }

    /* render */
    render() {
        if (this.state.refreshing) {
            return (
                <LoadingComponent ref={this.assignLoadingRef} stopCallback={this.animationStopCallback} />
            );
        }
        return <View />;
    }

    /* public */
    show() {
        this.setState({ refreshing: true });
    }

    hide() {
        if (this.loadingRef) {
            this.loadingRef.stopAnimation();
        }
    }

    animationStopCallback = () => {
        this.setState({ refreshing: false });
    }
}

/* display */
class LoadingComponent extends PureComponent {

    /* constructor */
    constructor(props) {
        super(props);

        /* variables */
        this.duration = 2000;
        this.stop = false;
        this.state = { floatingAnimation: new Animated.Value(0) };
    }

    /* component */
    componentWillMount() {
        this.startAnimation();
    }

    /* render */
    render() {
        let rotate = this.state.floatingAnimation.interpolate(
            {
                inputRange: [0, 1],
                outputRange: ['0deg', '720deg']
            }
        );
        return (
            <View style={styles.full_size}>
                <View style={styles.loading_container}>
                    <Animated.View style={{ transform: [{ rotate: rotate }] }}>
                        <MaterialCommunityIcons name='autorenew' size={22} style={{ color: '#26ccdc' }} />
                    </Animated.View>
                </View>
            </View>
        );
    }

    /* private */
    startAnimation() {
        this.state.floatingAnimation.setValue(0);
        Animated.timing(
            this.state.floatingAnimation,
            { toValue: 1.0, duration: this.duration, easing: Easing.linear }
        ).start(
            () => {
                if (!this.stop) {
                    this.startAnimation();
                }
                else {
                    if (this.props.stopCallback) {
                        this.props.stopCallback();
                    }
                }
            }
        );
    }

    stopAnimation() {
        this.stop = true;
    }
}

/* vars */
const { width, height } = Dimensions.get('window');

/* style */
const styles = StyleSheet.create(
    {
        full_size: {
            position: 'absolute',
            width: width,
            height: height,
            alignItems: 'center',
            justifyContent: 'center',
        },
        loading_container: {
            borderRadius: 8,
            backgroundColor: '#000000cc',
            width: 50,
            aspectRatio: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }
    }
);

LoadingComponent.propTypes = {
    stopCallback: PropTypes.func
};