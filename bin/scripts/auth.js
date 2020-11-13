var userInfo;

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        userRef.doc(user.uid).get().then(function (doc) {
            if (doc.exists) {
                const data = doc.data();
                userInfo = data;
                userInfo.uid = user.uid;
                handleCurrent();
                getCart();
            }
        });
    } else {
        userInfo = null;
    }
});

function getCart() {
    //const loader = document.querySelector('.lds-ring');
    //loader.classList.remove('hidden');
    let objectList = [];
    userRef.doc(userInfo.uid).collection('cart')
        .get()
        .then((querySnapshot) => {
            objectList = [];
            querySnapshot.forEach((doc) => {
                const obj = doc.data();
                obj.id = doc.id;
                objectList.push(obj);
                console.log(obj)
                //console.log(`${doc.id} => ${doc.data()}`);
            });

            //loader.classList.add('hidden');
            //cartList.classList.remove('hidden');
            //renderProducts(objectList);
        });
}

function handleCurrent() {
    const currentUserName = document.querySelectorAll('.currentUser');
    currentUserName.forEach(element => {
        element.innerText = `${userInfo.name}`
    });
}

const logOutBtn = document.querySelector('.logout');
logOutBtn.addEventListener('click', function (event) {
    event.preventDefault();
    firebase.auth().signOut();
    window.location.href = "login.html"
});
