import React, { Component, PureComponent } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { CachedImage } from 'react-native-cached-image';
import TouchableDebounce from '../../Component/TouchableDebounce';
import RatingView from '../../Component/RatingView';

export default class VerticalAppCell extends PureComponent {

    /* constructor */
    constructor(props) {
        super(props);
        this.state = { animation: new Animated.Value(0) }
        this.index = (this.props.index ? this.props.index : 0);
    }

    /* component */
    componentWillMount() {
        Animated.timing(
            this.state.animation,
            { toValue: 1, duration: 300, delay: 200, easing: Easing.linear }
        ).start();
    }

    /* render */
    render() {
        let paddingLeft = (this.props.paddingLeft ? this.props.paddingLeft : 0);
        let opacity = this.state.animation.interpolate(
            {
                inputRange: [0, 1],
                outputRange: [0, 1]
            }
        );
        let marginLeft = this.state.animation.interpolate(
            {
                inputRange: [0, 1],
                outputRange: [-10, 0]
            }
        );

        const item = (this.props.item ? this.props.item : null);
        const borderRadius = (this.index % 2 == 0 ? 12 : 500);
        if (item) {
            return (
                <View>
                    <Animated.View style={{ opacity: opacity, marginLeft: marginLeft }}>
                        <TouchableDebounce style={{ paddingLeft: paddingLeft }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomColor: '#eee', borderBottomWidth: 1 }}>
                                <View style={{ width: 35, alignItems: 'flex-start', justifyContent: 'center', paddingLeft: 2 }}>
                                    <Text style={{ fontSize: 18, color: '#777' }}>{this.index + 1}</Text>
                                </View>
                                <View style={{ width: 55, aspectRatio: 1, borderRadius: borderRadius, overflow: 'hidden', marginRight: 10 }}>
                                    <CachedImage style={{ width: '100%', height: '100%' }} source={{ uri: item.imageURL }} />
                                </View>
                                <View style={{ flex: 1, height: '100%', paddingTop: 5 }}>
                                    <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontSize: 14, color: '#333' }}>{item.name}</Text>
                                    <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontSize: 12, color: '#777', marginTop: 5 }}>{item.category}</Text>
                                    {this.renderRating(item)}
                                </View>
                            </View>
                        </TouchableDebounce>
                    </Animated.View>
                </View>
            );
        }
        return <View />;
    }

    renderRating = (item) => {
        let onRatingLayout = this.props.onRatingLayout ? this.props.onRatingLayout : () => { };
        let rating = 0;
        let ratingCount = 0;
        if (item.inited) {
            rating = item.rating;
            ratingCount = item.ratingCount;
        }
        return (
            <View ref={item.onReferenceView} onLayout={onRatingLayout}>
                <RatingView style={{ marginTop: 2 }} rating={rating} count={ratingCount} />
            </View>
        );
    }
}