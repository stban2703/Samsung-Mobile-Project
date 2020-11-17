const orderView = document.querySelector('.orderView');
const orderViewList = orderView.querySelector('.orderView__list');
const orderViewStatus = orderView.querySelector('.orderView__status');
const orderViewClient = orderView.querySelector('.orderView__client');
const orderViewDate = orderView.querySelector('.orderView__date');
const orderViewDelivery = orderView.querySelector('.orderView__delivery');
const orderViewDepartament = orderView.querySelector('.orderView__departament');
const orderViewCity = orderView.querySelector('.orderView__city');
const orderViewAddress = orderView.querySelector('.orderView__address');
const orderViewNeighborhood = orderView.querySelector('.orderView__neighborhood');
const orderViewPlace = orderView.querySelector('.orderView__place');
const orderViewAdditional = orderView.querySelector('.orderView__additional');
const orderViewStatusIcon = orderView.querySelectorAll('.orderView__statusIcon');
const orderViewTotalPrice = orderView.querySelector('.orderView__totalPrice span');
const orderTitle = document.querySelector('.sectionHeader__title span');

let urlParts = location.search.split("-")
let orderuserid = urlParts[0].replace('?', '');
let orderid = urlParts[1];

ordersRef.doc(orderuserid).collection('orders').doc(orderid).get().then(
    function (snapshot) {
        let elem = snapshot.data();
        elem.id = orderid;

        if (elem.status == 'Enviado') {
            orderViewStatusIcon[0].classList.remove('hidden')
            orderViewStatusIcon[1].classList.add('hidden')
        } else {
            orderViewStatusIcon[0].classList.add('hidden')
            orderViewStatusIcon[1].classList.remove('hidden')
        }

        orderViewStatus.innerText = elem.status;
        orderTitle.innerText = elem.id;
        orderViewClient.innerText = elem.userName;
        orderViewDate.innerText = elem.date;
        orderViewDelivery.innerText = elem.deliveryDate;
        orderViewDepartament.innerText = elem.departament;
        orderViewCity.innerText = elem.city;
        orderViewAddress.innerText = elem.address;
        orderViewNeighborhood.innerText = elem.neighborhood;
        orderViewPlace.innerText = elem.place;
        orderViewAdditional.innerText = elem.additional;

        let priceSum = 0;

        elem.products.forEach(function (elem) {
            const newOrderProduct = document.createElement('div');

            //newProduct.setAttribute('href', url);
            newOrderProduct.classList.add('cartList__order');

            // Format price to money
            const formattedPrice = new Intl.NumberFormat().format(elem.price * elem.quantity);

            priceSum += (elem.price * elem.quantity);

            // Load first image from each folder in Storage
            const previewImageRef = productImageRef.child(elem.imageRef).child('image1');

            previewImageRef.getDownloadURL().then((url) => {

                newOrderProduct.innerHTML = `
                    <img class="cartList__thumb" src=${url} alt="">
                    <div class="cartList__info">
                        <h5 class="cartList__title">${elem.title}</h5>
                        <h5 class="cartList__quantity"><strong>Cantidad: </strong>${elem.quantity}</h5>
                        <h5 class="cartList__totalPrice"><strong>Precio total: </strong>$ ${formattedPrice}</h5>
                    </div>`;
            });
            const loader = document.querySelector('.lds-ring');
            loader.classList.add('hidden');
            orderView.classList.remove('hidden');
            orderViewList.appendChild(newOrderProduct);
            orderViewTotalPrice.innerHTML = "$ " + new Intl.NumberFormat().format(priceSum);
        })

    });