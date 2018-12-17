import React, { Component, PureComponent } from 'react';
import { StyleSheet, Animated, Easing, View, Text } from 'react-native';
import { CachedImage } from 'react-native-cached-image';
import TouchableDebounce from '../../Component/TouchableDebounce';

export default class HorizontalAppCell extends PureComponent {

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
            { toValue: 1, duration: 300, delay: 200 * (this.index + 1), easing: Easing.linear }
        ).start();
    }

    /* render */
    render() {
        let opacity = this.state.animation.interpolate(
            {
                inputRange: [0, 1],
                outputRange: [0, 1]
            }
        );
        let scale = this.state.animation.interpolate(
            {
                inputRange: [0, 1],
                outputRange: [0.5, 1]
            }
        );

        const item = (this.props.item ? this.props.item : null);
        if (item) {
            return (
                <View>
                    <Animated.View style={{ opacity: opacity, transform: [{ scaleX: scale }, { scaleY: scale }] }}>
                        <TouchableDebounce style={styles.cellTouch}>
                            <View style={styles.cellBox}>
                                <View style={styles.cellImageBox}>
                                    <CachedImage style={styles.cellImage} source={{ uri: item.imageURL }} />
                                </View>
                                <Text numberOfLines={2} ellipsizeMode='tail' style={styles.cellName}>{item.name}</Text>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.cellCategory}>{item.category}</Text>
                            </View>
                        </TouchableDebounce>
                    </Animated.View>
                </View>
            );
        }
        return <View />;
    }
}

const styles = StyleSheet.create(
    {
        cellTouch: {
            marginRight: 20
        },
        cellBox: {
            width: 80, paddingBottom: 20
        },
        cellImageBox: {
            width: '100%', aspectRatio: 1, borderRadius: 14, overflow: 'hidden'
        },
        cellImage: {
            width: '100%', height: '100%'
        },
        cellName: {
            fontSize: 12, color: '#333', marginTop: 8
        },
        cellCategory: {
            fontSize: 12, color: '#777', marginTop: 5
        }
    }
);