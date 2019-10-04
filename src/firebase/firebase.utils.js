import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBRHjAFFw67ajIO1rnIlcBJaJIwoKZRv_8",
    authDomain: "onlinestore-db.firebaseapp.com",
    databaseURL: "https://onlinestore-db.firebaseio.com",
    projectId: "onlinestore-db",
    storageBucket: "",
    messagingSenderId: "845529263059",
    appId: "1:845529263059:web:1475cd9831367f33481d26"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return; 
	const userRef = firestore.doc(`users/${userAuth.uid}`);
	const snapShot = await userRef.get();
	if (!snapShot.exists) {
		const {displayName, email} = userAuth; 
		const createAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createAt,
				...additionalData
			})
		}catch (error) {
			console.log('error creating user', error.message);
		}
	}
	return userRef;
};

export const addCollectionAndDocuments = async ( collectionKey, objectsToAdd) => {
	const collectionRef = firestore.collection(collectionKey);
	
	const batch = firestore.batch();
	objectsToAdd.forEach(obj => {
		 const newDocRef = collectionRef.doc();
		 batch.set(newDocRef, obj);
	});
	return await batch.commit();
};
export const convertCollectionsSnapshotToMap =  collections  =>{
	const transformedCollection = collections.docs.map( doc => {
		const { title, items } = doc.data();

		return {
			routeName: encodeURI(title.toLowerCase()),
			id: doc.id,
			title,
			items
		};
	});
	return transformedCollection.reduce((accumulator, collection) => {
		accumulator[collection.title.toLowerCase()] = collection;
		return accumulator;
	} , {} ); 
}


firebase.initializeApp(config); 

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: 'select_account' } );
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
