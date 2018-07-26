/**
 * Define ipcMain method to fetch data
 */

import { ipcMain } from 'electron';

// getMocks api
ipcMain.on('getMocks', (e, arg) => {
  console.log('getMocks', e, arg);
});

// mockInfo api
ipcMain.on('mockInfo', (e, arg) => {
  console.log('mockInfo', e, arg);
});

// apiInfo api
ipcMain.on('apiInfo', (e, arg) => {
  console.log('apiInfo', e, arg);
});
