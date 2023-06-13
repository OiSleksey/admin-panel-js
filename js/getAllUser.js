// import axios from 'axios';
import { displayDataUsers, updateDataUsers } from './displayUsers.js';
const adminLoginSection = document.querySelector('.admin-login');
const adminPanelSection = document.querySelector('.admin-panel');
const allUsersBtn = document.querySelector('#allUsers');
const updateDataBtn = document.querySelector('#updateData');
const loadingSection = document.querySelector('.loading');
const loadingMessage = document.querySelector('.loading__message');
const loadingBox = document.querySelector('.loading__box');
const messageUI = document.querySelector('.modal-body__message');
let isFirstGet = false;
// const adminLogin = {
//   password: 'admin123',
//   email: 'admin@admin.com',
// };

console.log(axios.isCancel('something'));

const viibleLoading = () => {
  loadingSection.classList.remove('d-none');
};

const hiddenLoading = () => {
  loadingSection.classList.add('d-none');
};

const showLogin = bool => {
  hiddenLoading();
  if (bool) {
    adminLoginSection.classList.remove('d-none');
    adminPanelSection.classList.add('d-none');
    return;
  }
  adminLoginSection.classList.add('d-none');
  adminPanelSection.classList.remove('d-none');
};

//Modal window message
const visibleNessageUI = message => {
  //   if (message === 'Hello admin') {
  //     modalElement.addEventListener('hide.bs.modal', function () {
  //       adminLoginSection.classList.add('d-none');
  //       adminPanelSection.classList.remove('d-none');
  //       messageUI.textContent = '' + message;
  //     });
  //   }
  if (message instanceof TypeError && message.message === 'Failed to fetch') {
    // new bootstrap.Modal(document.getElementById('exampleModal')).show();
    hiddenLoading();
    //   showLogin(true)
    // messageUI.textContent =
    //   'Sorry, the server is not responding. We are working on it. Try again later.';
    // return;
  }
};

export async function getAllDataUsers() {
  const allUsers = await getTokenLocalStorage();
  return allUsers;
}
async function onAllUsersBtn() {
  if (!isFirstGet) {
    const allUsers = await getAllDataUsers();
    displayDataUsers(allUsers);
    isFirstGet = !isFirstGet;
    return;
  }
  displayDataUsers(null);
}

async function onUpdateButton() {
  const allUsers = await getAllDataUsers();
  updateDataUsers(allUsers);
}

allUsersBtn.addEventListener('click', onAllUsersBtn);
updateDataBtn.addEventListener('click', onUpdateButton);

async function getTokenLocalStorage() {
  const getData = JSON.parse(localStorage.getItem('accessToken'));
  if (getData) {
    const accessToken = getData.accessToken;
    const dataUsers = await getAllUsers(accessToken);
    // const dataUsers = await getAllUsers1(accessToken);
    // const dataUsers2 = await getAllUsers2(accessToken);
    if (dataUsers) {
      showLogin(false);
      return dataUsers;
    }
    showLogin(true);
    return;
  }
  showLogin(true);
}

// function getAllUsers(code) {
//   console.log('get err token');

//   const url = 'http://91.196.52.61:8080/api_v1/Admin/All';
//   const authorizationCode = `Bearer ${code}`;
//   const params = {
//     offset: 0,
//     limit: 50,
//   };

//   //Create Axios Instance
//   const axiosInstance = axios.create({
//     baseUrl: url,
//     headers: {
//       accept: '*/*',
//       Authorization: authorizationCode,
//     },
//     params: params,
//   });
//   console.log(axiosInstance);
//   //Add interceptors to instance
//   axiosInstance.interceptors.response.use(
//     response => response,
//     error => console.log(error)
//     // if (!error.response) {
//     //   // store.commit('setServiceAvailable', false);
//     //   console.log(error);
//     // } else if (error.response.status === 401) {
//     //   console.log(error);
//     //   // store.commit('setUserAuthorised', false);
//     // }
//     // return error;
//   );

//   // return axios
//   //   .get(url, {
//   //     headers: {
//   //       accept: '*/*',
//   //       Authorization: authorizationCode,
//   //     },
//   //     params: params,
//   //   })
//   //   .then(response => {
//   //     console.log(response);
//   //     hiddenLoading();
//   //     return response.data;
//   //   })
//   //   .catch(error => {
//   //     console.error('Status:', error);
//   //     console.error('Data:', error.response);
//   //     console.error('Headers:', error.response);
//   //   });
// }

// function getAllUsers11(code) {
//   console.log('get err token');
//   const url = 'http://91.196.52.61:8080/api_v1/Admin/All';
//   const authorizationCode = `Bearer ${code}1`;
//   const params = {
//     offset: 0,
//     limit: 50,
//   };

//   return axios
//     .get(url, {
//       headers: {
//         accept: '*/*',
//         Authorization: authorizationCode,
//       },
//       params: params,
//     })
//     .then(response => {
//       console.log(response);
//       hiddenLoading();
//       return response.data;
//     })
//     .catch(error => {
//       console.error('Status:', error);
//       console.error('Data:', error.response);
//       console.error('Headers:', error.response);
//     });
// }

// function getAllUsers2(code) {
//   console.log('get Network');
//   const url = 'http://91.196.52.62:8080/api_v1/Admin/All';
//   const authorizationCode = `Bearer ${code}`;
//   const params = {
//     offset: 0,
//     limit: 50,
//   };

//   return axios
//     .get(url, {
//       headers: {
//         accept: '*/*',
//         Authorization: authorizationCode,
//       },
//       params: params,
//     })
//     .then(response => {
//       console.log(response);
//       hiddenLoading();
//       return response.data;
//     })
//     .catch(error => console.error(error));
// }

function getAllUsers(code) {
  console.log('get request');
  const url = 'http://91.196.52.61:8080/api_v1/Admin/All';
  const authorizationCode = `Bearer ${code}`;
  return fetch(url, {
    // mode: 'no-cors',
    method: 'GET',
    params: {
      offset: 0,
      limit: 50,
    },
    headers: {
      accept: '*/*',
      Authorization: authorizationCode,
    },
  })
    .catch(error => {
      console.error(error);
    })
    .then(res => {
      console.log(res);
      if (res.status === 401) {
        console.log(res);
      }
      if (res.ok) {
        return res.json();
      }
    })
    .then(response => {
      console.log(response.data);
      hiddenLoading();
      return response.data;
    })
    .catch(error => {
      console.error(error);
      console.error(error.status);
      console.error(error.message);

      if (error.status === 401) {
        console.log('WIN 401');
      }
      if (error.message === '401') {
        console.log('WIN 401');
      }
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        console.log('Failed to fetch');
        if (
          error.message.includes('Unauthorized') ||
          error.message.includes('authentication')
        ) {
          console.log('401');
        }
      }
    });
}

// const errorConnectServer = error => {
//     loadingBox.classList.add('loading__box_stop');
//     loadingMessage.textContent =
//       'Sorry. There is no connection with the servers. Try it later!';
//     console.error(typeof error);
//     console.dir(error);
//     // console.log(error instanceof TypeError);
//   };
// getAllDataUsers();

// const getData = data => {
//   const code = data.code;
//   const refreshToken = data.refreshToken;
//   getAllUsers(code);
// };

// key: persist:auth
// body: {token
// :
// "\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI2YjRhOTFiOC0zZWM2LTQ4ZjQtYTYwMS0wZDExNThiMzczZTAiLCJpYXQiOjE2ODIyNDA0NzEsImV4cCI6MTAwMDAwMDE2ODIyNDA0NzJ9.oTHdRR5eiQIyhd_59iPttJxoitYTNEfvNs8moRjg2MM\""
// _persist
// :
// "{\"version\":-1,\"rehydrated\":true}"
// }

// Робота з помилкаи

// try {
//   // Ваш код, який може викликати помилку
// } catch (error) {
//   if (error instanceof TypeError && error.message === 'Failed to fetch') {
//     // Виконується, якщо тип помилки - TypeError і повідомлення помилки - 'Failed to fetch'
//     виконатиПевнуФункцію();
//   } else {
//     // Виконується для інших типів помилок
//     console.error('Сталася помилка:', error);
//     // Виконайте необхідні дії для обробки інших типів помилок
//   }
// }

// В этом обновленном примере мы добавили дополнительную проверку на тип ошибки. Если ошибка является типом TypeError, мы выводим сообщение "Не удалось выполнить запрос". В остальных случаях выводится общее сообщение об ошибке.

// Обратите внимание, что в данном случае проверка на ошибку авторизации (401 Unauthorized) может быть затруднена, так как ошибка возникает на этапе выполнения запроса, а не на этапе получения ответа.

// function getAllUsers(code) {
//   console.log('get request');
//   const url = 'http://91.196.52.61:8080/api_v1/Admin/All';
//   const authorizationCode = `Bearer ${code}`;
//   return fetch(url, {
//     method: 'GET',
//     params: {
//       offset: 0,
//       limit: 50,
//     },
//     headers: {
//       accept: '*/*',
//       Authorization: authorizationCode,
//     },
//   })
//     .then(res => res.json())
//     .then(response => {
//       hiddenLoading();
//       return response.data;
//     })
//     .catch(error => console.error(error));
// }
// axios
//   .get('/url')
//   .then(function (response) {
//     // Обробка успішної відповіді
//   })
//   .catch(function (error) {
//     // Обробка помилки
//     console.log(error);
//   });
// У даному прикладі, якщо запит Axios завершиться помилкою, код в блоку .catch буде виконаний, і об'єкт помилки буде виведений у консолі за допомогою console.log(error).

// Будь ласка, зверніть увагу, що /url повинно бути замінене на відповідну адресу вашого API-запиту.

// 'ERR_NETWORK'
