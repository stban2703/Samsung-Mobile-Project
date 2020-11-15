const buyForm = document.querySelector('.form--buy');
const saveBtn = buyForm.querySelector('.saveOrder');
const inputs = buyForm.querySelectorAll('.form--buy input')

let newOrder;

saveBtn.addEventListener('click', function (event) {
    event.preventDefault();
    if (userInfo) {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;

        let totalSum = 0;

        cartProducts.forEach(function(elem, i) {
            totalSum += elem.price;
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

        inputs.forEach(function(elem, i) {
            elem.readOnly = true;
        })

        console.log(newOrder);
    }
});
