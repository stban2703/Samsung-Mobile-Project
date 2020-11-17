// Float label
const inputLabel = document.querySelectorAll(".input__label");
const inputField = document.querySelectorAll(".input__field");


inputField.forEach(function (elem, i) {
  elem.addEventListener('input', function () {
    if (elem.value.length > 0) {
      inputLabel[i].classList.add("input__label--focus");
    } else {
      inputLabel[i].classList.remove("input__label--focus");
    }
  });

  elem.addEventListener('change', function () {
    if (elem.value.length > 0) {
      inputLabel[i].classList.add("input__label--focus");
    } else {
      inputLabel[i].classList.remove("input__label--focus");
    }
  });
});
