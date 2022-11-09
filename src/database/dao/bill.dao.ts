import moment from 'moment';

import db from '../models';
import entryDao from './entry.dao';

const { Op } = require('sequelize');

const Bill = db.bill;
const Employee = db.emp;
const Entry = db.entry;
const Company = db.company;



async function getMaxIdByFYear(year = new Date()) {
  const startDate = moment(year).format('YYYY-04-01 00:00:00');
  const nextYear = year;
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  const endDate = moment(nextYear).format('YYYY-03-31 23:59:59');
  const maxBill = await Bill.max('id', {
    where: {
      createdAt: { [Op.gte]: startDate, [Op.lte]: endDate },
    },
  });
  console.log('=========================== MAXBILL');
  console.log(startDate);
  console.log(endDate);
  console.log(maxBill);
  return maxBill;
}

async function checkForBillsAvailabilityAndUpdateInvoiceId(
  filter,
  invoiceId: number
) {
  const availableBills = await checkForBillsAvailability(filter);

  const savedBills = availableBills.map((bill) => {
    return updateInvoiceId(bill.id, invoiceId).then((resp) => {
      return { ...bill, invoiceId };
    });
  });
  console.log(savedBills);
  return Promise.all(savedBills);
}

function updateInvoiceId(billIds: Array, invoiceId: number) {
  return Bill.update({ invoiceId }, { where: { id: billIds } });
}

function checkForBillsAvailability(filter, plain = true) {
  const include = [];
  include.push({ model: Entry, as: 'entries' });
  include.push({
    model: Employee,
    as: 'employee',
    where: {
      companyId: filter?.companyId,
      department: filter?.department,
    },
  });
  console.log('>>>>>>> filter');
  console.log(filter);
  return Bill.findAll({
    where: {
      createdAt: { [Op.gte]: filter.startDate, [Op.lte]: filter.endDate },
      // createdAt: { [Op.gte]: '2022-09-22', [Op.lte]: '2022-09-24' },
      invoiceId: { [Op.eq]: null },
    },
    include,
  }).then((bills) => {
    if (plain) {
      return bills.map((bill) => bill.get({ plain: true }));
    }
    return bills;
  });
}

function findAll(includeEmployee = false, includeEntries = false, where = {}) {
  let include = [];
  if (includeEntries) {
    include.push({ model: Entry, as: 'Entries' });
  }
  if (includeEmployee) {
    include.push({ model: Employee, as: 'employee' });
  }
  return Bill.findAll({
    raw: true,
    nest: true,
    where,
    include,
  });
}

function createQueryOptionsForBill(filter) {
  const option = {
    where: {},
    include: [],
  };
  console.log(filter);

  for (const key in filter) {
    console.log(`KEY: ${key}`);
    let val = filter[key];
    switch (key) {
      case 'entry':
        option['include'].push({ model: Entry, as: 'Entries' });
        break;
      case 'employee':
        let empOptions = {
          model: Employee,
          as: 'employee',
          include: [],
          where: {},
        };

        // for loop for employee
        for (const ekey in val) {
          // if key is company
          if (ekey === 'company') {
            let compOptions = { model: Company, as: 'company' };

            // for loop for company
            for (const ckey in val[ekey]) {
              const cval = eval[ckey];
              compOptions['where'][ckey] = cval;
            }
            empOptions['include'].push(compOptions);
          } else {
            if (ekey === 'order') {
              empOptions[ekey] = val[ekey];
            } else {
              empOptions['where'][ekey] = val[ekey];
            }
          }
        }
        option['include'].push(empOptions);
        break;

      default:
        if (key === 'createdAt') {
          console.log(val);
          option['where'][key] = { [Op.between]: [val.startDate, val.endDate] };
        } else {
          option['where'][key] = val;
        }
    }
  }

  return option;
}

function filterBills(filterDetails) {
  filterDetails = createQueryOptionsForBill(filterDetails);
  console.log('bill.dao > filterBills');
  console.log(filterDetails);

  return Bill.findAll({
    raw: true,
    nest: true,
    ...filterDetails,
  });
}

function createIncludes(
  includeEmployee = true,
  includeEntries = true,
  includeCompany = true
) {
  let include = [];
  if (includeEntries) {
    include.push({ model: Entry, as: 'entries' });
  }
  if (includeEmployee) {
    include.push({
      model: Employee,
      as: 'employee',
      include: [{ model: Company, as: 'company' }],
    });
  }
  if (includeCompany) {
  }
  return include;
}

function findLastestBills(
  limit = 1,
  includeEmployee = true,
  includeEntries = true,
  includeCompany = true
) {
  const include = createIncludes(
    includeEmployee,
    includeEntries,
    includeCompany
  );
  return Bill.findAll({
    limit,
    raw: true,
    nest: true,
    include,
    order: [['id', 'DESC']],
  });
}

function getBillGreaterThan(
  id: number,
  limit: number,
  includeEmployee = true,
  includeEntries = true,
  includeCompany = true
) {
  const include = createIncludes(
    includeEmployee,
    includeEntries,
    includeCompany
  );
  console.log('bill.dao > getBillGreaterThan');
  console.log(id);
  return Bill.findOne({
    include,
    where: { id: { [Op.gt]: id } },
    order: [['id', 'ASC']],
  }).then(function (bills) {
    return bills.get({ plain: true });
  });
}

function getBillLesserThan(
  id: Date,
  limit: number,
  includeEmployee = true,
  includeEntries = true,
  includeCompany = true
) {
  const include = createIncludes(
    includeEmployee,
    includeEntries,
    includeCompany
  );
  console.log('bill.dao > getBillLesserThan');
  console.log(id);
  return Bill.findOne({
    include,
    where: { id: { [Op.lt]: id } },
    order: [['id', 'DESC']],
  }).then(function (bills) {
    return bills.get({ plain: true });
  });
}

function findById(
  id,
  includeEmployee = true,
  includeEntries = true,
  includeCompany = true
) {
  const include = createIncludes(
    includeEmployee,
    includeEntries,
    includeCompany
  );

  return Bill.findOne({
    include,
    order: [['createdAt', 'DESC']],
    where: { id },
  }).then((bill) => {
    if (bill) {
      console.log(bill.get({ plain: true }));

      return bill.get({ plain: true });
    }
    return bill;
  });
}

function deleteById(id) {
  return Bill.destroy({ where: { id } });
}

function findByCompanyId(company_id) {
  return Bill.findAll({
    where: {
      company_id: company_id,
    },
  });
}

function findByCompanyName(companyName) {
  return Bill.findAll({
    where: {
      company_id: company_id,
    },
  });
}

async function create(bill) {
  console.log('bill.dao create');
  console.log(bill);
  const currentDate = new Date();
  const id = (await getMaxIdByFYear(currentDate)) + 1;
  const billInstance = await Bill.create({
    id,
    createdAt: bill?.createdAt || currentDate,
    updatedAt: currentDate,
    gstType: bill.gstType,
    employeeId: bill.employeeId,
  });
  const entries = bill.entries.map((entry) => {
    delete entry.id;
    return {
      ...entry,
      billId: billInstance.id,
    };
  });

  return entryDao.addEntries(entries).then((res) => {
    return billInstance.dataValues;
  });
}

function undoDeleted(bill) {
  const currentDate = new Date();
  return Bill.create({
    employeeId: bill?.employeeId,
    gstType: bill?.gstType,
    invoiceId: bill?.invoiceId,
    createdAt: bill?.createdAt || currentDate,
    updatedAt: currentDate,
  }).then((billInstance) => {
    const entries = bill.entries.map((entry) => {
      return {
        docketNo: entry.docketNo,
        destination: entry.destination,
        description: entry.description,
        partyName: entry.partyName,
        weight: entry.weight,
        amount: entry.amount,
        billId: billInstance.id,
      };
    });
    return entryDao.addEntries(entries).then((res) => {
      return billInstance.dataValues;
    });
  });
}

function createBulk(entries) {
  console.log('>> addBulkEntries');
  return Bill.bulkCreate(entries)
    .then((resp) => {
      console.log('>> Created comment: ' + resp);
      return resp;
    })
    .catch((err) => {
      console.log('>> Error while creating comment: ', err);
    });
}

function updateCompany(Bill, id) {
  var updateBill = {
    name: Bill.title,
    description: Bill.description,
    contact_email: Bill.contact_email,
  };
  return Bill.update(updateBill, { where: { id: id } });
}

const BillDao = {
  findAll,
  create,
  findById,
  deleteById,
  updateCompany,
  findByCompanyId,
  addBulkEntries: createBulk,
  filterBills: filterBills,
  findLastestBills: findLastestBills,
  getBillGreaterThan: getBillGreaterThan,
  getBillLesserThan: getBillLesserThan,
  checkForBillsAvailability: checkForBillsAvailability,
  checkForBillsAvailabilityAndUpdateInvoiceId:
    checkForBillsAvailabilityAndUpdateInvoiceId,
  updateInvoiceId: updateInvoiceId,
  undoDeleted: undoDeleted,
  getMaxIdByFYear,
};

export default BillDao;
