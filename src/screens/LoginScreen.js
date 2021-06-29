import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import auth from '@react-native-firebase/auth';

export default function LoginScreen({ navigation }) {
    const login = async (email, password) => {
        await auth().signInWithEmailAndPassword(email, password);
    }
    const [email, setEmail] = useState('nike@nike.fr');
    const [password, setPassword] = useState('niketest');

    return (
        <View style={styles.container}>
            <Text style={{ fontFamily: 'Gotham-Black', fontSize: 40, position: 'absolute', top: 50}}>Clovery<Text style={{color: '#FF2D87'}}>.</Text></Text>

            <Text style={styles.text}>Connection</Text>
            <FormInput
                value={email}
                placeholderText='E-mail'
                onChangeText={userEmail => setEmail(userEmail)}
                autoCapitalize='none'
                keyboardType='email-address'
                autoCorrect={false}
            />
            <FormInput
                value={password}
                placeholderText='Mot de passe'
                onChangeText={userPassword => setPassword(userPassword)}
                secureTextEntry={true}
            />
            <FormButton buttonTitle='Me connecter' onPress={() => login(email, password)} />
            {/*<TouchableOpacity
                style={styles.navButton}
                onPress={() => navigation.navigate('Signup')}
            >
                <Text style={styles.navButtonText}>Je n'ai pas de compte. <Text style={{color:'black', fontWeight: 'bold'}}>M'inscire</Text></Text>
            </TouchableOpacity>*/}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FAF2F7',
        flex: 1,
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    navButton: {
        marginTop: 15
    },
    navButtonText: {
        fontSize: 16,
        color: 'black'
    }
});
