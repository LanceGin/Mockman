/**
 *  Basic database connection
 */

import path from 'path';
import Sequelize from 'sequelize';

const sqlLocation = path.join(__static, '/dev.sqlite');
const sequelize = new Sequelize('main', null, null, {
  dialect: 'sqlite',
  storage: sqlLocation,
});

export default sequelize;