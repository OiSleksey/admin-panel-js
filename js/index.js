import './adminLogin.js';
import './createUser.js';
import './updateUser.js';
import './findUser.js';
import { getAllDataUsers } from './getAllUser.js';

//Запуск запиту до сервера
document.addEventListener('DOMContentLoaded', function () {
  getAllDataUsers();
  // Ваш код, що має бути виконаний після повного завантаження DOM
});
