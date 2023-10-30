// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { isCompositeComponent } from 'react-dom/test-utils';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCnnIHdF4ukPS4F7TmNHXC9Ojsz-0TvBJY',
  authDomain: 'crwn-clothing-db-ba247.firebaseapp.com',
  projectId: 'crwn-clothing-db-ba247',
  storageBucket: 'crwn-clothing-db-ba247.appspot.com',
  messagingSenderId: '249779388276',
  appId: '1:249779388276:web:c727989d88fbea3948f621',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInUserWithEmailAndPassword = async (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, extraFields) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log('userDocRef', userDocRef);

  const userSnapshot = await getDoc(userDocRef);

  console.log(userSnapshot);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...extraFields,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  console.log('userDocRef', userDocRef);

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  console.log('createAuthUserWithEmailAndPassword', email, password);
  if (!email || !password) return;

  const authUser = await createUserWithEmailAndPassword(auth, email, password);
  console.log('authUser', authUser);

  return authUser;
};
