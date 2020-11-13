const productList = document.querySelector('.productList');
const productListView = productList.querySelector('.productList__view');
const productListTotal = productList.querySelector('.productList__total');
const productListForm = productList.querySelector('.productList__form');
const sortForm = productListForm.sort;
const filterClass = productListForm.class;
const filterStorage = productListForm.storage;
const filterCamera = productListForm.camera;
const customAlert = document.querySelector('.customAlert');

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
                <img src=${url}>
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

            loadStars(elem, newProduct);

            const productListOption = newProduct.querySelectorAll('.productList__option');

            productListOption[0].addEventListener('click', function () {
                customAlert.classList.remove('hidden');
                handleDelete(elem.id);
            });

            productListOption[1].addEventListener('click', function () {
                handleAddToCart(elem, 1);
            });

        });
        productListView.appendChild(newProduct);
    })
}

let objectList = [];
function getProducts() {
    const loader = document.querySelector('.lds-ring');
    loader.classList.remove('hidden');
    productsRef  // referencia de la colección
        .get() // pide todos los documentos de la colección
        .then((querySnapshot) => {
            objectList = [];
            querySnapshot.forEach((doc) => {
                const obj = doc.data();
                obj.id = doc.id;
                objectList.push(obj);
                //console.log(`${doc.id} => ${doc.data()}`);
            });

            loader.classList.add('hidden');
            productList.classList.remove('hidden');
            renderProducts(objectList);
        });
}

productListForm.addEventListener('input', function () {
    let copy = objectList.slice();
    let newSort = sortForm.value;
    let newClass = filterClass.value;
    let newStorage = filterStorage.value;
    let newCamera = filterCamera.value;

    console.log(newSort)
    switch (newSort) {
        case "lowerPrice":
            copy.sort(function (a, b) {
                return a.price - b.price;
            })
            break;
        case "higherPrice":
            copy.sort(function (a, b) {
                return b.price - a.price;
            })
            break;
        case "lowerRate":
            copy.sort(function (a, b) {
                return a.rate - b.rate;
            })
            break;
        case "betterRate":
            copy.sort(function (a, b) {
                return b.rate - a.rate;
            })
            break;
    }


    if (newClass) {
        copy = copy.filter(function (elem) {
            if (elem.class === newClass) {
                return true;
            }
        })
    }

    if (newStorage) {
        copy = copy.filter(function (elem) {
            if (elem.storage == parseInt(newStorage)) {
                return true;
            }
        })
    }

    if (newCamera) {
        let range = newCamera.split(',');
        let min = parseInt(range[0]);
        let max = parseInt(range[1]);

        console.log(min + " " + max);

        copy = copy.filter(function (elem) {
            if (elem.camera >= min && elem.camera <= max) {
                return true;
            }
        })
    }

    renderProducts(copy)

})

// render inicial con todos los productos
getProducts();

function handleDelete(id) {

    const deleteBtn = customAlert.querySelector('.customAlert__delete');
    const cancelBtn = customAlert.querySelector('.customAlert__cancel');

    deleteBtn.addEventListener('click', function () {
        productsRef // referencia de la colección
            .doc(id) // referencia de un documento específico en esa colección
            .delete() // elimine el documento asociado a esa referencia
            .then(function () {
                // debería entrar si todo sale bien
                console.log("Document successfully deleted!");
                getProducts('none'); // traiga los productos cuando estemos seguros de que ya eliminó el que le dijimos
                customAlert.classList.add('hidden');
            })
            .catch(function (error) {
                // debería entrar si ocurre algún error
                console.error("Error removing document: ", error);
                customAlert.classList.add('hidden');
            });
    });

    cancelBtn.addEventListener('click', function () {
        customAlert.classList.add('hidden');
    })
}
