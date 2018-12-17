import React, { Component, PureComponent } from 'react';

import { Animated, Easing, View } from 'react-native';

export default class BouncingView extends PureComponent {

    /* constructor */
    constructor(props) {
        super(props);
        this.duration = 200;
        this.state = { animation: new Animated.Value(0) };
    }

    /* component */
    componentWillMount() {
        this.initAnimation();
    }

    /* render */
    render() {
        let scale = this.state.animation.interpolate(
            {
                inputRange: [0, 0.3, 0.6, 1.0],
                outputRange: [1.0, 0.7, 1.2, 1.0]
            }
        );
        return (
            <Animated.View style={[this.props.style, { transform: [{ scaleX: scale }, { scaleY: scale }] }]}>
                {this.props.children}
            </Animated.View>
        );
    }

    /* public */
    performAnimation() {
        this.initAnimation();
    }

    /* private */
    initAnimation() {
        this.state.animation.setValue(0);
        Animated.timing(
            this.state.animation,
            { toValue: 1, duration: this.duration, easing: Easing.linear }
        ).start();
    }
}