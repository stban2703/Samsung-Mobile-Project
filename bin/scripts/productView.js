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

//let imageList = productImageRef.child(productId).listAll().value;
//console.log(imageList)

productsRef.doc(productId).get().then(
    function (snapshot) {
        let elem = snapshot.data();
        const previewImageRef = productImageRef.child(elem.imageRef).child('image1');
        previewImageRef.getDownloadURL().then((url) => {
            productViewTitle.innerText = elem.title;
            productViewPrice.innerText = `$ ${new Intl.NumberFormat().format(elem.price)}`;
            productViewDesc.innerText = elem.description;
            productViewClass.innerText = elem.class;
            productViewStorage.innerText = elem.storage;
            productViewCamera.innerText = elem.camera;
            productViewImage.src = url;
            setStars(elem, productView);
            renderThumbnails(productId, productView);
        });
    }
)

function renderThumbnails(id, ref) {
    const productViewThumbs = ref.querySelector('.productView__thumbs');

    productImageRef.child(id).listAll().then(function (res) {
        res.items.forEach(function (itemRef) {
            // All the items under listRef.
            itemRef.getDownloadURL().then(function (url) {
                console.log(url)
                const newThumbnail = document.createElement('div');
                newThumbnail.classList.add('productView__thumbnail');
                newThumbnail.innerHTML = `<img src="${url}" alt="">`;
                productViewThumbs.appendChild(newThumbnail);
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
}