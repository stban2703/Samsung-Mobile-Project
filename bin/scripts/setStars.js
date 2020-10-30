function setStars(obj, ref) {
    const ratingStar = ref.querySelectorAll('.rating__star');
    for (let i = 0; i < obj.rate; i++) {
        ratingStar[i].src = './src/icons/starfilled.svg';
    }
}
