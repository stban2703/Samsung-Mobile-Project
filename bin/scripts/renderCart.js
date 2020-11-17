const cartList = document.querySelector('.cartList');
const cartListTotal = cartList.querySelector('.cartList__total');
const cartListContainer = cartList.querySelector('.cartList__container');
const cartListTotalPrice = cartList.querySelector('.cartList__priceSum');
const cartListDeleteAll = cartList.querySelector('.deleteAll');
const empty = document.querySelector('.empty');

function renderCart(list) {
    const loader = document.querySelector('.lds-ring');
    if (loader) {
        loader.classList.add('hidden');
    }
    cartList.classList.remove('hidden');
    cartListContainer.innerHTML = '';
    if (list.length > 0) {
        // Total products
        cartListTotal.innerHTML = `Total de articulos en carrito: <strong>${list.length}</strong>`;

        let priceSum = 0;

        list.forEach(function (elem) {
            const newCart = document.createElement('div');

            //newProduct.setAttribute('href', url);
            newCart.classList.add('cartList__order');

            // Format price to money
            const formattedPrice = new Intl.NumberFormat().format(elem.price * elem.quantity);

            priceSum += (elem.price * elem.quantity);

            // Load first image from each folder in Storage
            const previewImageRef = productImageRef.child(elem.imageRef).child('image1');

            previewImageRef.getDownloadURL().then((url) => {

                newCart.innerHTML = `
                    <img class="cartList__thumb" src=${url} alt="">
                    <div class="cartList__info">
                        <h5 class="cartList__title">${elem.title}</h5>
                        <h5 class="cartList__quantity"><strong>Cantidad: </strong>${elem.quantity}</h5>
                        <h5 class="cartList__totalPrice"><strong>Precio total: </strong>$ ${formattedPrice}</h5>
                    </div>
                    <img class="cartList__remove" src="./src/icons/delete.svg" alt="">`;

                const cartListRemove = newCart.querySelector('.cartList__remove');
                if (cartListRemove) {
                    cartListRemove.addEventListener('click', function () {
                        userRef.doc(userInfo.uid).collection('cart') // referencia de la colección
                            .doc(elem.id)
                            .delete() // elimine el documento asociado a esa referencia
                            .then(function () {
                                // debería entrar si todo sale bien
                                console.log("Document successfully deleted!");
                                getCart(); // traiga los productos cuando estemos seguros de que ya eliminó el que le dijimos
                                //customAlert.classList.add('hidden');
                            })
                            .catch(function (error) {
                                // debería entrar si ocurre algún error
                                console.error("Error removing document: ", error);
                                // customAlert.classList.add('hidden');
                            });
                    })
                }

            });
            cartListContainer.appendChild(newCart);
            cartListTotalPrice.innerHTML = `Precio total: <strong>$ ${new Intl.NumberFormat().format(priceSum)}</strong>`;
        })

        if (cartListDeleteAll) {
            cartListDeleteAll.addEventListener('click', function () {
                loaderContainer.classList.remove('hidden');
                const promises = list.map(function (elem) {
                    return userRef.doc(userInfo.uid).collection('cart').doc(elem.id)
                        .delete() // elimine el documento asociado a esa referencia
                })

                Promise.all(promises).then(function () {
                    console.log("Document successfully deleted!");
                    getCart();
                    loaderContainer.classList.add('hidden');
                })
                    .catch(function (error) {
                        // debería entrar si ocurre algún error
                        console.error("Error removing document: ", error);
                        // customAlert.classList.add('hidden');
                    });
            });
        }

    } else {
        cartListTotal.innerHTML = ``;
        cartListTotalPrice.innerHTML = ``;
        empty.classList.remove('hidden');
        cartList.classList.add('hidden');
    }

}
