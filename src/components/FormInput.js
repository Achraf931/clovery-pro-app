import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { windowHeight, windowWidth } from '../utils/Dimensions';

export default function FormInput({ labelValue, placeholderText, ...rest }) {
    return (
        <TextInput
            value={labelValue}
            style={styles.input}
            numberOfLines={1}
            placeholder={placeholderText}
            placeholderTextColor='black'
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        padding: 10,
        marginTop: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        backgroundColor: 'white',
        textAlign: 'center',
        width: '100%',
        height: windowHeight / 15,
        fontSize: 16,
        borderRadius: 10,
    }
});
