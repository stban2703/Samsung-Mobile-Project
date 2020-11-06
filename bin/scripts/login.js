const loginForm = document.querySelector(".loginForm");

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const userEmail = loginForm.userEmail.value;
    const userPassword = loginForm.userPassword.value

    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).then(function () {
        window.location.href = "index.html";

    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        alert(errorMessage)
    })
});