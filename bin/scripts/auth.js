let currentUser;

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        userRef.doc(user.uid).get().then(function (doc) {
            if (doc.exists) {
                const data = doc.data();
                currentUser = data;
                handleCurrent();
            }
        });
    } else {
        currentUser = null;
    }
});

function handleCurrent() {
    const currentUserName = document.querySelectorAll('.currentUser');
    currentUserName.forEach(element => {
        element.innerText = `${currentUser.name}`
    });
}

const logOutBtn = document.querySelector('.logout');
logOutBtn.addEventListener('click', function (event) {
    event.preventDefault();
    firebase.auth().signOut();
    window.location.href = "login.html"
});
