import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';

//! Real settings
const firebaseConfig = {
  apiKey: 'AIzaSyAE92J5Y9779J2ZOD8wvNQ-04Sa14DHvzo',
  authDomain: 'kdz-qr.firebaseapp.com',
  databaseURL: 'https://kdz-qr.firebaseio.com',
  projectId: 'kdz-qr',
  storageBucket: 'kdz-qr.appspot.com',
  messagingSenderId: '367658848563',
  appId: '1:367658848563:web:ee0ede592e0de3e529ae46',
};

//? Tests settings
/*const firebaseConfig = {
  apiKey: 'AIzaSyBVYhFTA377xiyupJUAmFMVWAjqJBZL56c',
  authDomain: 'qr-tests.firebaseapp.com',
  databaseURL: 'https://qr-tests.firebaseio.com',
  projectId: 'qr-tests',
  storageBucket: 'qr-tests.appspot.com',
  messagingSenderId: '17601264140',
  appId: '1:17601264140:web:97ead5a5c671ab5c3a8c29',
};*/

//? Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.database();
export const dbBackup = firebase.firestore();
