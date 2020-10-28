const productList = document.querySelector('.productList');
const productsView = productList.querySelector('.productList__view');
const productListTotal = productList.querySelector('.productList__total');
const productListForm = productList.querySelector('.productList__form');

// Render products
function renderProducts(list) {
    // Reset list
    productsView.innerHTML = '';

    // Total products
    productListTotal.innerHTML = `Total de productos mostrados: <strong>${list.length}</strong>`;

    list.forEach(function (elem) {
        const newProduct = document.createElement('a');
        newProduct.classList.add('productList__product');

        // Format price to money
        const formattedPrice = new Intl.NumberFormat().format(elem.price);

        // Load first image from each folder in Storage
        const previewImageRef = productImageRef.child(elem.imageRef).child('image1');

        previewImageRef.getDownloadURL().then((url) => {
            newProduct.innerHTML = `
            <div class="productList__preview">
                <img src="${url}">
            </div>
            <div class="productList__details">
                <h3 class="productList__name">${elem.title}</h3>
                <span class="productList__price">$ ${formattedPrice}</span>
                <div class="rating">
                    <img class="rating__star" src="./src/icons/starempty.svg" alt="">
                    <img class="rating__star" src="./src/icons/starempty.svg" alt="">
                    <img class="rating__star" src="./src/icons/starempty.svg" alt="">
                    <img class="rating__star" src="./src/icons/starempty.svg" alt="">
                    <img class="rating__star" src="./src/icons/starempty.svg" alt="">
                </div>
                <div class="productList__settings">
                    <img class="productList__option" src="./src/icons/delete.svg" alt="Borrar producto">
                    <img class="productList__option" src="./src/icons/addtocart.svg" alt="Agregar al carrito">
                    <img class="productList__option" src="./src/icons/edit.svg" alt="Editar producto">
                </div>
            </div>`;

            setStars(elem, newProduct)
        });
        productsView.appendChild(newProduct);
    });

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
                //console.log(`${doc.id} => ${doc.data()}`);
            });

            renderProducts(objects);
        });
}

function setStars(obj, ref) {
    const ratingStar = ref.querySelectorAll('.rating__star');
    for (let i = 0; i < obj.rate; i++) {
        ratingStar[i].src = './src/icons/starfilled.svg';
    }
}

/*function sortProducts(list) {

    console.log(productListForm.sort.value);
    if (productListForm.sort.value == "none") {
        renderProducts(list.sort(sortDefault));
    }

    if (productListForm.sort.value == "lowerPrice") {
        renderProducts(list.sort(sortByLowerPrice));
    }

    if (productListForm.sort.value == "higherPrice") {
        renderProducts(list.sort(sortByHigherPrice));
    }

    if (productListForm.sort.value == "betterRate") {
        renderProducts(list.sort(sortByBetterRate));
    }
}*/

// render inicial con todos los productos
getProducts();
