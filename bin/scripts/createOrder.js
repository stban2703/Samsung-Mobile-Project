const buyForm = document.querySelector('.form--buy');
const buyButtons = buyForm.querySelectorAll('.customButton');
const inputFields = buyForm.querySelectorAll('.form--buy input')
const allInputs = buyForm.querySelectorAll('.input');
const buyTitle = document.querySelector('.sectionHeader__title');

let newOrder;

window.addEventListener('load', function() {
    inputFields.forEach(function(elem, i) {
        elem.value = '';
    })
})

// Save orden in temporal list
buyForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if (userInfo) {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        
        today = mm + '/' + dd + '/' + yyyy;

        let totalSum = 0;

        cartProducts.forEach(function (elem, i) {
            totalSum += (elem.price * elem.quantity);
        })

        newOrder = {
            userid: userInfo.uid,
            userName: userInfo.name,
            date: today,
            products: cartProducts,
            departament: buyForm.departament.value,
            city: buyForm.city.value,
            address: buyForm.address.value,
            neighborhood: buyForm.neighborhood.value,
            place: buyForm.place.value,
            additional: buyForm.additional.value,
            status: 'sent',
            totalPrice: totalSum
        }

        inputFields.forEach(function (elem, i) {
            elem.readOnly = true;
        })

        allInputs.forEach(function (elem, i) {
            elem.classList.add('input--locked')
        });

        console.log(newOrder.totalPrice);
        buyTitle.innerText = 'Verifica si la información es correcta';
        window.scrollTo(0, 0);

        buyTitle.classList.add('sectionHeader__title--blue');
    }

    buyButtons[1].classList.remove('hidden');
    buyButtons[2].classList.remove('hidden');
    buyButtons[0].classList.add('hidden');
    const cartListRemove = document.querySelectorAll('.cartList__remove');
    cartListRemove.forEach(element => {
        element.classList.add('hidden');
    });
});

// Buy order
buyButtons[1].addEventListener('click', function (event) {
    event.preventDefault();
    if (userInfo) {
        console.log('ok');
        ordersRef.doc(userInfo.uid).collection('orders').add(newOrder).then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            
            // Delete products from cart
            const promises = newOrder.products.map(function (elem) {
                return userRef.doc(userInfo.uid).collection('cart').doc(elem.id)
                    .delete() // elimine el documento asociado a esa referencia
            })

            Promise.all(promises).then(function () {
                console.log("Document successfully deleted!");
                getCart();
                //customAlert.classList.add('hidden');
                window.location = 'order.html';
            })
                .catch(function (error) {
                    // debería entrar si ocurre algún error
                    console.error("Error removing document: ", error);
                    // customAlert.classList.add('hidden');
                });
        }).catch(function (error) {
            console.error("Error adding document: ", error);
        });;
        
    }
});

// Edit order
buyButtons[2].addEventListener('click', function (event) {
    event.preventDefault();

    inputFields.forEach(function (elem, i) {
        elem.readOnly = false;
    })

    allInputs.forEach(function (elem, i) {
        elem.classList.remove('input--locked')
    });

    buyTitle.innerText = 'Comprar pedido';
    window.scrollTo(0, 0);

    buyButtons[1].classList.add('hidden');
    buyButtons[2].classList.add('hidden');
    buyButtons[0].classList.remove('hidden');

    const cartListRemove = document.querySelectorAll('.cartList__remove');
    cartListRemove.forEach(element => {
        element.classList.remove('hidden');
    });
});
