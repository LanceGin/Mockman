/**
 *  mock action with ipcMain
 */

import { ipcMain } from 'electron';
import sequelize from './baseModel';

// create a new mock
ipcMain.on('newMock', (e) => {
  const sql = `
    INSERT INTO mocks (name, content, port, prefix, created_at, updated_at)
    VALUES ('M', 'Mockman', '3000', '', datetime('now'), datetime('now'));
  `;
  sequelize.query(sql, {
    type: sequelize.QueryTypes.INSERT,
  }).then(() => {
    e.returnValue = 'success';
  });
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
ipcMain.on('getMockList', (e) => {
  const sql = `
    SELECT *
    FROM mocks;
  `;
  sequelize.query(sql, {
    type: sequelize.QueryTypes.SELECT,
  }).then((mocks) => {
    e.returnValue = mocks;
  });
});
