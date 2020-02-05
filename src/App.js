import React, { Component } from 'react'
import {
    StyleSheet,
    Button,
    View
} from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import MainScreen from './screens/MainScreen'
import {DetailScreen} from './screens/DetailScreen'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'
import ForgotPassScreen from './screens/ForgotPassScreen'
import ProfileScreen from './screens/ProfileScreen'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import Icon_ from 'react-native-vector-icons/FontAwesome5';
//#region Stack
const HomeStack = createStackNavigator({
    Login: LoginScreen,
    Main: MainScreen,
    Detail: DetailScreen,
    Profile:ProfileScreen,
})

//#endregion

const RootStack = createStackNavigator({
    Main: {
        screen: MainScreen,
        navigationOptions: {
            header:null
        },
    },

    Detail: {
        screen: DetailScreen,
        navigationOptions: {
            
        },
    },
    // Profile:{
    //     screen:ProfileScreen,
    //     navigationOptions:{
            
    //     }
    // }
}, {
    initialRouteName: 'Main'
});

const ProfileStack = createStackNavigator({
    Profile: {
        screen: ProfileScreen,
        navigationOptions: {
            header: null
        },
    },
}, {
        initialRouteName: 'Profile'
});

const TabsStack=createBottomTabNavigator(
    {
        Root:{
            screen: RootStack,
            navigationOptions: {
                title: 'Trang chủ',
            },
        },
        Profile:{
            screen: ProfileStack,
            navigationOptions: {
                title: 'Hồ sơ',
            },
        },
    },
    {
        defaultNavigationOptions: ({ navigation }) => {
            return {
                tabBarIcon: ({ tintColor }) => {
                    const { routeName } = navigation.state;
                    let iconName = 'home';
                    if (routeName === 'Root') {
                        iconName = 'home';
                    } else if (routeName === 'Profile') {
                        iconName = 'id-card';
                    }
                   
                    return (
                        <Icon_
                            name={iconName}
                            size={25}

                            color={tintColor}
                            style={{ marginTop: 5, marginRight: 3 }}
                        />
                    );
                },

                tabBarOptions: {

                    activeTintColor: '#48dbfb',
                    inactiveTintColor: '#fff',
                    activeBackgroundColor: '#341f97',
                    inactiveBackgroundColor: '#341f97',
                    borderColor: '#000',
                },
            };
        },
    },
)

const LoginStack = createStackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            header: null
        },
    },

    Signup: {
        screen: SignupScreen,
        navigationOptions: {
            header: null
        },
    },

    ForgotPass:{
        screen: ForgotPassScreen,
        navigationOptions:{
            header: null
        }
    }
}, {
    initialRouteName: 'Login'
});



const Switch = createSwitchNavigator({
    Login: LoginStack,
    Main: TabsStack,
}, {
    initialRouteName: 'Login'
})

//const AppContainer = createAppContainer(RootStack);

const AppContainer = createAppContainer(Switch);

export default class App extends Component {
    componentDidMount(){
        console.disableYellowBox = true;

    }
    render() {
        
        return <AppContainer />
    }
}

