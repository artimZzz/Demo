import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TouchableDebounce from '../Component/TouchableDebounce';
import Screen from '../Component/Screen';

export default class DummyScreen extends Screen {

    /* constructor */
    constructor(props) {
        super(props);
    }

    /* render */
    render() {
        return (
            <View style={styles.container}>
                <TouchableDebounce onPress={() => this.push('LandingScreen')}>
                    <Text>Tap To Start</Text>
                </TouchableDebounce>
            </View>
        );
    }
}

/* styles */
const styles = StyleSheet.create(
    {
        container: { 
            width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' 
        }
    }
);