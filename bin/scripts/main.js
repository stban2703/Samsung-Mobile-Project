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
const productsList = document.querySelector('.product-list');
//const form = document.querySelector('.form');


// Render products
function renderProducts(list) {
    productsList.innerHTML = '';
    let cameraList = [];
    let storageList = [];
    list.forEach(function (elem) {
        const newProduct = document.createElement('article');
        newProduct.classList.add('product');

        cameraList.push(elem.camera);
        storageList.push(elem.storage)

        newProduct.innerHTML = `
            <div class="product__preview">
                <img src="./src/images/galaxys20-1.jpg" alt="Galaxy S20 Ultra">
            </div>
            <div class="product__details">
                <h2 class="product__title">${elem.title}</h2>
                <span class="product__price">$ ${elem.price}</span>
                <div class="rating">
                    <img class="rating__star" src="./src/icons/starempty.svg" alt="">
                    <img class="rating__star" src="./src/icons/starempty.svg" alt="">
                    <img class="rating__star" src="./src/icons/starempty.svg" alt="">
                    <img class="rating__star" src="./src/icons/starempty.svg" alt="">
                    <img class="rating__star" src="./src/icons/starempty.svg" alt="">
                </div>
                <div class="product__controls">
                    <img class="product__option" src="./src/icons/delete.svg" alt="Borrar producto">
                    <img class="product__option" src="./src/icons/addtocart.svg" alt="Agregar al carrito">
                    <img class="product__option" src="./src/icons/edit.svg" alt="Editar producto">
                </div>
            </div>`;
        productsList.appendChild(newProduct);
    });

    //console.log(storageList.sort(function(a,b){return a - b;}));
    // Camera: [10, 12, 12, 12, 12, 12, 13, 13, 13, 16, 16, 16, 25, 25, 48, 48, 64, 64, 108, 108]
    // Storage: [32, 32, 64, 64, 64, 64, 64, 64, 128, 128, 128, 128, 128, 128, 256, 256, 256, 256, 512, 512]
}

function getProducts() {
    productsRef  // referencia de la colección
      .get() // pide todos los documentos de la colección
      .then((querySnapshot) => {
        const objects = [];
        querySnapshot.forEach((doc) => {
          const obj = doc.data();
          obj.id = doc.id;
          objects.push(obj);
          console.log(`${doc.id} => ${doc.data()}`);
        });
        renderProducts(objects);
      });
  }
  
  // render inicial con todos los productos
  getProducts();


// Add new product
/*form.addEventListener('submit', function (event) {

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

    productsRef
        .add(newProduct)
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
});*/
