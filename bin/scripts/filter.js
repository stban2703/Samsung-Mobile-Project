function filterProducts(list, type, storage) {

    let keys = ['class', 'type'];
    let values = [];

    if(type != null) {
        values.push(type);
    }

    if(storage != null) {
        values.push(storage);
    }

    console.log(keys)
    console.log(values)

    let filtered = list.filter(function (e) {
        return keys.every(function (a) {
            return values.includes(e[a])
        })
    })

    return filtered;
}