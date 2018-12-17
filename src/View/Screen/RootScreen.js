import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import BouncingTab from '../Component/BoucingTab';
import Screen from '../Component/Screen';
import TabScreen from '../Screen/TabScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';

const styles = StyleSheet.create(
    {
        tabbar_icon_box: {
            width: 22,
            aspectRatio: 1
        },
        tabbar_text: {
            fontSize: 14,
            fontWeight: '600'
        },
        full: {
            width: '100%',
            height: '100%'
        }
    }
);

const BottomTabNavigator = createBottomTabNavigator(
    {
        TabScene1: {
            screen: TabScreen,
            navigationOptions: {
                tabBarLabel: ({ tintColor, focused }) => {
                    return <Text style={styles.tabbar_text}>Tab1</Text>
                },
                tabBarIcon: ({ tintColor, focused }) => {
                    let iconName = (focused ? 'apple1' : 'apple-o');
                    return <BouncingTab focused={focused} style={styles.tabbar_icon_box}><AntDesign name={iconName} style={{ color: tintColor }} /></BouncingTab>
                },
                screen: (props) => <TabScreen tabIndex={1} />
            }
        },
        TabScene2: {
            screen: TabScreen,
            navigationOptions: {
                tabBarLabel: ({ tintColor, focused }) => {
                    return <Text style={styles.tabbar_text}>Tab2</Text>
                },
                tabBarIcon: ({ tintColor, focused }) => {
                    let iconName = (focused ? 'apple1' : 'apple-o');
                    return <BouncingTab focused={focused} style={styles.tabbar_icon_box}><AntDesign name={iconName} style={{ color: tintColor }} /></BouncingTab>
                },
                screen: (props) => <TabScreen tabIndex={2} />
            }
        }
    },
    {
        swipeEnabled: false,
        lazy: true,
        transitionConfig: () => ({
            transitionSpec: {
                duration: 0
            }
        }),
        initialRouteName: 'TabScene1',
        tabBarPosition: 'bottom',
        backBehavior: 'none',
        tabBarOptions: {
            activeTintColor: '#f9a61a',
            inactiveTintColor: '#9e9e9e',
            showIcon: true,
            activeBackgroundColor: 'white',
            inactiveBackgroundColor: 'white',
            tabStyle: {
                /* iOS */
                backgroundColor: 'white'
            },
            style: {
                /* Android */
                backgroundColor: 'white'
            }
        },
        animationEnabled: false
    }
);

export default class RootScreen extends Screen {

    render() {
        return (
            <View style={styles.full}>
                <BottomTabNavigator />
            </View>
        );
    }
}
