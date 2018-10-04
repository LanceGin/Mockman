/**
 *  Basic database connection
 */

import path from 'path';
import Sequelize from 'sequelize';
import { app } from 'electron' // eslint-disable-line

const sqlLocation = path.join(app.getPath('userData'), '/mockman.sqlite');
const createMock = `
  CREATE TABLE IF NOT EXISTS "mocks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "port" TEXT NOT NULL,
    "prefix" TEXT NOT NULL,
    "created_at" datetime NOT NULL,
    "updated_at" datetime NOT NULL
  );
`;
const creatApi = `
  CREATE TABLE IF NOT EXISTS "apis" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mock_id" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "res_code" TEXT NOT NULL,
    "latency" TEXT NOT NULL,
    "request" json NOT NULL,
    "response" json NOT NULL,
    "created_at" datetime NOT NULL,
    "updated_at" datetime NOT NULL
  );
`;

const sequelize = new Sequelize('main', null, null, {
  dialect: 'sqlite',
  dialectOptions: {
    multipleStatements: true,
  },
  storage: sqlLocation,
});
sequelize.query(createMock).then(() => {
  sequelize.query(creatApi).then();
});

export default sequelize;
