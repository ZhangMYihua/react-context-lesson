import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyD9n33tVMg9H66tvZNZX6tl_yDhkQ1iIMI',
  authDomain: 'crown-db-bab46.firebaseapp.com',
  databaseURL: 'https://crown-db-bab46.firebaseio.com',
  projectId: 'crown-db-bab46',
  storageBucket: 'crown-db-bab46.appspot.com',
  messagingSenderId: '242184251880',
  appId: '1:242184251880:web:65b711a67d0979085edc5d',
  measurementId: 'G-X5F3SL7NS4',
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
