/**
 * Define ipcMain method to fetch data
 */

import { ipcMain } from 'electron';
import path from 'path';
import Sequelize from 'sequelize';

const sqlLocation = path.join(__static, '/dev.sqlite');
const sequelize = new Sequelize('main', null, null, {
  dialect: 'sqlite',
});

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
