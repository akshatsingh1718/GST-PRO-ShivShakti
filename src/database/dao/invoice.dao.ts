import moment from 'moment';

import db from '../models';
import billDao from './bill.dao';

const Op = db.Op;
const Invoice = db.invoice;
const Bill = db.bill;
const Entry = db.entry;
const Employee = db.emp;

async function getMaxIdByFYear(year = new Date()) {
  const startDate = moment(year).format('YYYY-04-01 00:00:00');
  const nextYear = year;
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  const endDate = moment(nextYear).format('YYYY-03-31 23:59:59');
  const lastInvoiceId = await Invoice.max('id', {
    where: {
      createdAt: { [Op.gte]: startDate, [Op.lte]: endDate },
    },
  });
  console.log('=========================== MAX INVOICE');
  console.log(startDate);
  console.log(endDate);
  console.log(lastInvoiceId);
  return lastInvoiceId;
}

async function getNextIdByFYear(year = new Date()) {
  const currentDate = new Date();
  const id = (await getMaxIdByFYear(currentDate)) + 1;
  return id;
}

function checkForBillsAvailability() {
  // var newEmployee = new Employee(emp);
  // return newEmployee.save();
}

function getUnsaved(filter) {
  var invoice = new Invoice({
    startDate: filter?.startDate,
    endDate: filter?.endDate,
  });

  invoice = invoice.get({ plain: true });
  // d.setHours(0, 0, 0, 0);
  return billDao
    .checkForBillsAvailability({
      ...filter,
      startDate: moment(filter?.startDate).format('YYYY-MM-DD 00:00:00'),
      endDate: moment(filter?.endDate).format('YYYY-MM-DD 23:59:59'),
    })
    .then((bills) => {
      console.log(bills);
      return { ...invoice, bills };
    });
}

async function undoDeleted(invoice) {
  const id = await getNextIdByFYear();

  return Invoice.create({
    id,
    createdAt: invoice?.createdAt || new Date(),
    startDate: invoice?.startDate,
    endDate: invoice?.endDate,
  }).then((invoiceInstance) => {
    invoiceInstance = invoiceInstance.get({ plain: true });
    return billDao
      .updateInvoiceId(invoice?.billIds, invoiceInstance?.id)
      .then((resp) => {
        console.log('undo updatedBills', resp);
        return { ...invoiceInstance, billIds: resp };
      });
  });
}

async function create(filter) {
  const id = await getNextIdByFYear();
  console.log('invoice.doa create');
  console.log(filter);
  return Invoice.create({
    id,
    startDate: filter?.startDate,
    endDate: filter?.endDate,
  }).then((invoiceInstance) => {
    invoiceInstance = invoiceInstance.get({ plain: true });
    console.log('->> invoice instance');
    console.log(invoiceInstance);
    return billDao
      .checkForBillsAvailabilityAndUpdateInvoiceId(
        {
          ...filter,
          startDate: moment(filter?.startDate).format('YYYY-MM-DD 00:00:00'),
          endDate: moment(filter?.endDate).format('YYYY-MM-DD 23:59:59'),
        },
        invoiceInstance.id
      )
      .then((resp) => {
        console.log('create invoice');
        console.log(resp);
        return { ...invoiceInstance, bills: resp };
      });
    // return invoiceInstance.get({ plain: true });
  });
}

const getInvoiceIncludes = () => {
  return [
    {
      model: Bill,
      as: 'bills',
      include: [
        { model: Entry, as: 'entries' },
        { model: Employee, as: 'employee' },
      ],
    },
  ];
};

function findById(id) {
  return Invoice.findOne({
    where: { id },
    include: getInvoiceIncludes(),
  }).then((data) => {
    return data.get({ plain: true });
  });
}

function find(filter) {
  return Invoice.findAll({
    where: filter,
    include: getInvoiceIncludes(),
  }).then((data) => {
    return data.map((invoice) => invoice.get({ plain: true }));
  });
}

function findLastest(limit = 1) {
  console.log(getInvoiceIncludes());
  return Invoice.findAll({
    where: {},
    limit,
    order: [['id', 'DESC']],
    include: getInvoiceIncludes(),
  }).then((data) => {
    console.log(data.map((el) => el.get({ plain: true })));
    data = data.map((el) => el.get({ plain: true }));
    if (limit === 1) return data[0];
    return data;
  });
}

function getGreaterThan(id: number, limit: number) {
  console.log('invoice.dao > getInvoiceGreaterThan');
  console.log(id);
  return Invoice.findOne({
    include: getInvoiceIncludes(),
    where: { id: { [Op.gt]: id } },
    order: [['id', 'ASC']],
  }).then(function (invoice) {
    return invoice.get({ plain: true });
  });
}

function getLesserThan(id: number, limit: number) {
  console.log('invoice.dao > getInvoiceLesserThan');
  console.log(id);
  return Invoice.findOne({
    include: getInvoiceIncludes(),
    where: { id: { [Op.lt]: id } },
    order: [['id', 'DESC']],
  }).then(function (invoice) {
    return invoice.get({ plain: true });
  });
}

async function deleteById(id: number) {
  try {
    const bills = await billDao.findAll(false, false, { invoiceId: id });
    const billIds = bills.map((bill) => bill.id);
    const updatedBills = await billDao.updateInvoiceId(billIds, null);
    console.log('updatedBills', updatedBills);
    return Invoice.destroy({ where: { id } });
  } catch (err) {
    return err;
  }
}

const InvoiceDao = {
  create,
  find,
  findById: findById,
  findLastest: findLastest,
  getGreaterThan: getGreaterThan,
  getLesserThan: getLesserThan,
  getUnsaved: getUnsaved,
  deleteById: deleteById,
  undoDeleted: undoDeleted,
};

export default InvoiceDao;
