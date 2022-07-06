import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCXTGhdPuaNz-Eus9SvYuTK2hCRB2rJkLQ",
    authDomain: "clone-897ed.firebaseapp.com",
    projectId: "clone-897ed",
    storageBucket: "clone-897ed.appspot.com",
    messagingSenderId: "350254050404",
    appId: "1:350254050404:web:c417f115913e114b46c371",
    measurementId: "G-K71SK2CV34"
  };

  //Initializing the app
  const firebaseApp = firebase.initializeApp(firebaseConfig)

  //initialize the database

  const db=firebaseApp.firestore(); 
  const auth = firebase.auth();

  <script src="https://www.gstatic.com/firebasejs/6.2.4/firebase-database.js"></script>


  export {db,auth};
