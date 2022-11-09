import { saveImage } from './common.utils';

export async function getResourcePath() {
  // Renderer process
  return window.electron.ipcRenderer
    .invoke('common:RESOURCES_PATH')
    .then((result: string) => {
      return result;
    });
}

export async function getMasterById(data) {
  // Renderer process
  return window.electron.ipcRenderer
    .invoke('master:getById', data)
    .then((result) => {
      return result;
    });
}

export async function getLatestMaster() {
  // Renderer process
  return window.electron.ipcRenderer
    .invoke('master:getLatest')
    .then((result) => {
      return result;
    });
}

export async function updateMasterLogo(data) {
  // const respPath = await getResourcePath()
  //   .then((resName) => {
  //     console.log(resName);
  //     return window.electron.path.join(resName, '../');
  //   })
  //   .catch((e) => console.log(e));
  // const res = await saveImage(data?.path, `${resPath}/master/logo.jpg`);
  // return res;
  // Renderer process
  return window.electron.ipcRenderer
    .invoke('master:saveLogo', data)
    .then((result) => {
      return result;
    });
}

export async function createOrUpdateMaster(data) {
  // Renderer process
  return window.electron.ipcRenderer
    .invoke('master:createOrUpdate', data)
    .then((result) => {
      return result;
    });
}

export async function findCompany(data) {
  // Renderer process
  return window.electron.ipcRenderer
    .invoke('findCompany', data)
    .then((result) => {
      console.log(result);
      return result;
    });
}

export async function createOrUpdateEmp(data) {
  // Renderer process
  return window.electron.ipcRenderer
    .invoke('createOrUpdateEmp', data)
    .then((result) => {
      return result;
    });
}

export async function createOrUpdateCompany(data) {
  // Renderer process
  return window.electron.ipcRenderer
    .invoke('createOrUpdateCompany', data)
    .then((result) => {
      return result;
    });
}

export async function getAllBills(data) {
  // Renderer process
  return window.electron.ipcRenderer
    .invoke('getAllBills', data)
    .then((result) => {
      return result;
    });
}

export async function getBillById(data) {
  // Renderer process
  return window.electron.ipcRenderer
    .invoke('getBillById', data)
    .then((result) => {
      return result;
    });
}

export async function findLastestBills(data) {
  // Renderer process
  return window.electron.ipcRenderer
    .invoke('findLastestBills', data)
    .then((result) => {
      return result;
    });
}

export async function getBillGreaterThan(data) {
  // Renderer process
  return window.electron.ipcRenderer
    .invoke('getBillGreaterThan', data)
    .then((result) => {
      return result;
    });
}

export async function getBillLesserThan(data) {
  // Renderer process
  return window.electron.ipcRenderer
    .invoke('getBillLesserThan', data)
    .then((result) => {
      return result;
    });
}

export async function getDistinctValuesFromEmployeeCol(data) {
  // Renderer process
  return window.electron.ipcRenderer
    .invoke('getDistinctValuesFromEmployeeCol', data)
    .then((result) => {
      return result;
    });
}

export async function getEmployee(data) {
  // Renderer process
  return window.electron.ipcRenderer
    .invoke('getEmployee', data)
    .then((result) => {
      return result;
    });
}

export async function getCompanyEmployees(data) {
  // Renderer process
  return window.electron.ipcRenderer
    .invoke('getCompanyEmployees', data)
    .then((result) => {
      return result;
    });
}

export async function saveBill(data) {
  // Renderer process
  return window.electron.ipcRenderer.invoke('saveBill', data).then((result) => {
    return result;
  });
}

export async function deleteBill(data) {
  // Renderer process
  return window.electron.ipcRenderer
    .invoke('deleteBill', data)
    .then((result) => {
      return result;
    });
}

export async function undoDeletedBill(data) {
  // Renderer process
  return window.electron.ipcRenderer
    .invoke('undoDeletedBill', data)
    .then((result) => {
      return result;
    });
}
// Invoice utils

export async function saveInvoice(data) {
  // Renderer process
  return window.electron.ipcRenderer
    .invoke('saveInvoice', data)
    .then((result) => {
      return result;
    });
}

export async function deleteInvoice(data) {
  // Renderer process
  return window.electron.ipcRenderer
    .invoke('deleteInvoice', data)
    .then((result) => {
      return result;
    });
}

export async function undoDeletedInvoice(data) {
  // Renderer process
  return window.electron.ipcRenderer
    .invoke('undoDeletedInvoice', data)
    .then((result) => {
      return result;
    });
}

export async function findLastestInvoice(data) {
  // Renderer process
  return window.electron.ipcRenderer
    .invoke('findLastestInvoice', data)
    .then((result) => {
      return result;
    });
}
export async function findInvoiceById(data) {
  return window.electron.ipcRenderer
    .invoke('findInvoiceById', data)
    .then((result) => {
      return result;
    });
}

export async function getInvoice(data) {
  return window.electron.ipcRenderer
    .invoke('invoice:get', data)
    .then((result) => {
      return result;
    });
}

export async function getInvoiceLesserThan(data) {
  // Renderer process
  return window.electron.ipcRenderer
    .invoke('getInvoiceLesserThan', data)
    .then((result) => {
      return result;
    });
}

export async function getUnsavedInvoice(data) {
  // Renderer process
  return window.electron.ipcRenderer
    .invoke('getUnsavedInvoice', data)
    .then((result) => {
      return result;
    });
}

export async function getInvoiceGreaterThan(data) {
  // Renderer process
  return window.electron.ipcRenderer
    .invoke('getInvoiceGreaterThan', data)
    .then((result) => {
      return result;
    });
}

export async function createInvoice(data) {
  // Renderer process
  return window.electron.ipcRenderer
    .invoke('createInvoice', data)
    .then((result) => {
      return result;
    });
}

export async function fakeResp(data) {
  // Renderer process
  return data;
}

// user utils

export async function authenticateUser(data) {
  // Renderer process
  return window.electron.ipcRenderer
    .invoke('authenticateUser', data)
    .then((result) => {
      return result;
    });
}

export async function createOrUpdateUser(data) {
  // Renderer process
  return window.electron.ipcRenderer
    .invoke('user:createOrUpdate', data)
    .then((result) => {
      return result;
    });
}

export async function getUsers(data) {
  // Renderer process
  return window.electron.ipcRenderer
    .invoke('user:getAll', data)
    .then((result) => {
      return result;
    });
}

export async function isUsernameAvailable(data) {
  // Renderer process
  return window.electron.ipcRenderer
    .invoke('user:isUsernameAvailable', data)
    .then((result) => {
      return result;
    });
}

export async function deleteUserById(data) {
  // Renderer process
  return window.electron.ipcRenderer
    .invoke('user:deleteById', data)
    .then((result) => {
      return result;
    });
}

export async function updateUserLastLogin(data) {
  // Renderer process
  return window.electron.ipcRenderer
    .invoke('user:updateLastLogin', data)
    .then((result) => {
      return result;
    });
}

export async function updateUserLastLogout(data) {
  // Renderer process
  return window.electron.ipcRenderer
    .invoke('user:updateLastLogout', data)
    .then((result) => {
      return result;
    });
}

export async function resizeWindow(data) {
  // Renderer process
  return window.electron.ipcRenderer
    .invoke('window:resize', data)
    .then((result) => {
      return result;
    });
}

// Software details
export async function getSoftwareDetails(data) {
  // Renderer process
  return window.electron.ipcRenderer
    .invoke('pmspro:details', data)
    .then((result) => {
      return result;
    });
}
