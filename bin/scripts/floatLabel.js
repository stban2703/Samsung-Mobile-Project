// Float label
const inputLabel = document.querySelector(".input__label");
const inputField = document.querySelector(".input__field");

inputField.addEventListener('change', function () {
  if(inputField.value.length > 0) {
    inputLabel.classList.add("input__label--focus");
  } else {
    inputLabel.classList.remove("input__label--focus");
  }
});