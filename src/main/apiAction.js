/**
 *  api action with ipcMain
 */

import { ipcMain } from 'electron';

// create a new api
ipcMain.on('newApi', (e, arg) => {
  console.log('newApi', e, arg);
});

// update a new api
ipcMain.on('updateApi', (e, arg) => {
  console.log('updateApi', e, arg);
});

// remove an api
ipcMain.on('removeApi', (e, arg) => {
  console.log('removeApi', e, arg);
});

// get api list
ipcMain.on('getApiList', (e, arg) => {
  console.log('getApiList', e, arg);
});
