import React, {useState, useEffect, useContext} from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function HomeScreen({ navigation, route }) {
    const [ user ] = useState(auth().currentUser);
    let [articles, setArticles] = useState([]);
    let [orders, setOrders] = useState([]);
    const logout = () => {
        auth().signOut();
    }

    firestore()
        .collection('stores')
        .doc(user.displayName)
        .collection('orders')
        .get()
        .then((documentSnapshot) => {
            let tmpList = [];
            documentSnapshot.forEach((item) => {
                item.data().doc = item.id;
                tmpList.push(item.data())
            })
            setOrders(tmpList)
        })

    const getData = () => {
        firestore()
            .collection('stores')
            .doc(user.displayName)
            .collection('articles')
            .get()
            .then((documentSnapshot) => {
                let tmpList = [];
                documentSnapshot.forEach((item) => {
                    item.data().doc = item.id;
                    item.data().store_doc = user.displayName;
                    tmpList.push(item.data());
                })
                setArticles(tmpList);
            });
    }
    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (route.params) {
            getData();
        }
    }, [route.params])


    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.orders, styles.boxShadow]}>
                <Text style={[styles.fontBold, styles.font20, {marginBottom: 20}]}>Commandes</Text>
                <ScrollView showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic">
                    {orders.length ? (
                        <>
                            {orders.map((value, index) => (
                                <TouchableOpacity needsOffscreenAlphaCompositing key={index} style={[styles.boxShadow, {backgroundColor: '#FAF2F7', padding: 10, borderRadius: 5, marginBottom: 20}]} onPress={() => navigation.navigate('Order', { value })}>
                                    <Text style={{marginTop: 10, fontFamily: 'Gotham-Bold'}}>{value.name} {value.firstname}</Text>
                                    <Text style={{marginTop: 10, fontSize: 11, color: '#FF2D87'}}>{value.address} {value.zipcode}, {value.city}</Text>
                                </TouchableOpacity>
                            ))}
                        </>
                    ) : (
                        <View style={{marginTop: 30, paddingHorizontal: 10, alignItems: 'center'}}>
                            <Text style={{fontFamily: 'Gotham-Bold'}}>Aucune commande</Text>
                        </View>
                    )}
                </ScrollView>
            </View>
            <View style={[styles.articles, styles.boxShadow, {position: 'relative'}]}>
                <TouchableOpacity onPress={() => navigation.navigate('Article', { value: '' })} style={[styles.boxShadow, {position: 'absolute', top: 20, right: 20, zIndex: 2, borderRadius: 100, width: 40, height: 40, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}]}>
                    <Icon size={40} name="add-circle-outline"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => logout()} style={[styles.boxShadow, {position: 'absolute', bottom: 20, right: 20, zIndex: 2, borderRadius: 100, width: 40, height: 40, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}]}>
                    <Icon color={'red'} size={40} name="log-out-outline"/>
                </TouchableOpacity>
                <Text style={[styles.fontBold, styles.font20, {marginBottom: 20, marginLeft: 10}]}>Produits</Text>
                <ScrollView showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic">
                    {articles.length ? (
                        <>
                            <View style={{flex: 1, flexDirection: 'row', marginTop: 10, flexWrap: 'wrap'}}>
                                {articles.map((value, index) => (
                                    <TouchableOpacity needsOffscreenAlphaCompositing key={index} style={[styles.article, styles.boxShadow]} onPress={() => navigation.navigate('Article', { value })}>
                                        <Image source={{uri: value.image}} style={{width: '100%', height: 200}} />
                                        <Text style={{marginTop: 10, fontFamily: 'Gotham-Bold'}}>{value.title}</Text>
                                        <Text style={{marginTop: 10, fontSize: 11, color: '#FF2D87'}}>{value.color}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </>
                    ) : (
                        <View style={{marginTop: 30, paddingHorizontal: 10, alignItems: 'center'}}>
                            <Text style={{fontFamily: 'Gotham-Bold'}}>Aucun article pour le moment</Text>
                        </View>
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    orders: {
        width: windowWidth / 5,
        height:  '95%',
        backgroundColor: 'white',
        borderRadius: 10,
        marginLeft: 20,
        marginRight: 10,
        padding: 20
    },
    articles: {
        width: windowWidth / 1.3 - 20,
        height:  '95%',
        backgroundColor: 'white',
        borderRadius: 10,
        marginRight: 20,
        marginLeft: 10,
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#FAF2F7'
    },
    fontBold: {
        fontFamily: 'Gotham-Bold'
    },
    fontMedium: {
        fontFamily: 'Gotham-Medium'
    },
    fontRegular: {
        fontFamily: 'Gotham'
    },
    colorWhite: {
        color: 'white'
    },
    font16: {
        fontSize: 16
    },
    font18: {
        fontSize: 18
    },
    font20: {
        fontSize: 20
    },
    article: {
        backgroundColor: '#FAF2F7',
        borderRadius: 10,
        padding: 10,
        width: 200,
        marginHorizontal: 10
    },
    categoryImage: {
        width: windowWidth * 0.25,
        backgroundColor: 'white',
        marginRight: 10,
        borderRadius: 5,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 20,
        color: '#0D3662'
    },
    stores: {
        width: windowWidth * 0.9,
        height: 200,
        resizeMode: 'cover',
        marginRight: 10,
        borderRadius: 5,
        overflow: 'hidden'
    },
    features: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        marginRight: 10,
        borderRadius: 5,
        overflow: 'hidden'
    },
    freeDel:{
        position: 'absolute',
        borderRadius: 5,
        zIndex:22,
        backgroundColor:'#FF2D87',
        padding: 5,
        margin: 10
    },
    storeName:{
        position: 'absolute',
        borderRadius: 5,
        zIndex:22,
        backgroundColor:'black',
        padding: 5,
        margin: 10
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
