'use strict';

const form = document.querySelector('.order-form');

const deliveryBox = document.querySelector('#delivery-box');

const cityBox = document.querySelector('#city-box');
const addressBox = document.querySelector('#address-box');
const nnpBox = document.querySelector('#nnp-box');

const userName = document.querySelector('#user-name');
const userTel = document.querySelector('#user-tel');
const userEmail = document.querySelector('#user-email');
const userCity = document.querySelector('#user-city');
const userAddress = document.querySelector('#user-address');
const userNnp = document.querySelector('#user-nnp');

const userNameErr = document.querySelector('#user-name-err');
const userTelErr = document.querySelector('#user-tel-err');
const userEmailErr = document.querySelector('#user-email-err');
const userCityErr = document.querySelector('#user-city-err');
const userAddressErr = document.querySelector('#user-address-err');
const userNnpErr = document.querySelector('#user-nnp-err');

// функции для изменения стилей при ошибке валидации
const setErrStyle = (inputEl, errTextEl) => {
  inputEl.classList.add('text-field__input--err');
  errTextEl.classList.remove('text-field__err--disable');
};

const setUnErrStyle = (inputEl, errTextEl) => {
  inputEl.classList.remove('text-field__input--err');
  errTextEl.classList.add('text-field__err--disable');
};

// блок очищения стилей
userName.addEventListener('input', () => {
  setUnErrStyle(userName, userNameErr);
});

userTel.addEventListener('input', () => {
  setUnErrStyle(userTel, userTelErr);
});

userEmail.addEventListener('input', () => {
  setUnErrStyle(userEmail, userEmailErr);
});

userCity.addEventListener('input', () => {
  setUnErrStyle(userCity, userCityErr);
});

userAddress.addEventListener('input', () => {
  setUnErrStyle(userAddress, userAddressErr);
});

userNnp.addEventListener('input', () => {
  setUnErrStyle(userNnp, userNnpErr);
});

// блок отображения полей в зависимости от способа доставки
deliveryBox.addEventListener('change', () => {
  const deliveryType = form.elements.delivery.value;

  cityBox.classList.toggle(
    'text-field--disabled',
    deliveryType !== 'courier-np' && deliveryType !== 'np'
  );

  addressBox.classList.toggle(
    'text-field--disabled',
    deliveryType !== 'courier-np' && deliveryType !== 'courier'
  );

  nnpBox.classList.toggle('text-field--disabled', deliveryType !== 'np');
});

// маска для ввода телефонного номера
userTel.addEventListener('focus', () => {
  const maskOptions = {
    mask: '+38(000)000-00-00',
    lazy: false,
  };
  const mask = new IMask(userTel, maskOptions);
});

form.addEventListener('submit', (event) => {
  let allIsValid = true;
  const deliveryType = form.elements.delivery.value;

  // блок валидации формы;
  if (!/^[A-Za-z0-9_А-Яа-я]+$/.test(userName.value)) {
    allIsValid = false;
    setErrStyle(userName, userNameErr);
  }

  if (!/\+\d{2}\(\d{3}\)\d{3}\-\d{2}\-\d{2}/.test(userTel.value)) {
    allIsValid = false;
    setErrStyle(userTel, userTelErr);
  }

  if (!/^[^\s@]+@[^\s@]+$/.test(userEmail.value)) {
    allIsValid = false;
    setErrStyle(userEmail, userEmailErr);
  }

  switch (deliveryType) {
    case 'courier':
      if (userAddress.value.length === 0) {
        allIsValid = false;
        setErrStyle(userAddress, userAddressErr);
      };
      break;

    case 'courier-np':
      if (!/^[A-Za-zА-Яа-я]+$/.test(userCity.value)) {
        allIsValid = false;
        setErrStyle(userCity, userCityErr);
      };

      if (userAddress.value.length === 0) {
        allIsValid = false;
        setErrStyle(userAddress, userAddressErr);
      };
      break;

    case 'np':
      if (!/^[A-Za-zА-Яа-я]+$/.test(userCity.value)) {
        allIsValid = false;
        setErrStyle(userCity, userCityErr);
      };

      if (!/^\d+$/.test(userNnp.value)) {
        allIsValid = false;
        setErrStyle(userNnp, userNnpErr);
      };
      break;
  }

  if (allIsValid) {
    alert('Данные отправлены');
  }

  event.preventDefault();
});
