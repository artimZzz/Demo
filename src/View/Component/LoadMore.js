import React, { Component, PureComponent } from 'react';
import { StyleSheet, Animated, View, Easing } from 'react-native';

export default class LoadMore extends PureComponent {

    /* constructor */
    constructor(props) {
        super(props);
        this.state = { animation: new Animated.Value(0) }
        this.loadingMore = false;
        this.animating = false;
    }

    /* render */
    render() {
        let opacity = this.state.animation.interpolate(
            {
                inputRange: [0, 0.5, 1],
                outputRange: [0, 1, 0]
            }
        );
        return (
            <Animated.View style={[styles.loadMore, { opacity: opacity }]}>
                {this.props.children}
            </Animated.View>
        );
    }

    /* public */
    startAnimation() {
        if (!this.animating) {
            this.animating = true;
            Animated.timing(this.state.animation).stop();
            this.performAnimation();
        }
        this.loadingMore = true;
    }
    
    stopAnimation() {
        this.loadingMore = false;
    }

    /* private */
	performAnimation() {
		this.state.animation.setValue(0);
		Animated.timing(
			this.state.animation,
			{ toValue: 1.0, duration: 1000, easing: Easing.linear }
		).start(
			() => {
				if (this.loadingMore) {
					this.performAnimation();
                }
                else {
                    this.animating = false;
                }
			}
		);
	}
}

/* style */
const styles = StyleSheet.create(
    {
        loadMore: {
            width: '100%', alignItems: 'center', paddingVertical: 10
        }
    }
);