function loadStars(obj, ref) {
    const ratingStar = ref.querySelectorAll('.rating__star');
    for (let i = 0; i < obj.rate; i++) {
        ratingStar[i].src = './src/icons/starfilled.svg';
        ratingStar[i].classList.add('rating__star--filled');
    }
}

function setStars(ref) {
    const ratingStar = ref.querySelectorAll('.rating__star');
    ratingStar.forEach(function (elem, index) {

        elem.addEventListener('click', function () {

            for (let i = 0; i < ratingStar.length; i++) {
                if (i <= index) {
                    ratingStar[i].src = './src/icons/starfilled.svg';
                    ratingStar[i].classList.add('rating__star--filled');
                } else {
                    ratingStar[i].src = './src/icons/starempty.svg';
                    ratingStar[i].classList.remove('rating__star--filled');
                }
            }

        });
    });
}