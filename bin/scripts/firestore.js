// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyDjUFbImgoRuXvVHXwexaMWMqVe6j3pUlw",
    authDomain: "online-store-project-d02b8.firebaseapp.com",
    databaseURL: "https://online-store-project-d02b8.firebaseio.com",
    projectId: "online-store-project-d02b8",
    storageBucket: "online-store-project-d02b8.appspot.com",
    messagingSenderId: "869545136594",
    appId: "1:869545136594:web:fba8ab9a64cd420a90780b",
    measurementId: "G-CHNYH0N3HJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// References
const db = firebase.firestore();
const productsRef = db.collection('products');