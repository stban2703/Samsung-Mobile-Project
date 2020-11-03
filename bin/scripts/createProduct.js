const createForm = document.querySelector('.form--create');
const customInputFiles = createForm.querySelectorAll('.customFileInput');

customInputFiles.forEach(function (e, i) {
    const fileInput = e.querySelector('.customFileInput__file');
    const fileName = e.querySelector('.customFileInput__title');
    const fileImage = e.querySelector('.customFileInput__thumb');
    const addBtn = e.querySelector('.customFileInput__add');
    const removeBtn = e.querySelector('.customFileInput__remove');

    fileInput.addEventListener('change', function () {
        console.log(fileInput.files.length > 0 || fileInput.value != '')
        if (fileInput.files.length > 0) {
            fileName.innerText = `Image${i + 1}`;
            let imageUrl = URL.createObjectURL(fileInput.files[0]);
            fileImage.src = imageUrl;
            fileImage.classList.remove('hidden');
            addBtn.classList.add('hidden');
            removeBtn.classList.remove('hidden');
        } else {
            addBtn.classList.remove('hidden');
            removeBtn.classList.add('hidden');
            fileName.innerText = 'Sube o arrastra una imagen';
            fileImage.src = '';
        }
    })

    removeBtn.addEventListener('click', function () {
        addBtn.classList.remove('hidden');
        removeBtn.classList.add('hidden');
        fileInput.value = '';
        fileName.innerText = 'Sube o arrastra una imagen';
        fileImage.src = '';
        console.log(fileInput.value)
    })
})

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
        console.log(newProduct);

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
