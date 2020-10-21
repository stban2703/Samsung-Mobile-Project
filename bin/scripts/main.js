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
const productsRef = db.collection("products");

const form = document.querySelector('.form');

form.addEventListener('submit', function (event) {

    event.preventDefault();

    const newProduct = {
        title: form.title.value,
        price: parseInt(form.price.value),
        class: form.class.value,
        rate: parseInt(form.rate.value),
        storage: parseInt(form.storage.value),
        camera: parseInt(form.camera.value),
        description: form.description.value,
    };

    productsRef // referencia de la colección
        .add(newProduct) // cree un nuevo elemento en la colección
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
});
