import invoiceDao from '../dao/invoice.dao';
import companyController from './company.controller';
import db from '../models';

const { Op } = db.Op;

function deleteInvoiceById(id) {
  return invoiceDao
    .deleteById(id)
    .then((data) => {
      console.log('deleted!!!');
      console.log(data);
      return {
        data,
        isSuccessful: true,
        message: 'Invoice deleted successfully.',
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        error,
        isSuccessful: false,
        message: 'Error cannot delete invoice.',
      };
    });
}

function undoDeletedInvoice(invoice) {
  return invoiceDao
    .undoDeleted(invoice)
    .then((data) => {
      console.log('Added!!!');
      console.log(data);
      return {
        data,
        isSuccessful: true,
        message: 'Deleted Invoice restored successfully.',
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        error: `${Op}`,
        isSuccessful: false,
        message: 'Deleted Invoice cannot be restored.',
      };
    });
}

function saveInvoice(filter) {
  return invoiceDao
    .create(filter)
    .then((data) => {
      console.log('Added!!!');
      console.log(data);
      data.bills = flattenInvoiceBills(data?.bills);
      return {
        data: data,
        isSuccessful: true,
        message: 'Invoice created successfully.',
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        error,
        isSuccessful: false,
        message: 'Error cannot create invoice.',
      };
    });
}

function findInvoiceById(id) {
  return invoiceDao
    .findById(id)
    .then((data) => {
      data.bills = flattenInvoiceBills(data?.bills);
      return {
        data,
        isSuccessful: true,
        message: `Invoice finded successfully with id= ${id}.`,
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        error,
        isSuccessful: false,
        message: `Error cannot find invoice wiht id= ${id}.`,
      };
    });
}

function findInvoice(filter = {}) {
  return invoiceDao
    .find(filter)
    .then((invoices) => {
      invoices = invoices.map((invoice) => {
        return { ...invoice, bills: flattenInvoiceBills(invoice?.bills) };
      });
      if (invoices.length === 0) {
        return {
          data: invoices,
          isSuccessful: false,
          message: `No invoices found with given filter details.`,
          error: 'Invoice Not Found',
        };
      }
      return {
        data: invoices,
        isSuccessful: true,
        message: `Invoices found successfully with the given filters`,
      };
    })
    .catch((error) => {
      return {
        error,
        isSuccessful: false,
        message: `Error cannot find invoice with given filter..`,
      };
    });
}

async function formatInvoice(invoice) {
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
  console.log(invoice);
  invoice.bills = await flattenInvoiceBills(invoice?.bills);
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
  console.log(invoice);
  const companyId = invoice?.bills?.[0]?.employee?.companyId;
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
  console.log(companyId);
  // const company = await companyController.findCompany({ id: 1 });
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
  // console.log(company);
  // [invoice.company] = company.data;
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
  console.log(invoice);
  return invoice;
}

async function temp(data) {
  data.bills = flattenInvoiceBills(data?.bills);
  // data.company = await companyController.findCompany({ id: 1 });
  return data;
}

async function findLastestInvoice() {
  return invoiceDao
    .findLastest()
    .then((data) => {
      // const d = formatInvoice(data);
      console.log('>>> findLastestInvoice');
      console.log(data);
      data.gstType = data.bills?.[0]?.gstType;
      data.bills = flattenInvoiceBills(data?.bills);
      const companyId = data.bills?.[0]?.employee?.companyId;
      console.log(data);
      // return companyController.findCompany({ id: companyId }).then((resp) => {
      //   console.log('----------------------');
      //   [data.company] = resp.data;
      //   // data.company = await companyController.findCompany({ id: 1 });
      //   console.log('===================xx');
      //   console.log(data);
      return {
        data,
        isSuccessful: true,
        message: 'Lastest invoice.',
      };
      // });
    })
    .catch((error) => {
      console.log(error);
      return {
        error: `${Op}`,
        isSuccessful: false,
        message: 'Error cannot find invoice.',
      };
    });
}

function getInvoiceGreaterThan(id: number, limit = 1) {
  console.log('invoice.controller > getInvoiceGreaterThan');
  return invoiceDao
    .getGreaterThan(id, limit)
    .then((data) => {
      data.bills = flattenInvoiceBills(data?.bills);
      return { data, isSuccessful: true };
    })
    .catch((error) => {
      return { error, isSuccessful: false };
    });
}

function getInvoiceLesserThan(id: number, limit = 1) {
  console.log('invoice.controller > getInvoiceGreaterThan');
  return invoiceDao
    .getLesserThan(id, limit)
    .then((data) => {
      data.bills = flattenInvoiceBills(data?.bills);
      return { data, isSuccessful: true };
    })
    .catch((error) => {
      return { error, isSuccessful: false };
    });
}

function compare(a, b) {
  if (a.employee.name < b.employee.name) {
    return -1;
  }
  if (a.employee.name > b.employee.name) {
    return 1;
  }
  return 0;
}

function getUnsavedInvoice(filter) {
  return invoiceDao
    .getUnsaved(filter)
    .then((data) => {
      console.log('getUnsaved!!!');
      console.log(data);
      data.bills = flattenInvoiceBills(data?.bills);
      return {
        data: data,
        isSuccessful: true,
        message: 'Invoice created successfully.',
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        error,
        isSuccessful: false,
        message: 'Error cannot create invoice.',
      };
    });
}

function flattenInvoiceBills(bills) {
  let flattenBills = bills?.map((bill) => {
    const row = bill.entries.map((entry) => {
      return {
        createdAt: bill.createdAt,
        employee: bill.employee,
        ...entry,
      };
    });
    return row;
  });
  flattenBills = [].concat.apply([], flattenBills);
  flattenBills = flattenBills.sort(compare);
  return flattenBills;
}

const invoiceController = {
  saveInvoice,
  findInvoice,
  findInvoiceById,
  findLastestInvoice,
  getInvoiceGreaterThan,
  getInvoiceLesserThan,
  getUnsavedInvoice,
  deleteInvoiceById,
  undoDeletedInvoice,
};

export default invoiceController;
