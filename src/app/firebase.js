/* eslint-disable import/no-unresolved */
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import {
  getAuth, createUserWithEmailAndPassword, FacebookAuthProvider, signInWithPopup,
  setPersistence, signInWithRedirect, inMemoryPersistence, GoogleAuthProvider,
  signInWithEmailAndPassword, signOut, sendPasswordResetEmail, sendEmailVerification,
  onAuthStateChanged, updateProfile
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import { getFirestore, collection, getDoc, getDocs, setDoc, doc,
  onSnapshot, query, where, deleteDoc, updateDoc, arrayRemove, arrayUnion,
  addDoc, serverTimestamp, orderBy } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js'
import { getStorage, ref } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js'

// configuración de la app de firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCVFwSqmwf3nPLqyBd-_SrnWdKfmv8kRVc',
  authDomain: 'petblr-74086.firebaseapp.com',
  projectId: 'petblr-74086',
  storageBucket: 'petblr-74086.appspot.com',
  messagingSenderId: '431725901053',
  appId: '1:431725901053:web:0804da9ec879761fd6ba94',
};

// inicialización de firebase
const firebaseApp = initializeApp(firebaseConfig);

// uso de firebase auth
const firebaseAuth = getAuth(firebaseApp);

const providerFacebookAuth = new FacebookAuthProvider();

// NUUUUUUUUUUUEEEEEEEEEEEEEEEVOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO

const storage = getStorage(firebaseApp);
const database = getFirestore();
const storageRef = ref(storage);
const collectionUserName = collection(database, 'usernames');
const collectionUserNamesSpanish = collection(database, 'usuarios');
const collectionPost = collection(database, 'posts');
const getTask = () => getDocs(collection(database, 'posts'));

const getOnDatas = (callback) => {
  const orderQuery = query(collection(database,'posts'), orderBy('createdAt', 'desc'));
  onSnapshot(orderQuery,(callback))
};

const getPost = (id) => getDoc(doc(database, 'posts', id));
const updatePosts = (id, newFields) =>
  updateDoc(doc(database, 'posts', id), newFields);

const erasePost = (id) => deleteDoc(doc(database, 'posts', id))

export {
  firebaseApp, firebaseAuth, createUserWithEmailAndPassword,
  sendPasswordResetEmail, sendEmailVerification,
  providerFacebookAuth, signInWithPopup, getAuth, FacebookAuthProvider,
  setPersistence, signInWithRedirect, inMemoryPersistence, GoogleAuthProvider,
  signInWithEmailAndPassword, signOut, getFirestore, collection, getDoc,
  getDocs, setDoc, doc, onSnapshot, query, where, deleteDoc,
  updateDoc, arrayRemove, arrayUnion, getStorage, ref,
  storage, database, storageRef, collectionUserName, collectionUserNamesSpanish,
  collectionPost, addDoc, getTask, getOnDatas,getPost, updatePosts, erasePost,
  onAuthStateChanged, updateProfile, serverTimestamp
};