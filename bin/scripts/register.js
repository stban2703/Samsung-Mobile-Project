const registerForm = document.querySelector(".registerForm");

registerForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const userName = registerForm.userName.value;
    const userEmail = registerForm.userEmail.value;
    const userPassword = registerForm.userPassword.value;
    const confirmPassword = registerForm.confirmPassword.value;
    const loaderContainer = document.querySelector('.lds-container');

    if (userPassword == confirmPassword) {
        loaderContainer.classList.remove('hidden');
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then(function (credentials) {
            const userId = credentials.user.uid;
            userRef.doc(userId).set({
                email: userEmail,
                name: userName,
            }).then(function () {
                window.location.href = "index.html";
            });

        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(`${errorCode}: ${errorMessage}`)
            loaderContainer.classList.add('hidden');
            // ...
        });
    } else {
        alert('Las contraseñas no coinciden')
        loaderContainer.classList.add('hidden');
    }
})
