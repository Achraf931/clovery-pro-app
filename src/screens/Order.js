import React, { useContext } from 'react';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image} from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import Icon from 'react-native-vector-icons/Ionicons';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import firestore from '@react-native-firebase/firestore';

export default function Order({ navigation, route }) {
    const value = route.params.value;

    const confirmOrder = () => {
        firestore()
            .collection('stores')
            .doc(value.articles[0].store_doc)
            .collection('orders')
            .doc(value.doc)
            .delete()
            .then(() => {
                navigation.goBack();
                console.log('Order deleted!');
            })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: '100%'}}>
                <Text style={[styles.fontBold, {fontSize: 35, marginLeft: 20}]}>Commande {value.doc}</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.boxShadow, {marginHorizontal: 20, zIndex: 2, borderRadius: 100, width: 40, height: 40, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', marginTop: 30}]}>
                    <Icon size={28} name="close-outline"/>
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic" style={{backgroundColor: 'white', padding: 20, width: windowWidth - 40, marginHorizontal: 20, marginTop: 30, borderRadius: 20}}>
                <TouchableOpacity onPress={() => confirmOrder()} style={[styles.boxShadow, {backgroundColor: '#FF2D87', height: 70, paddingHorizontal: 20, borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, right: 0}]}>
                    <Text style={{color: 'white', fontFamily: 'Gotham-Bold'}}>Confirmer la commande</Text>
                </TouchableOpacity>
                <Text style={[styles.fontBold, styles.font20, {marginBottom: 20}]}>Client</Text>
                <Text>{value.name} {value.firstname}</Text>
                <Text style={{marginTop: 10}}>{value.email}</Text>
                <Text style={{marginTop: 10}}>{value.phone}</Text>
                <Text style={{marginTop: 10}}>{value.address}</Text>
                <Text style={{marginTop: 10}}>{value.zipcode}, {value.city}</Text>
                <Text style={{marginTop: 10}}>{value.country}</Text>

                <Text style={[styles.fontBold, styles.font20, {marginBottom: 20, marginTop: 30}]}>Commande</Text>
                <View style={{flex: 1, flexDirection: 'row', marginTop: 10, flexWrap: 'wrap'}}>
                    {value.articles.map((value, index) => (
                        <TouchableOpacity needsOffscreenAlphaCompositing key={index} style={[styles.article, styles.boxShadow]}>
                            <Image source={{uri: value.image}} style={{width: '100%', height: 200}} />
                            <Text style={{marginTop: 10, fontFamily: 'Gotham-Bold'}}>{value.title}</Text>
                            <Text style={{marginTop: 10, fontSize: 11, color: '#FF2D87'}}>{value.color}</Text>
                            <Text style={{marginTop: 10, fontSize: 11}}>Quantité : {value.quantity}</Text>
                            <Text style={{marginTop: 10, fontSize: 11}}>Taille : {value.size}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <Text style={[styles.fontBold, styles.font20, {marginBottom: 20, marginTop: 30}]}>Livraison</Text>
                <Text style={{marginTop: 10}}>Recherche d'un livreur en cours...</Text>
            </ScrollView>
            <Text style={[styles.fontBold, {position: 'absolute', bottom: 40, right: 40, fontSize: 35}]}>Total: {value.total}€</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: windowHeight,
        width: windowWidth,
        backgroundColor: '#FAF2F7',
        alignItems: 'flex-end'
    },
    fontBold: {
        fontFamily: 'Gotham-Bold'
    },
    font20: {
        fontSize: 20
    },
    text: {
        fontSize: 20,
        color: '#333333'
    },
    article: {
        backgroundColor: '#FAF2F7',
        borderRadius: 10,
        padding: 10,
        width: 200,
        marginHorizontal: 10
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
