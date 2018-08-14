/**
 *  mock action with ipcMain
 */

import { ipcMain } from 'electron';

// create a new mock
ipcMain.on('newMock', (e, arg) => {
  console.log('newMock', e, arg);
});

// update a mock
ipcMain.on('updateMock', (e, arg) => {
  console.log('updateMock', e, arg);
});

// remove a mock
ipcMain.on('removeMock', (e, arg) => {
  console.log('removeMock', e, arg);
});

// get mock list
ipcMain.on('getMockList', (e, arg) => {
  console.log('getMockList', e, arg);
});