import userController from './user.controller';
import companyController from './company.controller';
import empController from './employee.controller';
import entryController from './entry.controller';
import billController from './bill.controller';
import invoiceController from './invoice.controller';
import masterController from './master.controller';

const controller = {
  company: companyController,
  emp: empController,
  entry: entryController,
  bill: billController,
  invoice: invoiceController,
  user: userController,
  master: masterController,
};

export default controller;
