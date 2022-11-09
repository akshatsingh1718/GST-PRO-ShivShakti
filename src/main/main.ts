/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import { saveExcelInvoice } from './utils/invoice.utils';
import { saveImage, getSoftwareDetails } from './utils/common.utils';
import db from '../database/models/index';
import controller from '../database/controller/index';

const fs = require('fs');

const myConsole = new console.Console(fs.createWriteStream('./output.txt'));

try {
  class AppUpdater {
    constructor() {
      log.transports.file.level = 'info';
      autoUpdater.logger = log;
      autoUpdater.checkForUpdatesAndNotify();
    }
  }

  let mainWindow: BrowserWindow | null = null;

  // Main process
  db.sequelize.sync({ force: false }).then(() => {
    const RESOURCES_PATH = app.isPackaged
      ? path.join(process.resourcesPath, 'assets')
      : path.join(__dirname, '../../assets');

    const getAssetPath = (...paths: string[]): string => {
      return path.join(RESOURCES_PATH, ...paths);
    };

    const getMasterLogoPath = (): string => {
      return getAssetPath('master', 'master1.logo.jpg');
    };

    ipcMain.handle('findCompany', async (event, req) => {
      const result = await controller.company.findCompany();
      return result;
    });

    ipcMain.handle('createOrUpdateEmp', async (event, emp) => {
      const result = await controller.emp.createOrUpdateEmp(emp);
      return result;
    });

    ipcMain.handle('createOrUpdateCompany', async (event, company) => {
      const result = await controller.company.createOrUpdateCompany(company);
      return result;
    });

    ipcMain.handle('getAllBills', async (event, req) => {
      const result = await controller.bill.getAllBills(
        req?.includeEmployee,
        req?.includeEntries
      );
      const data = { data: result };
      return data;
    });

    ipcMain.handle('getBillById', async (event, req) => {
      const result = await controller.bill.getBillById(
        req?.id,
        req?.includeEmployee,
        req?.includeEntries
      );
      console.log('xxxxxx =====================');
      console.log('getBillById');
      console.log(result);
      return result;
    });

    ipcMain.handle('findLastestBills', async (event, req) => {
      const result = await controller.bill.findLastestBills();
      return result;
    });

    ipcMain.handle('getBillLesserThan', async (event, req) => {
      console.log('getBillLesserThan' + req.id);
      const result = await controller.bill.getBillLesserThan(req.id);
      return result;
    });

    ipcMain.handle('getBillGreaterThan', async (event, req) => {
      // console.log("getBillGreaterThan" + req.id.getMonth() + ":" + req.id.getDate());
      console.log('getBillGreaterThan' + req.id);
      const result = await controller.bill.getBillGreaterThan(req.id);
      return result;
    });

    ipcMain.handle('getCompanyEmployees', async (event, req) => {
      const result = await controller.emp.findByCompanyId(req.companyId);
      const data = { data: result };
      return data;
    });

    ipcMain.handle('getEmployee', async (event, req) => {
      const result = await controller.emp.findEmployee(req?.filter);
      return result;
    });

    ipcMain.handle('saveBill', async (event, req) => {
      const result = await controller.bill.createBill(req.data);
      return result;
    });

    ipcMain.handle('deleteBill', async (event, req) => {
      const result = await controller.bill.deleteBill(req.id);
      return result;
    });

    ipcMain.handle('undoDeletedBill', async (event, req) => {
      console.log(req);
      const result = await controller.bill.undoDeletedBill(req?.bill);
      return result;
    });

    ipcMain.handle('saveInvoice', async (event, req) => {
      console.log(req);
      const result = await controller.invoice.saveInvoice(req.filter);
      return result;
    });

    ipcMain.handle('invoice:get', async (event, req) => {
      console.log(req);
      const result = await controller.invoice.findInvoice(req.filter);
      return result;
    });

    ipcMain.handle('deleteInvoice', async (event, req) => {
      console.log(req);
      const result = await controller.invoice.deleteInvoiceById(req?.id);
      return result;
    });

    ipcMain.handle('undoDeletedInvoice', async (event, req) => {
      console.log(req);
      // should contain billIds, startDate, endDate, createdAt(OPT) || new Date()
      const result = await controller.invoice.undoDeletedInvoice(req?.invoice);
      return result;
    });

    ipcMain.handle('findLastestInvoice', async (event, req) => {
      const result = await controller.invoice.findLastestInvoice(req?.data);
      return result;
    });

    ipcMain.handle('findInvoiceById', async (event, req) => {
      const result = await controller.invoice.findInvoiceById(req?.id);
      return result;
    });

    ipcMain.handle('getInvoiceGreaterThan', async (event, req) => {
      console.log('getInvoiceGreaterThan' + req?.id);
      const result = await controller.invoice.getInvoiceGreaterThan(req.id);
      return result;
    });

    ipcMain.handle('getInvoiceLesserThan', async (event, req) => {
      console.log('getInvoiceLesserThan' + req?.id);
      const result = await controller.invoice.getInvoiceLesserThan(req.id);
      return result;
    });

    ipcMain.handle('createInvoice', async (event, req) => {
      console.log('createInvoice' + req?.id);
      const result = await controller.invoice.findInvoiceById(req.id);
      console.log(saveExcelInvoice);
      if (result.isSuccessful) {
        const masterDetailsResponse =
          await controller.master.findLastestMaster();
        const masterDetails = masterDetailsResponse.isSuccessful
          ? masterDetailsResponse.data
          : {};
        console.log(masterDetails);
        saveExcelInvoice(masterDetails, result.data);
      }
    });

    ipcMain.handle('getUnsavedInvoice', async (event, req) => {
      const result = await controller.invoice.getUnsavedInvoice(req?.filter);
      return result;
    });

    ipcMain.handle('authenticateUser', async (event, req) => {
      console.log(req);
      console.log(req.data);
      const result = await controller.user.authenticateUser(req?.data);
      return result;
    });

    ipcMain.handle('user:createOrUpdate', async (event, req) => {
      console.log(req);
      const result = await controller.user.createOrUpdateUser(req?.user);
      return result;
    });

    ipcMain.handle('user:isUsernameAvailable', async (event, req) => {
      console.log(req);
      const result = await controller.user.isUsernameAvailable(req?.username);
      return result;
    });

    ipcMain.handle('user:deleteById', async (event, req) => {
      console.log(req);
      const result = await controller.user.deleteUserById(req?.id);
      return result;
    });

    ipcMain.handle('user:updateLastLogin', async (event, req) => {
      const result = await controller.user.updateUserLastLogin(
        req?.id,
        req?.newValue
      );
      return result;
    });

    ipcMain.handle('user:updateLastLogout', async (event, req) => {
      console.log('-------------------xxxxxxxxxxxxx');
      console.log(req);
      const result = await controller.user.updateUserLastLogout(
        req?.id,
        req?.newValue
      );
      return result;
    });

    ipcMain.handle('master:createOrUpdate', async (event, req) => {
      console.log('==> master:createOrUpdate');
      console.log(req);
      const result = await controller.master.createOrUpdateMaster(req?.data);
      return result;
    });

    ipcMain.handle('master:getById', async (event, req) => {
      console.log('==> master:get');
      const result = await controller.master.findMasterById(req?.id);
      return result;
    });

    ipcMain.handle('master:getLatest', async (event) => {
      console.log('==> master:getLatest');
      const result = await controller.master.findLastestMaster();
      if (result.isSuccessful) {
        result.data = { ...result.data, logo: getMasterLogoPath() };
      }
      return result;
    });

    ipcMain.handle('master:saveLogo', async (event, req) => {
      console.log('==> master:saveLogo');
      console.log(req);
      const result = await saveImage(req?.path, getMasterLogoPath());
      console.log(getMasterLogoPath());
      console.log(result);

      return result;
    });

    ipcMain.handle('user:getAll', async (event, req) => {
      console.log(req);
      const result = await controller.user.findUsers(req?.filter);
      return result;
    });

    ipcMain.handle('getDistinctValuesFromEmployeeCol', async (event, req) => {
      console.log('getDistinctValuesFromEmployeeCol');
      const result = await controller.emp.getDistinctValuesFromEmployeeCol(
        req?.column,
        req?.filter
      );
      const data = { data: result };
      return data;
    });

    ipcMain.handle('window:resize', async (event, arg) => {
      try {
        mainWindow?.setSize(arg?.width, arg?.height);
        return true;
      } catch (e) {
        return false;
      }
    });

    ipcMain.handle('pmspro:details', async (event) => {
      return getSoftwareDetails();
    });

    ipcMain.handle('common:RESOURCES_PATH', async (event) => {
      return RESOURCES_PATH;
    });
  });

  ipcMain.on('ipc-example', async (event, arg) => {
    const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
    console.log(msgTemplate(arg));
    event.reply('ipc-example', msgTemplate('pong'));
  });

  if (process.env.NODE_ENV === 'production') {
    const sourceMapSupport = require('source-map-support');
    sourceMapSupport.install();
  }

  const isDebug =
    process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

  if (isDebug) {
    require('electron-debug')();
  }

  const installExtensions = async () => {
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ['REACT_DEVELOPER_TOOLS'];

    return installer
      .default(
        extensions.map((name) => installer[name]),
        forceDownload
      )
      .catch(console.log);
  };

  const createWindow = async (name = 'index.html') => {
    if (isDebug) {
      await installExtensions();
    }

    const RESOURCES_PATH = app.isPackaged
      ? path.join(process.resourcesPath, 'assets')
      : path.join(__dirname, '../../assets');

    const getAssetPath = (...paths: string[]): string => {
      return path.join(RESOURCES_PATH, ...paths);
    };

    mainWindow = new BrowserWindow({
      show: false,
      width: 900,
      height: 385,
      icon: getAssetPath('logo.png'),
      webPreferences: {
        preload: app.isPackaged
          ? path.join(__dirname, 'preload.js')
          : path.join(__dirname, '../../.erb/dll/preload.js'),
      },
    });

    mainWindow.loadURL(resolveHtmlPath(name));

    mainWindow.on('ready-to-show', () => {
      if (!mainWindow) {
        throw new Error('"mainWindow" is not defined');
      }
      if (process.env.START_MINIMIZED) {
        mainWindow.minimize();
      } else {
        mainWindow.show();
      }
    });

    mainWindow.on('closed', () => {
      mainWindow = null;
    });

    const menuBuilder = new MenuBuilder(mainWindow);
    menuBuilder.buildMenu();

    // Open urls in the user's browser
    mainWindow.webContents.setWindowOpenHandler((edata) => {
      shell.openExternal(edata.url);
      return { action: 'deny' };
    });

    // Remove this if your app does not use auto updates
    // eslint-disable-next-line
    new AppUpdater();
  };

  /**
   * Add event listeners...
   */

  app.on('window-all-closed', () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app
    .whenReady()
    .then(() => {
      createWindow();

      app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (mainWindow === null) createWindow();
      });
    })
    .catch(console.log);
} catch (err) {
  myConsole.log('!!!!!!');
  myConsole.log(err);
}
