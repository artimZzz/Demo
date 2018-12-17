import React, { Component, PureComponent } from 'react';
import { FlatList, Animated } from 'react-native';
import { ifAndroid } from '../../Controller/Device/DeviceCheck';

const __AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export class AnimatedFlatList extends PureComponent {

    /* render */
    render() {
        const { 
            ref, initialNumToRender, maxToRenderPerBatch, removeClippedSubviews, windowSize, // abondon props
            forwardRef , ...otherProps // props using
        } = this.props;
        return (
            <__AnimatedFlatList
                {...otherProps}
                ref={forwardRef}
                initialNumToRender={10}
                maxToRenderPerBatch={20}
                removeClippedSubviews={true}
                windowSize={ifAndroid(12, 21)}
            />
        );
    }
}

export class CustomizedFlatList extends PureComponent {

    /* render */
    render() {
        const { 
            ref, initialNumToRender, maxToRenderPerBatch, removeClippedSubviews, windowSize, // abondon props
            forwardRef , ...otherProps // props using
        } = this.props;
        return (
            <FlatList
                {...otherProps}
                ref={forwardRef}
                initialNumToRender={10}
                maxToRenderPerBatch={20}
                removeClippedSubviews={true}
                windowSize={ifAndroid(12, 21)}
            />
        );
    }
}