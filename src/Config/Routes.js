import { Easing, Animated } from 'react-native';
import { createAppContainer, createStackNavigator, StackNavigator } from 'react-navigation';
import DummyScreen from '../View/Screen/DummyScreen';
import RootScreen from '../View/Screen/RootScreen';
import LandingScreen from '../View/Screen/LandingScreen';

/* Animtion Config */
const verticalTransition = () => {
    return {
        transitionSpec: {
            duration: 300,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
            useNativeDriver: true
        },
        screenInterpolator: sceneProps => {
            const { layout, position, scene } = sceneProps;
            const thisSceneIndex = scene.index;
            const height = layout.initHeight;
            const translateY = position.interpolate(
                {
                    inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
                    outputRange: [height, 0, 0]
                }
            );
            const scale = position.interpolate(
                {
                    inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
                    outputRange: [0.85, 1, 0.85]
                }
            )
            return { transform: [{ translateY }, { scale }] };
        }
    }
}

/* Create Common Stack Navigator */
const CommonRoute = {
    // xxx: { screen: xxx },
}

/* Create Tab Stack Navigator */
const TabRoutes = [
    { LandingScreen: { screen: LandingScreen }, ...CommonRoute },
    // { xxx: { screen: xxx }, ...xxx }
];

export const TabStackNavigatorPool = {};
export const getTabStackNavigator = (index) => {
    let stackNavigator = TabStackNavigatorPool[index + ''];
    if (!stackNavigator) {
        stackNavigator = createStackNavigator(TabRoutes[index], { headerMode: 'none'/*, transitionConfig: horizontalTransition*/ });
        TabStackNavigatorPool[index + ''] = stackNavigator;
    }
    return stackNavigator;
}

/* Create Root Stack Navigator */
const DebugRoute = { DummyScreen: { screen: DummyScreen }, LandingScreen: { screen: LandingScreen }, ...CommonRoute };
const RootRoute = { LandingScreen: { screen: LandingScreen }, ...CommonRoute };
// const RootRoute = { RootScreen: { screen: RootScreen }, ...CommonRoute };
export const RootStackNavigator = createStackNavigator(DebugRoute, { headerMode: 'none', transitionConfig: verticalTransition });
export const AppContainer = createAppContainer(RootStackNavigator);