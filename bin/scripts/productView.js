const productView = document.querySelector('.productView');
const productViewImage = productView.querySelector('.productView__image img');
const productViewTitle = productView.querySelector('.productView__title');
const productViewPrice = productView.querySelector('.productView__price');
const productViewDesc = productView.querySelector('.productView__desc');
const productViewClass = productView.querySelector('.productView__class');
const productViewStorage = productView.querySelector('.productView__storage');
const productViewCamera = productView.querySelector('.productView__camera');
const productViewEdit = productView.querySelector('.edit');
const productViewQuantity = productView.querySelector('.productView__quantity input');
const quantityButtons = productView.querySelectorAll('.productView__btn');

let parts = location.search.split("-")
let productId = parts[0].replace("?", "");

productsRef.doc(productId).get().then(
    function (snapshot) {
        let elem = snapshot.data();
        elem.id = productId;
        const previewImageRef = productImageRef.child(elem.imageRef).child('image1');
        previewImageRef.getDownloadURL().then((url) => {
            productViewImage.src = url;
            productViewTitle.innerText = elem.title;
            productViewPrice.innerText = `$ ${new Intl.NumberFormat().format(elem.price)}`;
            productViewDesc.innerText = elem.description;
            productViewClass.innerText = elem.class;
            productViewStorage.innerText = elem.storage;
            productViewCamera.innerText = elem.camera;
            loadStars(elem, productView);
            const loader = document.querySelector('.lds-ring');
            loader.classList.add('hidden');
            productView.classList.remove('hidden');
            let editUrl = `create.html?${productId}-${elem.title}`
            productViewEdit.setAttribute('href', editUrl);
        });

        const addBtn = productView.querySelector('.add');
        addBtn.addEventListener('click', function() {
            handleAddToCart(elem, parseInt(productViewQuantity.value));
        })

        const deleteBtn = productView.querySelector('.delete');
        deleteBtn.addEventListener('click', function () {
            //loader.classList.add('loader--show');
            productsRef // referencia de la colección
                .doc(productId) // referencia de un documento específico en esa colección
                .delete() // elimine el documento asociado a esa referencia
                .then(function () {
                    // debería entrar si todo sale bien
                    console.log("Document successfully deleted!");
                    window.location = 'index.html'
                })
                .catch(function (error) {
                    // debería entrar si ocurre algún error
                    console.error("Error removing document: ", error);
                });
        });
    });

function handleQuantity() {
    productViewQuantity.addEventListener('input', function() {
        if(productViewQuantity.value <= 0) {
            productViewQuantity.value = 1;
        }
    });

    quantityButtons[0].addEventListener('click', function() {
        productViewQuantity.value--;
        if(productViewQuantity.value <= 0) {
            productViewQuantity.value = 1;
        }
    })

    quantityButtons[1].addEventListener('click', function() {
        productViewQuantity.value++;
    })
}

handleQuantity();

/*function renderImages(id, ref) {
    const productViewImage = ref.querySelector('.productView__image');

    productImageRef.child(id).listAll().then(function (res) {
        res.items.forEach(function (itemRef) {
            // All the items under listRef.
            itemRef.getDownloadURL().then(function (url) {
                const newImage = document.createElement('img');
                newImage.src = url;
                productViewImage.appendChild(newImage);
                const loader = document.querySelector('.lds-ring');
                loader.classList.add('hidden');
                productView.classList.remove('hidden');
            }).catch(function (error) {
                console.log(error);
            });
        });


    }).catch(function (error) {
        // Uh-oh, an error occurred!
        console.log(error);
    });
}*/