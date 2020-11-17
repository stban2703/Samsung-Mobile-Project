var userInfo;

firebase.auth().onAuthStateChanged(function (user) {
    const productList = document.querySelector('.productList');
    if (user) {
        userRef.doc(user.uid).get().then(function (doc) {
            if (doc.exists) {
                const data = doc.data();
                userInfo = data;
                userInfo.uid = user.uid;
                handleCurrent();
                getCart();
                getOrders();
                showUnlogged();

                if (productList) {
                    getProducts();
                }

                const showAdmin = document.querySelectorAll('.showAdmin');

                if (data.admin) {
                    showAdmin.forEach(function (elem) {
                        elem.classList.remove('hidden');
                    })

                } else {
                    showAdmin.forEach(function (elem) {
                        elem.classList.add('hidden');
                    });

                }
            }
        });
    } else {
        userInfo = null;
        if (productList) {
            getProducts();
        }
        const showAdmin = document.querySelectorAll('.showAdmin');
        showAdmin.forEach(function (elem) {
            elem.classList.add('hidden');
        })

        hideUnlogged();
    }
});

function handleCurrent() {
    const currentUserName = document.querySelectorAll('.currentUser');

    if (!userInfo.admin) {
        currentUserName.forEach(element => {
            element.innerText = `${userInfo.name}`
        });
    } else {
        currentUserName.forEach(element => {
            element.innerText = `Administrador`
        });
    }

}

const logOutBtn = document.querySelector('.logout');
logOutBtn.addEventListener('click', function (event) {
    event.preventDefault();
    firebase.auth().signOut();
    window.location.href = "login.html"
});

function hideUnlogged() {
    const unloggedFeatures = document.querySelectorAll('.unlogged');
    const loggedFeatures = document.querySelectorAll('.logged');
    unloggedFeatures.forEach(function (elem) {
        elem.classList.add('hidden');
    });

    loggedFeatures.forEach(function (elem) {
        elem.classList.remove('hidden');
    });
}

function showUnlogged() {
    const unloggedFeatures = document.querySelectorAll('.unlogged');
    const loggedFeatures = document.querySelectorAll('.logged');
    unloggedFeatures.forEach(function (elem) {
        elem.classList.remove('hidden');
    });

    loggedFeatures.forEach(function (elem) {
        elem.classList.add('hidden');
    });
}
