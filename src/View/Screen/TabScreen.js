import React, { Component, PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import Screen from '../Component/Screen';
import { getTabStackNavigator } from '../../Config/Routes';

export default class TabScreen extends Screen {

    /* constructor */
    constructor(props) {
        super(props);
        let tabRouteName = this.props.navigation.state.routeName;
        this.tabIndex = parseInt(tabRouteName.replace('TabScene', ''));
    }

    /* render */
    render() {
        return (
            <View style={styles.full}>
                {this.renderTabStackNavigation()}
            </View>
        );
    }

    renderTabStackNavigation() {
        const TabStackNavigator = getTabStackNavigator(this.tabIndex - 1);
        return <TabStackNavigator />;
    }

}

const styles = StyleSheet.create(
    {
        full: {
            width: '100%',
            height: '100%'
        }
    }
);