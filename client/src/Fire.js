import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBrQCEANaN3Z5s4xjoaOm6MocXGnlF-p_0",
  authDomain: "mercury-1875e.firebaseapp.com",
  databaseURL: "https://mercury-1875e.firebaseio.com",
  projectId: "mercury-1875e",
  storageBucket: "mercury-1875e.appspot.com",
  messagingSenderId: "478630514853",
  appId: "1:478630514853:web:5cced82d5d9e1ea08abd4c",
  measurementId: "G-8DRXMZRMHH"
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire;