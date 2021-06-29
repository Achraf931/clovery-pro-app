import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, TextInput, Platform, StatusBar } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Header } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import Categories from '../screens/Categories';
import Novelty from '../screens/Novelty';
import User from '../screens/User';
import Store from '../screens/Store';


const Stack = createStackNavigator();

export default function HomeStack({navigation} ) {

    StatusBar.setBarStyle('dark-content', true)

    return (
        <View style={styles.container}>
            <Header transparent={true} noShadow={true} androidStatusBarColor={'transparent'} style={{backgroundColor: 'white', height: 0, color: 'black'}}/>
            <View style={{padding: 10, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={{ fontFamily: 'Montserrat-Bold', color: '#0D3662', fontSize: 20}}>Clovery<Text style={{color: '#FF2D87'}}>.</Text></Text>
                <Icon.Button name={'person-circle-outline'} size={30} color={'#0D3662'} style={{backgroundColor: 'white'}} onPress={() => navigation.navigate('User')} />
                {/*<TextInput
                    style={styles.input}
                    numberOfLines={1}
                    placeholder={'Search'}
                    placeholderTextColor='#0E3763'
                />*/}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: '#F7F8FB',
        width: '100%',
        padding: 10
    }
});
