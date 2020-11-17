const orderList = document.querySelector('.orderList');
const orderListTotal = orderList.querySelector('.orderList__total');
const orderListContainer = orderList.querySelector('.orderList__container');
const empty = document.querySelector('.empty');

function renderOrders(list) {
    orderListContainer.innerHTML = '';
    const loader = document.querySelector('.lds-ring');
    loader.classList.add('hidden');
    orderList.classList.remove('hidden');

    if (list.length > 0) {
        // Total products
        orderListTotal.innerHTML = `Número de pedidos: <strong>${list.length}</strong>`;

        let sortedList = list.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        });

        sortedList.forEach(function (elem) {
            const newOrder = document.createElement('a');

            let url = `orderView.html?${elem.userid}-${elem.id}`;

            let dateParts = elem.date.split("/");
            let formatDate = dateParts[1] + "/" + dateParts[0] + "/" + dateParts[2];


            // Delivery date
            let deliveryParts = elem.deliveryDate.split("/");
            let formatDelivery = deliveryParts[1] + "/" + deliveryParts[0] + "/" + deliveryParts[2];

            newOrder.setAttribute('href', url);
            newOrder.classList.add('orderList__order');

            // Format price to money
            const formattedPrice = new Intl.NumberFormat().format(elem.totalPrice);

            newOrder.innerHTML = `
                <h4 class="orderList__info"><strong> Cliente: </strong>${elem.userName}</h4>
                <h4 class="orderList__info"><strong>Estado: </strong><span class="orderList__status">En camino</span></h4>
                <h4 class="orderList__info"><strong>Fecha: </strong>${formatDate}</h4>
                <h4 class="orderList__info"><strong> Fecha estimada de entrega: </strong>${formatDelivery}</h4>
                <h4 class="orderList__info"><strong> Total pagado: </strong><span class="orderList__price">$ ${formattedPrice}</span></h4>
                <img class="orderList__arrow" src="./src/icons/rightarrow.svg" alt="">
            `;

            orderListContainer.appendChild(newOrder);
        });
    } else {
        empty.classList.remove('hidden');
        orderList.classList.add('hidden');
    }
}

