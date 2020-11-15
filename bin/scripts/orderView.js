let urlParts = location.search.split("-")

let orderuserid = urlParts[0].replace('?', '');
let orderid = urlParts[1];

console.log(orderuserid + " / " + orderid)

ordersRef.doc(orderuserid).collection('orders').doc(orderid).get().then(
    function (snapshot) {
        let elem = snapshot.data();

        console.log(elem)
        /*const previewImageRef = productImageRef.child(elem.imageRef).child('image1');
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
        });*/


    });