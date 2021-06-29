import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Home from '../screens/HomeScreen';
import Login from '../screens/LoginScreen';
import Signup from '../screens/SignupScreen';
import User from '../screens/User';
import Article from '../screens/Article';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import Order from '../screens/Order';

const Stack = createStackNavigator();

export default function Routes() {
    const [ user, setUser ] = useState();
    //  const [loading, setLoading] = useState(true);
    const [initializing, setInitializing] = useState(true);
    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
        //  setLoading(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    if (!user) {
        return (
            <NavigationContainer>
                <Stack.Navigator headerMode={'none'} initialRouteName={'Login'}>
                    <Stack.Screen name={'Login'} component={Login} />
                    <Stack.Screen name={'Signup'} component={Signup} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator headerMode={'none'} initialRouteName={'Home'}>
                <Stack.Screen name={'Home'} component={HomeScreen} />
                <Stack.Screen name={'User'} component={User} />
                <Stack.Screen
                    name="Article"
                    component={Article}
                    options={{ ...TransitionPresets.ModalSlideFromBottomIOS }}
                />
                <Stack.Screen
                    name="Order"
                    component={Order}
                    options={{ ...TransitionPresets.ModalSlideFromBottomIOS }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
