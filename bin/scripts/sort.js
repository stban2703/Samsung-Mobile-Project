function sortDefault(a, b) {
    if (a.title > b.title) {
        return 1;
    }
    if (a.title < b.title) {
        return -1;
    }
    return 0;
}

function sortByLowerPrice(a, b) {
    return a.price - b.price;
}

function sortByHigherPrice(a, b) {
    return b.price - a.price;
}

function sortByBetterRate(a, b) {
    return b.rate - a.rate;
}

function sortByLowerRate(a, b) {
    return a.rate - b.rate;
}
