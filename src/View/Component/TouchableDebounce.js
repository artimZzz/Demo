import React, { Component, PureComponent } from 'react';
import { ViewPropTypes, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

class TouchableDebounce extends PureComponent {

    /* construction */
    constructor(props) {
        super(props);
        this.state = { disabled: false };
    }

    /* component */
    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    /* render */
    render() {
        return (
            <TouchableOpacity
                {...this.props}
                ref={this.props.innerRef}
                disabled={this.state.disabled}
                onPress={this.onPress}
            >
                {this.props.children}
            </TouchableOpacity>
        );
    }

    /* private */
    onPress = () => {
        const { onPress, debounceTime } = this.props;
        if (onPress) {
            onPress();
            this.debounce(debounceTime);
        }
    };

    debounce(debounceTime) {
        this.disabled = true;
        this.timer = setTimeout(
            () => this.setState({ disabled: false }),
            debounceTime
        );
    }

    // /* public */
    // measure = (callback) => {
    //     if (this.innerRef) {
    //         this.innerRef.measure(callback);
    //     }
    // }
}

TouchableDebounce.propTypes = {
    onPress: PropTypes.func,
    style: ViewPropTypes.style,
    debounceTime: PropTypes.number,
    innerRef: PropTypes.func
};
TouchableDebounce.defaultProps = {
    style: {},
    debounceTime: 500
};

export default TouchableDebounce;