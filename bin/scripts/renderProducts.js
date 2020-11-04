const productList = document.querySelector('.productList');
const productListView = productList.querySelector('.productList__view');
const productListTotal = productList.querySelector('.productList__total');
const productListForm = productList.querySelector('.productList__form');
const sortForm = productListForm.sort;
const filterClass = productListForm.class;
const filterStorage = productListForm.storage;
const filterCamera = productListForm.camera;

// Render products
function renderProducts(list) {
    // Reset list
    productListView.innerHTML = '';

    // Total products
    productListTotal.innerHTML = `Total de productos mostrados: <strong>${list.length}</strong>`;

    list.forEach(function (elem) {
        const newProduct = document.createElement('div');
        const urlTitle = elem.title.replace(" ", "_");
        let productUrl = `product.html?${elem.id}-${urlTitle}`;
        let editUrl = `create.html?${elem.id}-${urlTitle}`;

        //newProduct.setAttribute('href', url);
        newProduct.classList.add('productList__product');

        // Format price to money
        const formattedPrice = new Intl.NumberFormat().format(elem.price);

        // Load first image from each folder in Storage
        const previewImageRef = productImageRef.child(elem.imageRef).child('image1');

        previewImageRef.getDownloadURL().then((url) => {
            newProduct.innerHTML = `
            <a class=productList__ref href=${productUrl}>
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
            </div>
            </a>
            <div class="productList__settings">
                <a><img class="productList__option" src="./src/icons/delete.svg" alt="Borrar producto"></a>
                <a><img class="productList__option" src="./src/icons/addtocart.svg" alt="Agregar al carrito"></a>
                <a href=${editUrl}><img class="productList__option" src="./src/icons/edit.svg" alt="Editar producto"></a>
            </div>`;

            loadStars(elem, newProduct)
        });
        productListView.appendChild(newProduct);
    });

}

function getProducts(sort) {
    const loader = document.querySelector('.lds-ring');
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

            let filteredList = objects
            loader.classList.add('hidden');
            productList.classList.remove('hidden');

            switch (sort) {
                case "none":
                    filteredList.sort(sortDefault);
                    renderProducts(filteredList);
                    break;

                case "lowerPrice":
                    filteredList.sort(sortByLowerPrice);
                    renderProducts(filteredList);
                    break;

                case "higherPrice":
                    filteredList.sort(sortByHigherPrice);
                    renderProducts(filteredList);
                    break;

                case "betterRate":
                    filteredList.sort(sortByBetterRate);
                    renderProducts(filteredList);
                    break;

                case "lowerRate":
                    filteredList.sort(sortByLowerRate);
                    renderProducts(filteredList);
                    break;
            }
        });
}

productListForm.addEventListener('change', function () {
    let newSort = sortForm.value;

    getProducts(newSort);
})

// render inicial con todos los productos
getProducts("none");
