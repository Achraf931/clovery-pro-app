import firestore from '@react-native-firebase/firestore';

export const getData = (collection, setFunc) => {
    firestore()
        .collection(collection)
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
