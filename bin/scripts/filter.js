function filterProduct(object, type, storage, camera) {
    let keys = [];

    if(type != null) {
        keys.push(type);
    }

    if(storage != null) {
        keys.push(storage);
    }

    if(camera != null) {
        keys.push(camera);
    }

}