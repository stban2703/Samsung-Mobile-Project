const createForm = document.querySelector('.form--create');
const customInputFiles = createForm.querySelectorAll('.customFileInput');
const fileInput = document.querySelectorAll('.customFileInput__file');
const customFileInputThumb = document.querySelectorAll('.customFileInput__thumb')
const formSection = document.querySelectorAll('.form__section');

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
        loadStars(obj, createForm);
    });

    fileInput[0].required = false;
    formSection[0].classList.add('hidden');

    const title = document.querySelector('.sectionHeader__title');
    title.innerText = 'Editar producto';

    const submitBtn = document.querySelector('.customButton--blue span');
    submitBtn.innerText = 'Actualizar producto';
}

createForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const filledStar = document.querySelectorAll('.rating__star--filled');

    if (filledStar.length > 0) {
        loaderContainer.classList.remove('hidden');
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

        if (!productId) {
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
                    loaderContainer.classList.add('hidden');
                });

        } else {
            newProduct.imageRef = productId;

            productsRef
                .doc(productId)
                .set(newProduct)
                .then(function (docRef) {
                    console.log('Producto actualizado');
                    handleRedirect(productId, newProduct.title);
                })
                .catch(function (error) {
                    loaderContainer.classList.add('hidden');
                    console.error("Error updating document: ", error);
                });;
        }

    } else if (filledStar.length == 0) {
        //alert('Ponele estrellas hombre')
        const success = document.querySelector('.success');
        success.classList.add('success--display');
        setTimeout(function () {
            success.classList.remove('success--display');
        }, 2500);
    }
});

function handleRedirect(id, title) {
    let productUrl = `product.html?${id}-${title}`;
    window.location = productUrl;
}
