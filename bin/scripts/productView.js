const productView = document.querySelector('.productView');
const productViewImage = productView.querySelector('.productView__image img');
const productViewTitle = productView.querySelector('.productView__title');
const productViewPrice = productView.querySelector('.productView__price');
const productViewDesc = productView.querySelector('.productView__desc');
const productViewClass = productView.querySelector('.productView__class');
const productViewStorage = productView.querySelector('.productView__storage');
const productViewCamera = productView.querySelector('.productView__camera');

let parts = location.search.split("-")
let productId = parts[0].replace("?", "");

productsRef.doc(productId).get().then(
    function (snapshot) {
        let elem = snapshot.data();
        const previewImageRef = productImageRef.child(elem.imageRef).child('image1');
        previewImageRef.getDownloadURL().then((url) => {
            productViewImage.src = url;
            productViewTitle.innerText = elem.title;
            productViewPrice.innerText = `$ ${new Intl.NumberFormat().format(elem.price)}`;
            productViewDesc.innerText = elem.description;
            productViewClass.innerText = elem.class;
            productViewStorage.innerText = elem.storage;
            productViewCamera.innerText = elem.camera;
            setStars(elem, productView);
            const loader = document.querySelector('.lds-ring');
            loader.classList.add('hidden');
            productView.classList.remove('hidden');
        });
    }
)

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