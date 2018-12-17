import React, { Component, PureComponent } from 'react';
import { AppContainer } from './src/Config/Routes';
import { StyleSheet, View, Dimensions } from 'react-native';
import Loading from './src/View/Component/Loading';
import { NOTIFICATION, ORIENTATION } from './src/Config/Variables';
import NotificationController from './src/Controller/Notification/NotificationController';

export default class App extends PureComponent {

    /* constructor */
    constructor(props) {
        super(props);

        /* disable yellow box for demo */
        console.disableYellowBox = true;

        this.state = { refreshing: false };
        this.onlayout = () => {
            const { width, height } = Dimensions.get('window');
            const orientation = ((width < height) ? ORIENTATION.PORTRAIT: ORIENTATION.LANDSCAPE);
            NotificationController.getInstance().fireCallback(NOTIFICATION.LAYOUT_ORIENTATION, { orientation: orientation });
        }
        this.assignLoadingRef = (ref) => this.loadingRef = ref;
        NotificationController.getInstance().registerCallback(this, NOTIFICATION.LAYOUT_TOGGLE_LOADING);
        NotificationController.getInstance().registerCallback(this, NOTIFICATION.LAYOUT_ORIENTATION);
    }

    /* render */
    render() {
        return (
            <View onLayout={this.onlayout} style={styles.container}>
                <AppContainer />
                <Loading ref={this.assignLoadingRef} />
            </View>
        );
    }

    callbackFired(key, value) {
        if (key === NOTIFICATION.LAYOUT_TOGGLE_LOADING) {
            if (this.loadingRef) {
                if (value.visible) {
                    this.loadingRef.show();
                }
                else {
                    this.loadingRef.hide();
                }
            }
        }
    }
}

const styles = StyleSheet.create(
    {
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: 'white'
        }
    }
);


/*
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
*/