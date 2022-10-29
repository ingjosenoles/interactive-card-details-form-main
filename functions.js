// CARDHOLDER NAME

let cardName = document.querySelector(".card-details__name");
let inputName = document.querySelector("#cardholder");
let errorName = document.querySelector(".form__cardholder--error");

// CARDHOLDER NUMBER

let cardNumber = document.querySelector(".card__number");
let inputNumber = document.querySelector("#cardNumber");
let errorNumber = document.querySelector(".form__cardnumber--error");

//MM

let cardMonth = document.querySelector(".card__month");
let inputMonth = document.querySelector("#cardMonth");
let errorMonth = document.querySelector(".form__input-mm--error");

//YY

let cardYear = document.querySelector(".card__year");
let inputYear = document.querySelector("#cardYear");
let errorYear = document.querySelector(".form__input-yy--error");

//CVC
let cardCvc = document.querySelector(".card-back__cvc");
let inputCvc = document.querySelector("#cardCvc");
let errorCvc = document.querySelector(".form__input-cvc--error");

//DYNAMIC NAME INPUT

inputName.addEventListener("input", (event) => {
  event.preventDefault;
  let regExp = /[0-9]/g;
  if (regExp.test(inputName.value)) {
    showError(inputName, errorName, "Wrong Format, Letters Only.");
  } else {
    showError(inputName, errorName, "", false);
  }

  if (inputName.value === "") {
    cardName.innerText = "JANE APPLESEED";
  } else {
    cardName.innerText = inputName.value;
  }
});

// DYNAMIC NUMBER INPUT

inputNumber.addEventListener("input", (event) => {
  let inputValue = event.target.value;

  cardNumber.innerText = inputNumber.value;

  let regExp = /[A-z]/g;
  if (regExp.test(inputNumber.value)) {
    showError(inputNumber, errorNumber, "Wrong Format, Numbers Only.");
  } else {
    inputNumber.value = inputValue
      .replace(/\s/g, "")
      .replace(/([0-9]{4})/g, "$1 ")
      .trim();
    showError(inputNumber, errorNumber, "", false);
  }
  if (inputNumber.value === "") {
    cardNumber.innerText = "0000 0000 0000 0000";
  }
});

//DYNAMIC MONTH INPUT

inputMonth.addEventListener("input", (event) => {
  event.preventDefault;
  cardMonth.innerText = inputMonth.value;
  lettersValidate(inputMonth, errorMonth);

  completeCard(inputMonth, cardMonth);

  if (inputMonth.value === "") {
    cardMonth.innerText = "00";
  }
});

//DYNAMIC YEAR INPUT

inputYear.addEventListener("input", (event) => {
  event.preventDefault;
  cardYear.innerText = inputYear.value;
  lettersValidate(inputYear, errorYear);

  completeCard(inputYear, cardYear);

  if (inputYear.value === "") {
    cardYear.innerText = "00";
  }
});

//DYNAMIC CVC INPUT
inputCvc.addEventListener("input", (event) => {
  event.preventDefault;
  cardCvc.innerText = inputCvc.value;
  lettersValidate(inputCvc, errorCvc);

  if (inputCvc.value === "") {
    cardCvc.innerText = "000";
  }
});

//CONFIRM BUTTON

let btnConfirm = document.querySelector(".form__submit");

let validationName = false;
let validationNumber = false;
let validationMonth = false;
let validationYear = false;
let validationCvc = false;

//CONTINUE BUTTON
let btnContinue = document.querySelector(".thanks__button");

btnContinue.addEventListener("click", (event) => {
  event.preventDefault();

  if (
    sectionForm.style.display === "none" &&
    sectionThanks.style.display === "block"
  ) {
    sectionForm.style.display = "block";
    sectionThanks.style.display = "none";
    inputName.value = "";
    cardName.innerText = "JANE APPLESEED";
    inputNumber.value = "";
    cardNumber.innerText = "0000 0000 0000 0000";
    inputMonth.value = "";
    cardMonth.innerText = "00";
    inputYear.value = "";
    cardYear.innerText = "00";
    inputCvc.value = "";
    cardCvc.innerText = "000";
  }
});

//FORM AND THANKS SECTIONS
let sectionForm = document.querySelector(".form");
let sectionThanks = document.querySelector(".thanks");

btnConfirm.addEventListener("click", (event) => {
  event.preventDefault();

  //NAME VALIDATION
  if (verifyIsFilled(inputName, errorName)) {
    validationName = true;
  } else {
    validationName = false;
  }
  //NUMBER VALIDATION
  if (verifyIsFilled(inputNumber, errorNumber) === true) {
    if (inputNumber.value.length === 19) {
      showError(inputNumber, errorNumber, "", false);
      validationNumber = true;
    } else {
      showError(inputNumber, errorNumber, "Wrong Number");
      validationNumber = false;
    }
  }

  //MONTH VALIDATION
  if (verifyIsFilled(inputMonth, errorMonth)) {
    if (parseInt(inputMonth.value) > 0 && parseInt(inputMonth.value) <= 12) {
      showError(inputMonth, errorMonth, "", false);
      validationMonth = true;
    } else {
      showError(inputMonth, errorMonth, "Wrong Month");
      validationMonth = false;
    }
  }

  //YEAR VALIDATION
  if (verifyIsFilled(inputYear, errorYear)) {
    if (parseInt(inputYear.value) > 22 && parseInt(inputYear.value) <= 28) {
      showError(inputYear, errorYear, "", false);
      validationYear = true;
    } else {
      showError(inputYear, errorYear, "Wrong Year");
      validationYear = false;
    }
  }
  //CVC VALIDATION
  if (verifyIsFilled(inputCvc, errorCvc)) {
    if (inputCvc.value.length === 3) {
      showError(inputCvc, errorCvc, "", false);
      validationCvc = true;
    } else {
      showError(inputCvc, errorCvc, "Wrong CvC");
      validationCvc = false;
    }
  }

  if (
    validationName === true &&
    validationNumber === true &&
    validationMonth === true &&
    validationYear === true &&
    validationCvc === true
  ) {
    sectionForm.style.display = "none";
    sectionThanks.style.display = "block";
  }
});

//FUNCTIONS

function showError(input, error, msgError, show = true) {
  if (show) {
    error.innerText = msgError;
    input.style.borderColor = "#ff0000";
  } else {
    error.innerText = msgError;
    input.style.borderColor = "hsl(279, 6%, 55%)";
  }
}

function verifyIsFilled(input, error) {
  if (input.value.length > 0) {
    showError(input, error, "", false);
    return true;
  } else {
    showError(input, error, "Can't be blank");
    return false;
  }
}

function lettersValidate(input, error) {
  //CHECKING FOR LETTERS

  let regExp = /[A-z]/g;
  if (regExp.test(input.value)) {
    showError(input, error, "Wrong Format, Numbers Only.");
  } else {
    showError(input, error, "", false);
  }
}

function completeCard(input, card) {
  if (input.value <= 9) {
    card.innerText = "0" + input.value;
  }
}
