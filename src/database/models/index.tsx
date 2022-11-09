// const Sequelize = require('sequelize');
import { Sequelize, Op } from 'sequelize';
import dbConfig from '../config/db.config';
import User from "./User.model";
import Company from './Company.model';
import Emp from './Employee.model';
import Entry from './Entry.model';
import Bill from './Bill.model';
import Invoice from './Invoice.model';
import Master from './Master.model';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectModule: require('mysql2'),
  operatorsAliases: false,
  dialectOptions: {
    useUTC: false, //for reading from database
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db: any = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Op = Op;

db.company = Company(sequelize, Sequelize);
db.emp = Emp(sequelize, Sequelize);
db.entry = Entry(sequelize, Sequelize);
db.bill = Bill(sequelize, Sequelize);
db.invoice = Invoice(sequelize, Sequelize);
db.user = User(sequelize, Sequelize);
db.master = Master(sequelize, Sequelize);

db.company.hasMany(db.emp, { as: 'Employees' });
db.emp.belongsTo(db.company, {
  foreignKey: 'companyId',
  targetKey: 'id',
});

db.emp.hasMany(db.bill, { as: 'Bills' });
db.bill.belongsTo(db.emp, {
  foreignKey: 'employeeId',
  targetKey: 'id',
});

db.bill.hasMany(db.entry, { as: 'entries' });
db.entry.belongsTo(db.bill, {
  foreignKey: 'billId',
  targetKey: 'id',
});

db.invoice.hasMany(db.bill, { as: 'bills', onDelete: 'null', hooks: true });
db.bill.belongsTo(db.invoice, {
  foreignKey: 'invoiceId',
  targetKey: 'id',
});

export default db;
// const { Sequelize } = require('sequelize');

// // Option 3: Passing parameters separately (other dialects)
// const sequelize = new Sequelize('shivshakti', 'pmspro', 'Temp@1718', {
//   host: 'localhost',
//   dialect: 'mysql',
// });

// module.exports = sequelize;
