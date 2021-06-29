import React, { useState, useContext } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import auth from '@react-native-firebase/auth';

export default function SignupScreen({ navigation }) {
    const register = async (email, password) => {
        await auth().createUserWithEmailAndPassword(email, password)
            .then(result => {
                return result.user.updateProfile({
                    displayName: 'FfrtKoZ88405eYpZxasd'
                })
            });
    }
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <View style={styles.container}>
            <Text style={{ fontFamily: 'Gotham-Black', fontSize: 40, position: 'absolute', top: 50}}>Clovery<Text style={{color: '#FF2D87'}}>.</Text></Text>

            <Text style={styles.text}>Inscription</Text>
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
            <FormButton
                buttonTitle="M'inscrire"
                onPress={() => register(email, password)}
            />
            <TouchableOpacity
                style={styles.navButton}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.navButtonText}>J'ai déjà un compte. <Text style={{fontWeight: 'bold'}}>Me connecter</Text></Text>
            </TouchableOpacity>
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
