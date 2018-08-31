/**
 *  api action with ipcMain
 */

import { ipcMain } from 'electron';
import sequelize from './baseModel';

// initial template for insertion
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

// transfer selected data to json object
const formatApis = (apis) => {
  const target = [];
  apis.forEach((api) => {
    target.push({
      id: api.id,
      mockId: api.mock_id,
      method: api.method,
      path: api.path,
      resCode: api.res_code,
      latency: api.latency,
      request: JSON.parse(api.request),
      response: JSON.parse(api.response),
    });
  });
  return target;
};

// create a new api
ipcMain.on('newApi', (e, mockId) => {
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
ipcMain.on('updateApi', (e, api) => {
  const sql = `
    UPDATE apis
    SET path = :path, method = :method, res_code = :resCode, latency = :latency, request = :request, response = :response, updated_at = datetime('now')
    WHERE id = :id;
  `;
  sequelize.query(sql, {
    type: sequelize.QueryTypes.UPDATE,
    replacements: {
      path: api.path,
      method: api.method,
      resCode: api.resCode,
      latency: api.latency,
      request: JSON.stringify(api.request),
      response: JSON.stringify(api.response),
      id: api.id,
    },
  }).then(() => {
    e.returnValue = 'success';
  });
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
    e.returnValue = formatApis(apis);
  });
});
