import firebase from 'firebase'

var config= {
    apiKey: "AIzaSyCfGwnAF9wYPVKSGbgBp5oZVkJvGPOAae8",
    authDomain: "test-2c081.firebaseapp.com",
    databaseURL: "https://test-2c081.firebaseio.com",
    projectId: "test-2c081",
    storageBucket: "test-2c081.appspot.com",
    messagingSenderId: "811129955199",
    appId: "1:811129955199:web:ddfe10dd39322d57bb304a",
    measurementId: "G-NGHFM0V9GM"
};
firebase.initializeApp(config)

export default firebase