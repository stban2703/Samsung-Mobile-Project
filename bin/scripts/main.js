const headerButton = document.querySelectorAll('.header__button');
const dropDownList = document.querySelector('.dropDownList');
const loaderContainer = document.querySelector('.lds-container');

document.addEventListener('click', function(event) {
    let isClickInside = headerButton[0].contains(event.target);
  
    if (!isClickInside) {
        dropDownList.classList.add('hidden');
    } else {
        dropDownList.classList.remove('hidden');
    }
  });