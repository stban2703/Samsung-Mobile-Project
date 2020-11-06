const loginForm = document.querySelector(".loginForm");

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const userEmail = loginForm.userEmail.value;
    const userPassword = loginForm.userPassword.value;

    loaderContainer.classList.remove('hidden');

    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).then(function () {
        loaderContainer.classList.add('hidden');
        window.location.href = "index.html";

    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        loaderContainer.classList.add('hidden');
        alert(errorMessage)
    })
});