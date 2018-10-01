/**
 *  Basic database connection
 */

import path from 'path';
import Sequelize from 'sequelize';

const sqlLocation = process.env.NODE_ENV === 'development'
  ? path.join(__static, '/dev.sqlite')
  : path.join(__dirname, '/../../../dev.sqlite');

console.log(214214231523, sqlLocation);

const sequelize = new Sequelize('main', null, null, {
  dialect: 'sqlite',
  dialectOptions: {
    multipleStatements: true,
  },
  storage: sqlLocation,
});

export default sequelize;
