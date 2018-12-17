import React, { Component, PureComponent } from 'react';
import { StyleSheet, ViewPropTypes, View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

export default class RatingView extends PureComponent {

    /* constructor */
    constructor(props) {
        super(props);
    }

    /* render */
    render() {
        let rating = (this.props.rating !== undefined ? this.props.rating : -1);
        if (rating > -1) {
            let starViews = this.prepareStarViews(rating);
            let style = (this.props.style ? this.props.style : { backgroundColor: 'transparent' });
            return (
                <View style={[style, styles.ratingBox]}>
                    {starViews}
                    {this.renderCount()}
                </View>
            );
        }
        return <View />;
    }

    renderCount() {
        let count = (this.props.count ? this.props.count : -1);
        if (count > -1) {
            return <Text style={styles.ratingCount}>{'(' + count + ')'}</Text>
        }
        return <View />;
    }

    /* private */
    prepareStarViews = (rating) => {
        let starColor = (this.props.filledColor ? this.props.filledColor : '#ffb800');
        let filledIconName = 'ios-star';
        // let halfIconName = 'ios-star-half';
        let hollowedIconName = 'ios-star-outline';
        let starViews = [];
        let starName = '';
        let ratingInt = Math.round(rating);
        if (rating == 0) {
            starColor = '#ccc';
            hollowedIconName = 'ios-star';
        }
        for (let i = 0; i < 5; i++) {
            if (i < ratingInt) {
                starName = filledIconName;
            }
            else {
                starName = hollowedIconName;
            }
            starViews.push(
                <Ionicons key={i} style={styles.ratingIcon} name={starName} size={12} color={starColor} />
            );
        }
        return starViews;
    }
}

/* style */
const styles = StyleSheet.create(
    {
        ratingBox: {
            flexDirection: 'row', alignItems: 'center'
        },
        ratingCount: {
            fontSize: 10, color: '#aaa', marginLeft: 3
        },
        ratingIcon: {
            marginRight: 2
        }
    }
);

RatingView.propTypes = {
    rating: PropTypes.number,
    count: PropTypes.number,
    style: ViewPropTypes.style,
    filledColor: PropTypes.string
};
RatingView.defaultProps = {
    rating: 0,
    count: 0,
    style: { backgroundColor: 'transparent' },
    filledColor: '#ffb800'
};