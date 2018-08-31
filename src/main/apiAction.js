/**
 *  api action with ipcMain
 */

import { ipcMain } from 'electron';
import sequelize from './baseModel';

const initApi = {
  method: 'get',
  path: 'mockman',
  resCode: '200 - OK',
  latency: '0',
  request: {
    params: [],
    body: [],
    headers: [],
  },
  response: {
    body: { type: 'json', value: null },
    cookies: [],
    headers: [],
  },
};

// create a new api
ipcMain.on('newApi', (e, mockId) => {
  console.log(798689, mockId);
  const sql = `
    INSERT INTO apis (mock_id, path, method, res_code, latency, request, response, created_at, updated_at)
    VALUES (:mockId, :path, :method, :resCode, :latency, :request, :response, datetime('now'), datetime('now'));
  `;
  sequelize.query(sql, {
    type: sequelize.QueryTypes.INSERT,
    replacements: {
      mockId,
      path: initApi.path,
      method: initApi.method,
      resCode: initApi.resCode,
      latency: initApi.latency,
      request: JSON.stringify(initApi.request),
      response: JSON.stringify(initApi.response),
    },
  }).then(() => {
    e.returnValue = 'success';
  });
});

// update a new api
ipcMain.on('updateApi', (e, arg) => {
  console.log('updateApi', e, arg);
});

// remove an api
ipcMain.on('removeApi', (e, api) => {
  const sql = `
    DELETE FROM apis
    WHERE id = :apiId;
  `;
  sequelize.query(sql, {
    type: sequelize.QueryTypes.DELETE,
    replacements: {
      apiId: api.id,
    },
  }).then(() => {
    e.returnValue = 'success';
  });
});

// get api list
ipcMain.on('getApiList', (e, mockId) => {
  console.log(124324324, mockId);
  const sql = `
    SELECT *
    FROM apis
    WHERE mock_id = :mockId;
  `;
  sequelize.query(sql, {
    type: sequelize.QueryTypes.SELECT,
    replacements: {
      mockId,
    },
  }).then((apis) => {
    e.returnValue = apis;
  });
});
