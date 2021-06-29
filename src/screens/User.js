import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import {windowWidth} from '../utils/Dimensions';
import auth from '@react-native-firebase/auth';

export default function User() {
    const logout = async () => {
        await auth().signOut();
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => logout()} style={[styles.boxShadow, {marginHorizontal: 10, width: windowWidth - 20, marginBottom: 30, backgroundColor: '#FF2D87', height: 70, borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}]}>
                <Text style={{color: 'white', fontFamily: 'Gotham-Bold'}}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAF2F7'
    },
    text: {
        marginHorizontal: 10,
        fontSize: 20,
        color: '#333333'
    },
    boxShadow: {
        shadowColor: "#949494",
        shadowOffset:{
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.12,
        shadowRadius: 5.46,
        elevation: 6,
    }
});
