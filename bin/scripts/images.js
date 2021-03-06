function uploadImages(docRef, ref) {
    const fileInput = ref.querySelectorAll('.customFileInput__file');

    fileInput.forEach(function (elem, i) {

        let file = elem.files[0];

        if (file != null) {
            let newImageRef = productImageRef.child(`${docRef.id}/image${i + 1}`);
            newImageRef.put(file).then(function (snapshot) {
                console.log('Uploaded a blob or file!');
                loaderContainer.classList.add('hidden');
                handleRedirect(docRef.id, createForm.title.value);
            }).catch(function(error) {
                console.log('Error: ' + error.message);
                loaderContainer.classList.add('hidden');
            });
        }
    })
}

function setFileImage(ref, list) {
    const fileList = ref.querySelectorAll('.customFileInput__file');
    fileList.forEach(function(e, i) {
        e.value = list[i];
        console.log(e.value)
    });
}
