import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import BouncingView from './BoucingView';


export default class BouncingTab extends BouncingView {

    /* constructor */
    constructor(props) {
        super(props);

        this.inputRange = [0, 0.5, 1.0];
        this.outputRange = [1.0, 1.2, 1.0];
    }

    /* component */
    componentWillReceiveProps(nextProps) {
        if (nextProps.focused) {
            super.initAnimation();
        }
    }
}

BouncingTab.propTypes = {
    focused: PropTypes.bool
};
BouncingTab.defaultProps = {
    focused: false
};