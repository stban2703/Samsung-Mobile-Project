const productList = document.querySelector('.productList');
const productListContainer = productList.querySelector('.productList__container');
const productListView = productList.querySelector('.productList__view');
const productListTotal = productList.querySelector('.productList__total');
const productListForm = productList.querySelector('.productList__form');
const productListConstrols = productList.querySelector('.productList__controls');
const productListCreateBtn = productList.querySelector('.createButton');
const productListResponsiveControls = productList.querySelector('.productList__responsiveControls');
const productListControlsClose = productList.querySelector('.productList__close');
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

        productListContainer.classList.remove('hidden');

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
                <a><img class="productList__option showAdmin" src="./src/icons/delete.svg" alt="Borrar producto"></a>
                <a><img class="productList__option" src="./src/icons/addtocart.svg" alt="Agregar al carrito"></a>
                <a href=${editUrl}><img class="productList__option showAdmin" src="./src/icons/edit.svg" alt="Editar producto"></a>
            </div>`;

            loadStars(elem, newProduct);

            const productListOption = newProduct.querySelectorAll('.productList__option');
            const productListAdmin = newProduct.querySelectorAll('.showAdmin');

            productListOption[0].addEventListener('click', function () {
                customAlert.classList.remove('hidden');
                handleDelete(elem.id);
            });

            productListOption[1].addEventListener('click', function () {
                handleAddToCart(elem, 1);
            });

            productListAdmin.forEach(elem => {
                if (userInfo) {
                    if (userInfo.admin) {
                        elem.classList.remove('hidden');
                    } else {
                        elem.classList.add('hidden');
                    }
                } else {
                    elem.classList.add('hidden');
                }
            })

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
            loader.classList.add('hidden');
            loader.classList.add('hidden');
            querySnapshot.forEach((doc) => {
                const obj = doc.data();
                obj.id = doc.id;
                objectList.push(obj);
                //console.log(`${doc.id} => ${doc.data()}`);
            });

            loader.classList.add('hidden');
            renderProducts(objectList);
        });
}


productListForm.addEventListener('input', function () {
    let copy = objectList.slice();
    let newSort = sortForm.value;
    let newClass = filterClass.value;
    let newStorage = filterStorage.value;
    let newCamera = filterCamera.value;

    if (window.innerWidth <= 960) {
        html.style.overflow = "visible";
        productListConstrols.classList.add('hidden');
    }

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



if (window.innerWidth <= 960) {
    productListConstrols.classList.add('hidden');
    productListControlsClose.classList.remove('hidden');
} else {
    productListConstrols.classList.remove('hidden');
    productListControlsClose.classList.add('hidden');
    productListConstrols.classList.remove('productList__controls--responsive');
}

window.onresize = function () {
    if (window.innerWidth <= 960 && !productListConstrols.classList.contains("productList__controls--responsive")) {
        productListConstrols.classList.add('hidden');
        productListControlsClose.classList.remove('hidden');
    } else {
        productListConstrols.classList.remove('hidden');
        productListConstrols.classList.remove('productList__controls--responsive');
        productListControlsClose.classList.add('hidden');
    }
};

productListResponsiveControls.addEventListener('click', function () {

    if (window.innerWidth <= 960) {
        html.style.overflow = "hidden";
        productListConstrols.classList.remove('hidden');
        productListConstrols.classList.add("productList__controls--responsive");
    }
})

productListControlsClose.addEventListener('click', function () {
    if (productListConstrols.classList.contains("productList__controls--responsive")) {
        html.style.overflow = "visible";
        productListConstrols.classList.add('hidden');
    }
});
