import firestore from '@react-native-firebase/firestore';

export const getCart = (store_doc, setFunc) => {
    firestore()
        .collection('stores')
        .doc(store_doc)
        .collection('carts')
        .orderBy('id', 'asc')
        .get()
        .then((documentSnapshot) => {
            let tmpList = [];
            documentSnapshot.forEach((item) => {
                item.data().doc = item.id;
                tmpList.push(item.data());
            })
            setFunc(tmpList);
        });
}
