import firebase from 'firebase/app';
import 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyCD7bWDWmWNm69gKKv0xO0r_x8F7zoEQs4",
  authDomain: "react-10681.firebaseapp.com",
  databaseURL: "https://react-10681.firebaseio.com",
  projectId: "react-10681",
  storageBucket: "react-10681.appspot.com",
  messagingSenderId: "567722142587",
  appId: "1:567722142587:web:4cd2b32f3a2484631febde",
  measurementId: "G-8PZM61BS2X"
};
firebase.initializeApp(firebaseConfig);
const storage =firebase.storage()
  export {storage,firebase as default}