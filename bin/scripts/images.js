function getImages(id) {
    let urlList = [];
    productImageRef.child(id).listAll().then(function (res) {
        res.items.forEach(function (itemRef) {
            // All the items under listRef.
            itemRef.getDownloadURL().then(function (url) {
                urlList.push(url);
            }).catch(function (error) {
                console.log(error);
            });
        });

    }).catch(function (error) {
        // Uh-oh, an error occurred!
        console.log(error);
    });

    return urlList;
}

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

function setFileImage(ref, list) {
    const fileList = ref.querySelectorAll('.customFileInput__file');
    fileList.forEach(function(e, i) {
        e.value = list[i];
        console.log(e.value)
    });
}
