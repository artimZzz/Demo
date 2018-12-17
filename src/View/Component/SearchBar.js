import React, { Component, PureComponent } from 'react';
import { StyleSheet, ViewPropTypes, View, Animated, Easing, Text, TextInput } from 'react-native';
import { ifAndroid } from '../../Controller/Device/DeviceCheck';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TouchableDebounce from './TouchableDebounce';
import PropTypes from 'prop-types';

export default class SearchBar extends PureComponent {

    /* constructor */
    constructor(props) {
        super(props);

        this.state = {
            isSearching: false,
            toggleAnim: new Animated.Value(0)
        };
        this.textInputRef = null;
        this.touchRef = null;

        /* callback */
        this.onPress = () => {
            this.state.toggleAnim.setValue(0);
            Animated.timing(
                this.state.toggleAnim,
                { toValue: 1.0, duration: 150, easing: Easing.linear }
            ).start(
                () => {
                    this.setState({ isSearching: true });
                }
            );

        }

        this.onBlur = () => {
            if (this.textInputRef._lastNativeText.length == 0) {
                this.setState(
                    { isSearching: false },
                    () => {
                        this.state.toggleAnim.setValue(1);
                        Animated.timing(
                            this.state.toggleAnim,
                            { toValue: 0, duration: 150, easing: Easing.linear }
                        ).start();
                    }
                );
            }
            if (this.props.onBlur) {
                this.props.onBlur();
            }
        }

        this.assignTouchRef = (ref) => this.touchRef = ref;

        this.assignRef = (ref, innerRef) => {
            this.textInputRef = ref;
            if (innerRef) {
                innerRef(ref);
            }
        }
    }

    /* render */
    render() {
        const { style, ...otherProps } = this.props;
        return (
            <View style={style}>
                {this.renderInner()}
            </View>
        );
    }

    renderInner = () => {
        const {
            forwardRef, forwardStyle, placeholder, onBlur, // props using
            style, ref, autoCapitalize, autoCorrect, autoFocus, spellCheck, // skip props
            ...otherProps // auto inherit props
        } = this.props;
        if (!this.state.isSearching) {
            let opacity = this.state.toggleAnim.interpolate(
                {
                    inputRange: [0, 1],
                    outputRange: [1, 0]
                }
            );
            let positionX = this.state.toggleAnim.interpolate(
                {
                    inputRange: [0, 1],
                    outputRange: [0, -100]
                }
            );
            return (
                <Animated.View style={[styles.searchCoverBox, { opacity: opacity, left: positionX }]}>
                    <TouchableDebounce ref={this.assignTouchRef} style={styles.searchCoverTouch} onPress={this.onPress}>
                        {this.renderSearchIcon()}
                        <Text style={styles.searchCoverText}>{placeholder}</Text>
                    </TouchableDebounce>
                </Animated.View>
            );
        }
        return (
            <View style={styles.searchInputBox}>
                {this.renderSearchIcon()}
                <TextInput
                    {...otherProps}
                    ref={(ref) => this.assignRef(ref, forwardRef)}
                    placeholder={placeholder}
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoFocus={true}
                    spellCheck={false}
                    onBlur={this.onBlur}
                    style={[forwardStyle, styles.searchInput]}
                />
            </View>
        );
    }

    renderSearchIcon = () => {
        return <Ionicons name='ios-search' size={20} color='#00000066' />;
    }
}

SearchBar.propTypes = {
    style: ViewPropTypes.style,
    ref: PropTypes.func,
    forwardRef: PropTypes.func,
    forwardStyle: ViewPropTypes.style,
    placeholder: PropTypes.string
};
SearchBar.defaultProps = {
    style: {},
    ref: () => { },
    forwardRef: () => { },
    forwardStyle: {},
    placeholder: ''
};

const styles = StyleSheet.create(
    {
        searchCoverBox: {
            position: 'absolute', width: '100%', height: '100%'
        },
        searchCoverTouch: {
            width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'
        },
        searchCoverText: {
            marginLeft: 10, fontSize: 14, fontWeight: '400', color: '#00000066'
        },
        searchInputBox: {
            position: 'absolute', width: '100%', height: '100%', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10
        },
        searchInput: {
            flex: 1, height: '100%', marginLeft: 10, ...ifAndroid({ paddingBottom: 8 }, {})
        }
    }
);