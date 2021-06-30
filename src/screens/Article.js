import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function HomeScreen({ navigation, route }) {
    const update = route.params.value !== '';
    const [ user ] = useState(auth().currentUser);
    let [ image, setImage ] = useState(route.params.value.image)
    let [ title, setTitle ] = useState(route.params.value.title)
    let [ color, setColor ] = useState(route.params.value.color)
    let [ price, setPrice ] = useState(route.params.value.price)
    let [ description, setDescription ] = useState(route.params.value.description)
    let [ sizes, setSizes ] = useState(route.params.value.sizes)

    const sendData = () => {
        if (update) {
            firestore()
                .collection('stores')
                .doc(user.displayName)
                .collection('articles')
                .doc(route.params.value.doc)
                .update({
                    image: image,
                    title: title,
                    color: color,
                    price: price,
                    description: description,
                    sizes: typeof sizes === 'string' ? sizes.split(',') : sizes
                })
                .then(() => {
                    console.log('Article edited!')
                })
        }
        else {
            firestore()
                .collection('stores')
                .doc(user.displayName)
                .collection('articles')
                .add({
                    image: image,
                    title: title,
                    color: color,
                    price: price,
                    description: description,
                    sizes: sizes.split(',')
                })
                .then(() => {
                    console.log('Article added!')
                })
        }

        navigation.navigate('Home', {refreshData: true});
    }

    return (
        <SafeAreaView style={[styles.container]}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.boxShadow, {marginHorizontal: 20, zIndex: 2, borderRadius: 100, width: 40, height: 40, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', marginTop: 30}]}>
                <Icon size={28} name="close-outline"/>
            </TouchableOpacity>
            <ScrollView showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic" style={{padding: 20, width: '100%'}}>
                <View style={{justifyContent: 'space-between'}}>
                    <Text>URL de l'image</Text>
                    <TextInput onChangeText={image => setImage(image)} value={image} numberOfLines={1} placeholder={"URL de l'image"} style={[styles.input]}/>
                    <Text>Nom</Text>
                    <TextInput onChangeText={title => setTitle(title)} value={title} numberOfLines={1} placeholder={'Titre'} style={[styles.input]}/>
                    <Text>Couleur</Text>
                    <TextInput onChangeText={color => setColor(color)} value={color} numberOfLines={1} placeholder={'Couleur'} style={styles.input}/>
                    <Text>Prix</Text>
                    <TextInput onChangeText={price => setPrice(price)} value={price} numberOfLines={1} placeholder={'Prix'} style={[styles.input]}/>
                    <Text>Description</Text>
                    <TextInput onChangeText={description => setDescription(description)} value={description} placeholder={'Description'} multiline style={[styles.input, {height: 400}]}/>
                    <Text>Tailles (séparer les tailles par une virgule)</Text>
                    <TextInput onChangeText={sizes => setSizes(sizes)} value={update ? sizes.toString() : sizes} placeholder={'36,37,38,39,40,41'} style={[styles.input]}/>
                </View>

                <TouchableOpacity onPress={() => sendData()} style={[styles.boxShadow, {marginHorizontal: 20, marginBottom: 30, backgroundColor: '#FF2D87', height: 70, borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}]}>
                    <Text style={{color: 'white', fontFamily: 'Gotham-Bold'}}>Enregistrer</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: windowHeight,
        width: windowWidth,
        backgroundColor: '#FAF2F7',
        alignItems: 'flex-end'
    },
    text: {
        marginTop: 10,
        fontSize: 24,
        fontFamily: 'Gotham-Bold'
    },
    features: {
        width: 100,
        height: 200,
        resizeMode: 'cover',
        overflow: 'hidden'
    },
    input: {
        padding: 10,
        marginTop: 10,
        fontWeight: 'bold',
        marginBottom: 20,
        backgroundColor: 'white',
        width: '100%',
        height: 50,
        borderRadius: 5,
    },
    article: {
        width: windowWidth / 2 - 20,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center'
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
