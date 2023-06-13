const authBtn = document.querySelector('#authButton');
const emailInput = document.querySelector('#inputEmailAuth');
const passwordInput = document.querySelector('#inputPasswordAuth');
const formInput = document.querySelector('#formAuth');
const messageUI = document.querySelector('.modal-body__message');
const blueBoxShadow = '0 0 0 0.25rem rgba(13, 110, 253, 0.25)';
const greenBoxShadow = '0 0 0 0.25rem rgba(63,235,24, 0.5)';
const redBoxShadow = '0 0 0 0.25rem rgba(235,46,49, 0.5)';
const adminLoginSection = document.querySelector('.admin-login');
const adminPanelSection = document.querySelector('.admin-panel');
const modalElement = document.getElementById('exampleModal');
const modal = new bootstrap.Modal(modalElement);

//correct data admin
const adminLogin = {
  password: 'admin123',
  email: 'admin@admin.com',
};

//input trim (password)
const inputTrim = inputDate => {
  return inputDate.value.trim();
};
//email in lowerCase end trim
const emailLowerTrim = emailInput => {
  return emailInput.value.trim().toLowerCase();
};
//Проверка емеил на правильность написания
const emailRegexp =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

//email validated
const validateEmail = () => {
  const checkEmail = value => {
    return emailRegexp.test(value);
  };
  const updateInputEmail = () => {
    clearTimeout(timerValidateEmail);
    const emailCorrect = emailLowerTrim(emailInput);
    if (checkEmail(emailCorrect)) emailInput.style.boxShadow = greenBoxShadow;
    else emailInput.style.boxShadow = redBoxShadow;
  };
  const timerValidateEmail = setTimeout(updateInputEmail, 500);
};

//Password validate
const validatePassword = function () {
  const updatePassword = () => {
    clearTimeout(timerValidatePassword);
    const inputCorrect = inputTrim(this);
    if (inputCorrect !== '') this.style.boxShadow = greenBoxShadow;
    else this.style.boxShadow = redBoxShadow;
  };
  const timerValidatePassword = setTimeout(updatePassword, 500);
};

//Password unvalidated
const unValidatePassword = () => {
  const failedСheckTexterea = () => {
    clearTimeout(timerValidatePassword);
    passwordInput.style.boxShadow = redBoxShadow;
  };
  const timerValidatePassword = setTimeout(failedСheckTexterea, 500);
};

//blur emailInput
emailInput.addEventListener('blur', validateEmail);
//focus emailInput
emailInput.addEventListener('focus', () => {
  emailInput.style.boxShadow = blueBoxShadow;
});

//focus passwordInput
passwordInput.addEventListener('focus', () => {
  passwordInput.style.boxShadow = blueBoxShadow;
});
passwordInput.addEventListener('blur', validatePassword);

//Modal window message
const visibleNessageUI = message => {
  new bootstrap.Modal(document.getElementById('exampleModal')).show();

  modalElement.addEventListener('hide.bs.modal', function () {
    if (message === 'Hello admin') {
      adminLoginSection.classList.add('d-none');
      adminPanelSection.classList.remove('d-none');
    }
  });
  if (message === 'Hello admin') {
    messageUI.textContent = '' + message;
  }
  if (message instanceof TypeError && message.message === 'Failed to fetch') {
    messageUI.textContent =
      'Sorry, the server is not responding. We are working on it. Try again later.';
  }
  if (message === 'Incorrect data entered') {
    messageUI.textContent = 'Incorrect data entered';
  }
};

//reset value form and boxShadow
const resetValueForm = () => {
  formInput.reset();
  emailInput.style.boxShadow = 'none';
  passwordInput.style.boxShadow = 'none';
};
//form submit
formInput.addEventListener('submit', function (e) {
  e.preventDefault();
  const email = emailLowerTrim(emailInput);
  const password = inputTrim(passwordInput);

  //Перевірка на ввід усіх данних форми
  if (email === '' || password === '') {
    if (email === '') validateEmail();
    if (password === '') unValidatePassword();
    return;
  }
  // //Об'єкт для відправлення Сервер через ПОСТ
  const formData = {
    email,
    password,
  };

  getAdminToken(formData);
});

function getAdminToken(formData) {
  const url = 'http://91.196.52.61:8080/api_v1/Security/Login';
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;utc-8' },
    body: JSON.stringify(formData),
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        if (res.status === 400) {
          visibleNessageUI('Incorrect data entered');
          return null;
        }
      }
    })
    .then(res => {
      if (res) {
        resetValueForm();
        visibleNessageUI('Hello admin');
        setTokenLocalStorage(res.code);
      }

      return res;
    })
    .catch(err => {
      console.error(err);
      visibleNessageUI(err);
    });
}

const setTokenLocalStorage = code => {
  // const token = {
  //   accessToken: `\"${code}`,
  // };
  const token = {
    accessToken: `${code}`,
  };
  localStorage.setItem('accessToken', JSON.stringify(token));
};

//Запуск Логін с введенными правильными данными
// getAdminToken(adminLogin);

// localStorage.setItem('accessToken', JSON.stringify('jb213knkjdnkjn1243nkjfnd'));
