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
ipcMain.on('updateMock', (e, mock) => {
  const name = mock.content.slice(0, 1);
  const sql = `
    UPDATE mocks
    SET name = :name, content = :content, port = :port, prefix = :prefix, updated_at = datetime('now')
    WHERE id = :id;
  `;
  sequelize.query(sql, {
    type: sequelize.QueryTypes.UPDATE,
    replacements: {
      name,
      content: mock.content,
      port: mock.port,
      prefix: mock.prefix,
      id: mock.id,
    },
  }).then(() => {
    e.returnValue = 'success';
  });
});

// remove a mock
ipcMain.on('removeMock', (e, mock) => {
  const sql = `
    DELETE FROM mocks
    WHERE id = :mockId;
  `;
  sequelize.query(sql, {
    type: sequelize.QueryTypes.DELETE,
    replacements: {
      mockId: mock.id,
    },
  }).then(() => {
    e.returnValue = 'success';
  });
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
