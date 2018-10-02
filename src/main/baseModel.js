/**
 *  Basic database connection
 */

import path from 'path';
import Sequelize from 'sequelize';

const sqlLocation = process.env.NODE_ENV === 'development'
  ? path.join(__static, '/dev.sqlite')
  : path.join(__dirname, '/../../../mockman.sqlite');

const sequelize = new Sequelize('main', null, null, {
  dialect: 'sqlite',
  dialectOptions: {
    multipleStatements: true,
  },
  storage: sqlLocation,
});

export default sequelize;
