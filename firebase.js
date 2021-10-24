import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyB9PB1UiUSh9Xzv0h2JPnH85Fli0nDkceQ",
    authDomain: "app-cadastro-completo.firebaseapp.com",
    databaseURL: "https://app-cadastro-completo-default-rtdb.firebaseio.com",
    projectId: "app-cadastro-completo",
    storageBucket: "app-cadastro-completo.appspot.com",
    messagingSenderId: "712254750455",
    appId: "1:712254750455:web:a381a4f8243ae49be55df2"
  };

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export default database;
