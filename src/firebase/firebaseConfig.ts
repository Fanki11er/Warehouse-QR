import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import Rebase from 're-base';

const firebaseConfig = {
  apiKey: 'AIzaSyAE92J5Y9779J2ZOD8wvNQ-04Sa14DHvzo',
  authDomain: 'kdz-qr.firebaseapp.com',
  databaseURL: 'https://kdz-qr.firebaseio.com',
  projectId: 'kdz-qr',
  storageBucket: 'kdz-qr.appspot.com',
  messagingSenderId: '367658848563',
  appId: '1:367658848563:web:ee0ede592e0de3e529ae46',
};

//? Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.database();
export const dataBase = Rebase.createClass(db);
//export { dataBase };
export default firebase;
