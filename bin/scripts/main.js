const headerButton = document.querySelectorAll('.header__button');
const dropDownList = document.querySelector('.dropDownList');
const loaderContainer = document.querySelector('.lds-container');

headerButton[1].addEventListener('click', function() {
    if(userInfo) {
        window.location = 'cart.html'
    } else {
        window.location = 'login.html'
    }
})

headerButton[2].addEventListener('click', function() {
    if(userInfo) {
        window.location = 'order.html'
    } else {
        window.location = 'login.html'
    }
})

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
        const success = document.querySelector('.success');
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
            //alert('agregado')
            success.classList.add('success--display');

            setTimeout(function() {
                success.classList.remove('success--display');
            }, 1500);

        }).catch(function (error) {
            console.log(error.message)
        })

    } else {
        window.location = 'login.html';
    }
}

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
                window.location = "index.html" // traiga los productos cuando estemos seguros de que ya eliminó el que le dijimos
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
