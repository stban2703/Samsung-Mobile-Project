const headerButton = document.querySelectorAll('.header__button');
const dropDownList = document.querySelector('.dropDownList');
const loaderContainer = document.querySelector('.lds-container');

document.addEventListener('click', function (event) {
    let isClickInside = headerButton[0].contains(event.target);

    if (!isClickInside) {
        dropDownList.classList.add('hidden');
    } else {
        dropDownList.classList.remove('hidden');
    }
});

function handleAddToCart(product, quantity) {
    if (userInfo) {
        userRef.doc(userInfo.uid).collection('cart').doc(product.id).set(
            {
                title: product.title,
                price: product.price,
                class: product.class,
                rate: product.rate,
                storage: product.storage,
                camera: product.camera,
                description: product.description,
                imageRef: product.imageRef,
                quantity: quantity
            }
        ).then(function () {
            alert('agregado')
        }).catch(function (error) {
            console.log(error.message)
        })

    } else {
        console.log('No has iniciado sesion')
    }
}

let cartProducts = [];
function getCart() {
    const cartList = document.querySelector('.cartList');
    if (cartList) {
        //const loader = document.querySelector('.lds-ring');
        //loader.classList.remove('hidden');
        
        userRef.doc(userInfo.uid).collection('cart')
            .get().then(function (querySnapshot) {
                cartProducts = [];
                querySnapshot.forEach((doc) => {
                    const obj = doc.data();
                    obj.id = doc.id;
                    cartProducts.push(obj);
                    //console.log(`${doc.id} => ${doc.data()}`);
                });

                //loader.classList.add('hidden');
                //cartList.classList.remove('hidden');
                renderCart(cartProducts);
            });
    }
}
