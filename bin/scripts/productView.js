const productView = document.querySelector('.productView');
const productViewCarrousel = productView.querySelector('.productView__carrousel');
const productViewImage = productView.querySelector('.productView__image');
const productViewTitle = productView.querySelector('.productView__title');
const productViewPrice = productView.querySelector('.productView__price');
const productViewDesc = productView.querySelector('.productView__desc');
const productViewClass = productView.querySelector('.productView__class');
const productViewStorage = productView.querySelector('.productView__storage');
const productViewCamera = productView.querySelector('.productView__camera');
const productViewEdit = productView.querySelector('.edit');
const productViewQuantity = productView.querySelector('.productView__quantity input');
const quantityButtons = productView.querySelectorAll('.productView__btn');
const productViewCounter = productView.querySelector('.productView__counter');
const counterCurrent = productViewCounter.querySelector('.productView__current');
const counterLast = productViewCounter.querySelector('.productView__last');
const customAlert = document.querySelector('.customAlert');

let parts = location.search.split("-")
let productId = parts[0].replace("?", "");

productsRef.doc(productId).get().then(
    function (snapshot) {
        let elem = snapshot.data();
        elem.id = productId;
        //const previewImageRef = productImageRef.child(elem.imageRef).child('image1');
        //previewImageRef.getDownloadURL().then((url) => {
        productViewTitle.innerText = elem.title;
        productViewPrice.innerText = `$ ${new Intl.NumberFormat().format(elem.price)}`;
        productViewDesc.innerText = elem.description;
        productViewClass.innerText = elem.class;
        productViewStorage.innerText = elem.storage;
        productViewCamera.innerText = elem.camera;
        loadStars(elem, productView);

        renderImages(productId);

        let editUrl = `create.html?${productId}-${elem.title}`
        productViewEdit.setAttribute('href', editUrl);

        const addBtn = productView.querySelector('.add');
        addBtn.addEventListener('click', function () {
            handleAddToCart(elem, parseInt(productViewQuantity.value));
        })

        const deleteBtn = productView.querySelector('.delete');
        deleteBtn.addEventListener('click', function () {
            customAlert.classList.remove('hidden');
            handleDelete(productId);
        });
    });

function handleQuantity() {
    productViewQuantity.addEventListener('input', function () {
        if (productViewQuantity.value <= 0) {
            productViewQuantity.value = 1;
        }
    });

    quantityButtons[0].addEventListener('click', function () {
        productViewQuantity.value--;
        if (productViewQuantity.value <= 0) {
            productViewQuantity.value = 1;
        }
    })

    quantityButtons[1].addEventListener('click', function () {
        productViewQuantity.value++;
    })
}

handleQuantity();

function renderImages(id) {
    productImageRef.child(id).listAll().then(function (res) {
        res.items.forEach(function (itemRef) {
            // All the items under listRef.
            itemRef.getDownloadURL().then(function (url) {
                const newImage = document.createElement('img');
                newImage.classList.add('productView__image');
                newImage.src = url;
                productViewCarrousel.appendChild(newImage);
                const loader = document.querySelector('.lds-ring');
                loader.classList.add('hidden');
                productView.classList.remove('hidden');
                totalImage++;
                console.log(totalImage)
                counterLast.innerText = totalImage;
            }).catch(function (error) {
                console.log(error);
            });
        });

    }).catch(function (error) {
        // Uh-oh, an error occurred!
        console.log(error);
    });
}

// Gallery
const backButton = productView.querySelector('.productView__previous');
const nextButton = document.querySelector('.productView__next');
const productViewImageContainer = productView.querySelector('.productView__imageContainer');

let current = 0;
let totalImage = 0;

backButton.addEventListener('click', function () {
    current--;
    if (current < 0) {
        current = productViewCarrousel.children.length - 1;
    }

    const width = productViewImageContainer.clientWidth;
    productViewCarrousel.style.transform = 'translate(-' + (width * current) + 'px, 0px)';
    counterCurrent.innerText = current + 1;
})

nextButton.addEventListener('click', function () {
    current++;
    if (current >= productViewCarrousel.children.length) {
        current = 0;
    }

    const width = productViewImageContainer.clientWidth;
    productViewCarrousel.style.transform = 'translate(-' + (width * current) + 'px, 0px)';
    counterCurrent.innerText = current + 1;
});

