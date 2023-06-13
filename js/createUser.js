const accordionBox = document.querySelector('.create-accordion__item');
const messageUI = document.querySelector('.modal-body__message');
const openForm = document.querySelector('#createUser');
const inputName = document.querySelector('#inputName');
const inputEmail = document.querySelector('#inputEmail');
const inputPhone = document.querySelector('#inputPhone');
const inputHomePhone = document.querySelector('#inputHomePhone');
const inputBirthDay = document.querySelector('#inputBirthDay');
const checkedManager = document.querySelector('#checkedManager');
const checkedAdmin = document.querySelector('#checkedAdmin');
const submitNewUser = document.querySelector('#submitNewUser');
const formNewUser = document.querySelector('#formCreateUser');

const blueBoxShadow = '0 0 0 0.25rem rgba(13, 110, 253, 0.25)';
const greenBoxShadow = '0 0 0 0.25rem rgba(63,235,24, 0.5)';
const redBoxShadow = '0 0 0 0.25rem rgba(235,46,49, 0.5)';

openForm.addEventListener('click', e => {
  const stateAccordion = e.target.getAttribute('aria-expanded');
  console.log(e.target);
  console.log(typeof stateAccordion);
  if (stateAccordion === 'true') {
    e.target.classList.remove('btn-dark');
    e.target.classList.add('btn-warning');
    accordionBox.classList.add('border-primary');
    return;
  }
  accordionBox.classList.remove('border-primary');
  e.target.classList.remove('btn-warning');
  e.target.classList.add('btn-dark');
});

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
    if (checkEmail(emailCorrect)) inputEmail.style.boxShadow = greenBoxShadow;
    else inputEmail.style.boxShadow = redBoxShadow;
  };
  const timerValidateEmail = setTimeout(updateInputEmail, 500);
};

//all validate exept email
const validateInput = function () {
  const updatePassword = () => {
    clearTimeout(timerValidateInput);
    const inputCorrect = inputTrim(this);
    if (inputCorrect !== '') this.style.boxShadow = greenBoxShadow;
    else this.style.boxShadow = redBoxShadow;
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

const visibleMessageUI = message => {
  new bootstrap.Modal(document.getElementById('exampleModal')).show();
  messageUI.textContent = '' + message;
  //   if (message === 'Hello admin') {
  //     modalElement.addEventListener('hide.bs.modal', function () {
  //       adminLoginSection.classList.add('d-none');
  //       adminPanelSection.classList.remove('d-none');
  //     });
  //   }
};

//reset value form and boxShadow
const resetValueForm = () => {
  formNewUser.reset();
  inputName.style.boxShadow = 'none';
  inputEmail.style.boxShadow = 'none';
  inputPhone.style.boxShadow = 'none';
  inputHomePhone.style.boxShadow = 'none';
  inputBirthDay.style.boxShadow = 'none';
};
//form submit
formNewUser.addEventListener('submit', function (e) {
  e.preventDefault();
  const email = emailLowerTrim(inputEmail);
  const name = inputTrim(inputName);
  const phone = inputTrim(inputPhone);
  const homePhone = inputTrim(inputHomePhone);
  //   checkedManager
  //   checkedAdmin

  //Перевірка на ввід усіх данних форми
  if (
    email === '' ||
    name === '' ||
    phone === '' ||
    homePhone === '' ||
    inputBirthDay.value === ''
  ) {
    if (email === '') validateEmail();
    if (name === '') unValidateInput(inputName);
    if (phone === '') unValidateInput(inputPhone);
    if (homePhone === '') unValidateInput(inputHomePhone);
    if (inputBirthDay.value === '') unValidateInput(inputBirthDay);
    return;
  }
  let roleId = null;
  if (checkedAdmin.checked) roleId = 1;
  if (checkedManager.checked) roleId = 2;
  // //Об'єкт для відправлення на Сервер через ПОСТ
  const currentDate = new Date();
  const hireDate = currentDate.toISOString();
  const birthDay = new Date(inputBirthDay.value);
  const dateOfBirth = birthDay.toISOString();

  const formData = {
    email,
    name,
    phone,
    homePhone,
    roleId,
    hireDate,
    dateOfBirth,
    driverCategory: 'string',
  };
  const getData = JSON.parse(localStorage.getItem('accessToken'));
  const accessToken = getData.accessToken;
  createNewUser(formData, accessToken);
});

const createNewUser = (formData, code) => {
  const url = 'http://91.196.52.61:8080/api_v1/Admin/Create';
  const authorizationCode = `Bearer ${code}`;
  return fetch(url, {
    method: 'POST',
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
        throw new Error('error');
      }
    })

    .then(res => {
      resetValueForm();
      console.log(res);
      visibleMessageUI(`${res.message} new user`);
      // console.log(res.code);
      // setTokenLocalStorage(res.code);
      return res;
    })
    .catch(err => {
      console.error(err);
      visibleMessageUI(err);
    });
};
//   // getAdminToken(adminLogin);

//   const setTokenLocalStorage = code => {
//     // const token = {
//     //   accessToken: `\"${code}`,
//     // };
//     const token = {
//       accessToken: `${code}`,
//     };
//     localStorage.setItem('accessToken', JSON.stringify(token));
//   };

// {
//   "name": "First-person",
//   "email": "user2@example.com",
//   "phone": "+38096454322",
//   "homePhone": "209",
//   "hireDate": "2023-05-28T10:03:49.901Z",
//   "dateOfBirth": "2023-05-28T10:03:49.901Z",
//   "roleId": 2, //Only 2
//   "driverCategory": "string" //hz
// }

//post required
// curl -X 'POST' \
//   'http://91.196.52.61:8080/api_v1/Admin/Create' \
//   -H 'accept: */*' \
//   -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBZG1pbiBhZG1pTiIsImlzcyI6IlNpbXBsZSIsImF1ZCI6IlNpbXBsZSIsImlhdCI6MTY4NTI4MDA2OSwiZXhwIjoxNjg1MzA1MjY5LCJtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6ImFkbWluIn0.uS4Ay9UkED6fS-kXi4QArJqgUe2of8P3yaXHUPpSoTE' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "name": "Third-person",
//   "email": "user4@example.com",
//   "phone": "+38096454322",
//   "homePhone": "209",
//   "hireDate": "2023-05-28T10:03:49.901Z",
//   "dateOfBirth": "2023-05-28T10:03:49.901Z",
//   "roleId": 1,
//   "driverCategory": "text"
// }'

//response
// {
//   "message": "Created"
// }

// access-control-allow-origin: *
// content-type: application/json; charset=utf-8
// date: Sun,28 May 2023 10:25:15 GMT
// server: Kestrel
// transfer-encoding: chunked
