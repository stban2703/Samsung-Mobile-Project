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

let orders = [];
function getOrders() {
    const orderList = document.querySelector('.orderList');
    if (orderList) {
        //const loader = document.querySelector('.lds-ring');
        //loader.classList.remove('hidden');
        ordersRef.doc(userInfo.uid).collection('orders')  // referencia de la colección
            .get() // pide todos los documentos de la colección
            .then((querySnapshot) => {
                orders = [];
                querySnapshot.forEach((doc) => {
                    const obj = doc.data();
                    obj.id = doc.id;
                    orders.push(obj);
                    //console.log(`${doc.id} => ${doc.data()}`);
                });
                //loader.classList.add('hidden');
                renderOrders(orders);
            });
    }
}

const burguerBtn = document.querySelector(".header__menu");
const burguerMenu = document.querySelector(".burguer-menu");
const closeBurguerBtn = document.querySelector(".burguer-menu__close");
const darken = document.querySelector(".darken");
const html = document.querySelector("html");

function handleOpenBurguer() {
  darken.classList.remove("hidden")
  burguerMenu.classList.add("burguer-menu--move");
  html.style.overflow = "hidden";
}

function handleCloseBurguer() {
  if (!darken.classList.contains("hidden") && burguerMenu.classList.contains("burguer-menu--move")) {
    darken.classList.add("hidden")
    burguerMenu.classList.remove("burguer-menu--move");
    html.style.overflow = "visible";
  }
}

burguerBtn.addEventListener('click', handleOpenBurguer);
closeBurguerBtn.addEventListener('click', handleCloseBurguer);
