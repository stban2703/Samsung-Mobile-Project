const productList = document.querySelector('.productList');
const productsView = productList.querySelector('.productList__view');
const productListTotal = productList.querySelector('.productList__total');
const productListForm = productList.querySelector('.productList__form');

const loader = document.querySelector('.lds-ring');

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

function getProducts(sort, filter) {
    loader.classList.remove('hidden');
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

            loader.classList.add('hidden');

            switch (sort) {
                case "none":
                    objects.sort(sortDefault);
                    renderProducts(objects);
                    break;

                case "lowerPrice":
                    objects.sort(sortByLowerPrice);
                    renderProducts(objects);
                    break;

                case "higherPrice":
                    objects.sort(sortByHigherPrice);
                    renderProducts(objects);
                    break;

                case "betterRate":
                    objects.sort(sortByBetterRate);
                    renderProducts(objects);
                    break;

                case "lowerRate":
                    objects.sort(sortByLowerRate);
                    renderProducts(objects);
                    break;
            }
        });
}

const sortForm = productListForm.sort;

sortForm.addEventListener('change', function () {
    let newSort = sortForm.value;
    getProducts(newSort);
})

// render inicial con todos los productos
getProducts("none");
