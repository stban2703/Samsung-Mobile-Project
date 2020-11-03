const createForm = document.querySelector('.form--create');
const customInputFiles = createForm.querySelectorAll('.customFileInput');

setCustomInputFile(customInputFiles);
setStars(createForm);

createForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const filledStar = document.querySelectorAll('.rating__star--filled');

    if (filledStar.length > 0) {
        const newProduct = {
            title: createForm.title.value,
            price: parseInt(createForm.price.value),
            class: createForm.class.value,
            rate: parseInt(filledStar.length),
            storage: parseInt(createForm.storage.value),
            camera: parseInt(createForm.camera.value),
            description: createForm.description.value,
            imageRef: ""
        };
        
        productsRef // referencia de la colección
            .add(newProduct) // cree un nuevo elemento en la colección
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
                docRef.update({
                    imageRef: docRef.id
                })

                uploadImages(docRef, createForm);

            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });

    } else if (filledStar.length == 0) {
        alert('Ponele estrellas hombre')
    }
});

function uploadImages(docRef, ref) {
    const fileInput = ref.querySelectorAll('.customFileInput__file');

    fileInput.forEach(function (elem, i) {

        let file = elem.files[0];

        if (file != null) {
            let newImageRef = productImageRef.child(`${docRef.id}/image${i + 1}`);
            newImageRef.put(file).then(function (snapshot) {
                console.log('Uploaded a blob or file!');
            });
        }
    })
}
