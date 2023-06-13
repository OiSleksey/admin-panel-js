const accordionBox = document.querySelector('.create-accordion__item');
const messageUI = document.querySelector('.modal-body__message');
const modalElement = document.getElementById('exampleModal');
const inputName = document.querySelector('#updateName');
const inputEmail = document.querySelector('#updateEmail');
const inputPhone = document.querySelector('#updatePhone');
const inputHomePhone = document.querySelector('#updateHomePhone');
const inputBirthDay = document.querySelector('#updateBirthDay');
const inputHireDay = document.querySelector('#updateHireDate');
const checkedManager = document.querySelector('#checkedUpdateManager');
const checkedAdmin = document.querySelector('#checkedUpdateAdmin');
const submitNewUser = document.querySelector('#submitUpdateUser');
const formUpdateUser = document.querySelector('#formUpdateUser');

const blueBoxShadow = '0 0 0 0.25rem rgba(13, 110, 253, 0.25)';
const greenBoxShadow = '0 0 0 0.25rem rgba(63,235,24, 0.5)';
const redBoxShadow = '0 0 0 0.25rem rgba(235,46,49, 0.5)';

let activeBtnId = null;
let currentId = null;
let isValidate = false;

const correctData = value => {
  const dateArr = value.split('.');
  const day = dateArr[0];
  const month = dateArr[1];
  const year = dateArr[2].padStart(4, '0');
  const correctDate = `${year}-${month}-${day}`;
  return correctDate;
};

const setValueForm = data => {
  inputName.value = data.name;
  inputEmail.value = data.email;
  inputPhone.value = data.phone;
  inputHomePhone.value = data.homePhone;
  inputBirthDay.value = correctData(data.dayOfBirth);
  inputHireDay.value = correctData(data.hireDate);
  if (data.role === '1') {
    checkedAdmin.checked = true;
  } else {
    checkedManager.checked = true;
  }
};

const getInfoAboutUser = btn => {
  const trFocus = btn.closest('tr');
  const name = trFocus.getElementsByTagName('td')[2].textContent;
  const email = trFocus.getElementsByTagName('td')[4].textContent;
  const phone = trFocus.getElementsByTagName('td')[5].textContent;
  const homePhone = trFocus.getElementsByTagName('td')[6].textContent;
  const dayOfBirth = trFocus.getElementsByTagName('td')[7].textContent;
  const hireDate = trFocus.getElementsByTagName('td')[11].textContent;
  const roleId = trFocus.getElementsByTagName('td')[12].textContent;
  currentId = btn.dataset.userId;
  const dataFocusUser = {
    name,
    email,
    phone,
    homePhone,
    dayOfBirth,
    roleId,
    hireDate,
  };
  setValueForm(dataFocusUser);
};

const activeUpdateBtn = btn => {
  const stateAccordion = btn.getAttribute('aria-expanded');
  if (stateAccordion === 'true') {
    getInfoAboutUser(btn);
    btn.classList.remove('btn-dark');
    btn.classList.add('btn-warning');
    return;
  }
  btn.classList.remove('btn-warning');
  btn.classList.add('btn-dark');
};

const onUpdateBtn = e => {
  const clickBtn = e.target;
  const clickBtnId = parseInt(clickBtn.dataset.userId);
  if (activeBtnId === null) {
    activeBtnId = clickBtnId;
    activeUpdateBtn(clickBtn);
    return;
  }
  if (activeBtnId === clickBtnId) {
    activeBtnId = clickBtnId;
    activeUpdateBtn(clickBtn);
    return;
  }

  if (activeBtnId !== clickBtnId) {
    if (clickBtn.getAttribute('aria-expanded') === 'true') {
      activeUpdateBtn(clickBtn);
      activeBtnId = clickBtnId;
      return;
    }
    document.querySelectorAll('.btn-update').forEach(btn => {
      if (parseInt(btn.dataset.userId) === activeBtnId) {
        activeUpdateBtn(btn);
      }
    });
    activeBtnId = clickBtnId;
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    setTimeout(() => clickBtn.dispatchEvent(event), 500);
  }
};

export function createUpdateListener() {
  const updateBtn = document.querySelectorAll('.btn-update');
  updateBtn.forEach(btn =>
    btn.addEventListener('click', function (e) {
      console.log(`click btn-id=${e.target.dataset.userId}`);
      onUpdateBtn(e);
    })
  );
}

//input trim
const inputTrim = inputDate => {
  return inputDate.value.trim();
};
//email in lowerCase end trim
const emailLowerTrim = emailInput => {
  return emailInput.value.trim().toLowerCase();
};
//Checking emails for correct spelling
const emailRegexp =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

//email validated
const validateEmail = () => {
  const checkEmail = value => {
    return emailRegexp.test(value);
  };
  const updateInputEmail = () => {
    clearTimeout(timerValidateEmail);
    const emailCorrect = emailLowerTrim(inputEmail);
    if (!isValidate) {
      if (checkEmail(emailCorrect))
        return (inputEmail.style.boxShadow = greenBoxShadow);
      inputEmail.style.boxShadow = redBoxShadow;
    }
  };
  const timerValidateEmail = setTimeout(updateInputEmail, 500);
};

//all validate exept email
const validateInput = function () {
  const updatePassword = () => {
    clearTimeout(timerValidateInput);
    const inputCorrect = inputTrim(this);
    if (!isValidate) {
      if (inputCorrect !== '') return (this.style.boxShadow = greenBoxShadow);
      this.style.boxShadow = redBoxShadow;
    }
  };
  const timerValidateInput = setTimeout(updatePassword, 500);
};

// all unvalidated exept email
const unValidateInput = inputData => {
  const failedСheckTexterea = () => {
    clearTimeout(timerValidateInput);
    inputData.style.boxShadow = redBoxShadow;
  };
  const timerValidateInput = setTimeout(failedСheckTexterea, 500);
};

//blur emailInput
inputEmail.addEventListener('blur', validateEmail);
//focus emailInput
inputEmail.addEventListener('focus', () => {
  inputEmail.style.boxShadow = blueBoxShadow;
});

//focus nameInput
inputName.addEventListener('focus', () => {
  inputName.style.boxShadow = blueBoxShadow;
});
inputName.addEventListener('blur', validateInput);

//focus nameInput
inputPhone.addEventListener('focus', () => {
  inputPhone.style.boxShadow = blueBoxShadow;
});
inputPhone.addEventListener('blur', validateInput);
//focus nameInput

inputHomePhone.addEventListener('focus', () => {
  inputHomePhone.style.boxShadow = blueBoxShadow;
});
inputHomePhone.addEventListener('blur', validateInput);

inputBirthDay.addEventListener('focus', () => {
  inputBirthDay.style.boxShadow = blueBoxShadow;
});
inputBirthDay.addEventListener('blur', validateInput);

inputHireDay.addEventListener('focus', () => {
  inputHireDay.style.boxShadow = blueBoxShadow;
});
inputBirthDay.addEventListener('blur', validateInput);

const visibleMessageUI = message => {
  new bootstrap.Modal(document.getElementById('exampleModal')).show();
  messageUI.textContent = '' + message;
};

modalElement.addEventListener('hide.bs.modal', function () {
  isValidate = !isValidate;
});

//reset value form and boxShadow
const resetValueForm = () => {
  isValidate = true;
  formUpdateUser.reset();
  inputName.style.boxShadow = 'none';
  inputEmail.style.boxShadow = 'none';
  inputPhone.style.boxShadow = 'none';
  inputHomePhone.style.boxShadow = 'none';
  inputBirthDay.style.boxShadow = 'none';
  inputHireDay.style.boxShadow = 'none';
};

formUpdateUser.addEventListener('submit', function (e) {
  e.preventDefault();
  const email = emailLowerTrim(inputEmail);
  const name = inputTrim(inputName);
  const phone = inputTrim(inputPhone);
  const homePhone = inputTrim(inputHomePhone);
  const manager = checkedManager.checked;
  const admin = checkedManager.checked;
  let roleId = null;
  if (manager) roleId = 1;
  if (admin) roleId = 2;
  //Перевірка на ввід усіх данних форми
  if (
    email === '' ||
    name === '' ||
    phone === '' ||
    homePhone === '' ||
    inputBirthDay.value === '' ||
    inputHireDay.value === ''
  ) {
    if (email === '') validateEmail();
    if (name === '') unValidateInput(inputName);
    if (phone === '') unValidateInput(inputPhone);
    if (homePhone === '') unValidateInput(inputHomePhone);
    if (inputBirthDay.value === '') unValidateInput(inputBirthDay);
    if (inputHireDay.value === '') unValidateInput(inputHireDay);
    return;
  }
  // //Об'єкт для відправлення на Сервер через ПОСТ
  const dateOfBirthValue = new Date(inputBirthDay.value);
  const hireDateValue = new Date(inputHireDay.value);
  const dateOfBirth = dateOfBirthValue.toISOString();
  const hireDate = hireDateValue.toISOString();
  const formData = {
    id: currentId,
    email,
    name,
    phone,
    homePhone,
    roleId,
    hireDate,
    dateOfBirth,
    departmentId: 0,
    driverCategory: 'string',
  };
  const getData = JSON.parse(localStorage.getItem('accessToken'));
  const accessToken = getData.accessToken;
  updateUser(formData, accessToken);
});

const falseClickActiveBtn = () => {
  const updateBtn = document.querySelectorAll('.btn-update');
  const event = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window,
  });
  updateBtn.forEach(btn => {
    if (btn.classList.contains('btn-warning')) {
      btn.dispatchEvent(event);
    }
  });
};

function updateUser(formData, code) {
  const url = 'http://91.196.52.61:8080/api_v1/Admin/Update';
  const authorizationCode = `Bearer ${code}`;
  return fetch(url, {
    method: 'PUT',
    headers: {
      accept: '*/*',
      Authorization: authorizationCode,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        visibleMessageUI(res.status);
      }
    })
    .then(res => {
      console.log(res);
      if (res.message === 'Ok') {
        resetValueForm();
        falseClickActiveBtn();
        visibleMessageUI(`Update user`);
      }
      return res;
    })
    .catch(err => {
      console.error(err);
      visibleMessageUI(err);
    });
}
