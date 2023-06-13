import { createUpdateListener } from './updateUser.js';
const tableHeaders = document.querySelectorAll('.table__header th');
const table = document.querySelector('.table-users');
const allUsersBtn = document.querySelector('#allUsers');
export let arrDataUser = [1];
let isGetFirst = true;
let tbody = null;

const convertDate = date => {
  const dateData = new Date(date);
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };
  const locale = navigator.language;
  const intlDate = new Intl.DateTimeFormat(locale, options).format(dateData);
  // console.log(new Date(date));
  return intlDate;
};
const hiddenUsersBtnWarning = () => {
  allUsersBtnActive(false);
  table.removeChild(tbody);
};

const allUsersBtnActive = bool => {
  if (!bool) {
    allUsersBtn.classList.add('btn-dark');
    allUsersBtn.classList.remove('btn-warning');
    return;
  }
  allUsersBtn.classList.remove('btn-dark');
  allUsersBtn.classList.add('btn-warning');
};

const fillingButtonData = id => {
  const updateBtn = document.createElement('button');
  updateBtn.classList.add('btn', 'btn-dark', 'btn-update');
  updateBtn.dataset.userId = id;
  updateBtn.dataset.bsToggle = 'collapse';
  updateBtn.dataset.bsTarget = '#collapseTwo';
  updateBtn.textContent = 'Update';
  return updateBtn;
};

const filingTableData = (data, i) => {
  const cellTrBody = document.createElement('tr');
  const cellThBody = document.createElement('th');
  const updateBtn = fillingButtonData(data.id);
  cellThBody.textContent = i + 1;
  cellTrBody.appendChild(cellThBody);
  for (let t = 1; t < tableHeaders.length; t++) {
    const cellTdBody = document.createElement('td');
    cellTdBody.textContent = data[tableHeaders[t].textContent];
    cellTrBody.appendChild(cellTdBody);
    if (tableHeaders[t].textContent === 'update') {
      cellTdBody.appendChild(updateBtn);
    }
  }
  return cellTrBody;
};

const createDataUser = (data, i) => {
  const dataUsers = {
    id: data[i].id,
    name: data[i].name,
    role: data[i].role,
    email: data[i].email,
    phone: data[i].phone,
    homePhone: data[i].homePhone,
    dateOfBirth: convertDate(data[i].dateOfBirth),
    blocked: data[i].blocked,
    createdAt: convertDate(data[i].createdAt),
    lastLoginAt: convertDate(data[i].lastLoginAt),
    hireDate: convertDate(data[i].hireDate),
    roleId: data[i].roleId,
  };
  return dataUsers;
};

const createTable = () => {
  const tableBody = document.createElement('tbody');
  tableBody.classList.add('all-users');
  // const dataTable = document.querySelector('.table-users .all-users');
  for (let i = 0; i < arrDataUser.length; i++) {
    const dataUsers = createDataUser(arrDataUser, i);
    const cellTrBody = filingTableData(dataUsers, i);
    tableBody.appendChild(cellTrBody);
  }
  table.appendChild(tableBody);
  allUsersBtnActive(true);
  createUpdateListener();
  tbody = tableBody;
  // return dataTable;
};

const deleteTable = () => {
  if (tbody) {
    hiddenUsersBtnWarning();
    tbody = null;
  }
};

const controlTable = () => {
  if (tbody) return deleteTable();
  createTable();
};

export function updateDataUsers(data) {
  if (!data) {
    console.log('dont work get data');
    return;
  }
  if (data.length <= 0) {
    console.log('get data empty');
    return;
  }
  arrDataUser = data;
  if (allUsersBtn.classList.contains('btn-warning')) {
    controlTable();
    controlTable();
  }
}

export function displayDataUsers(data) {
  if (isGetFirst) {
    if (!data) {
      console.log('dont work get data');
      return;
    }
    if (data.length <= 0) {
      console.log('get data empty');
      return;
    }
    arrDataUser = data;
    isGetFirst = !isGetFirst;
  }
  controlTable();
}
