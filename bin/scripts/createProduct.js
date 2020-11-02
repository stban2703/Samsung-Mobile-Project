const createForm = document.querySelector('.form');
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
