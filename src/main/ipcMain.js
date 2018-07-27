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

console.log(11111, sqlLocation);

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
