const createForm = document.querySelector('.form--create');
const customInputFiles = createForm.querySelectorAll('.customFileInput');

setCustomInputFile(customInputFiles);
setStars(createForm);

let parts = location.search.split("-")
let productId = parts[0].replace("?", "");

if (productId) {
    productsRef.doc(productId).get().then((doc) => {
        const obj = doc.data()
        createForm.title.value = obj.title;
        createForm.price.value = obj.price;
        createForm.class.value = obj.class;
        createForm.storage.value = obj.storage;
        createForm.camera.value = obj.camera;
        createForm.description.value = obj.description;
    });

    let imagesList = getImages(productId);
}

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
