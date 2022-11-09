import billDao from '../dao/bill.dao';
import entryController from '../controller/entry.controller';
import Entry from '../models/Entry.model';
import Employee from '../models/Employee.model';
import Company from '../models/Company.model';

function createQueryOptions(filter, queryFor = 'bill') {
  return createQueryOptionsForBill(filter);
}

function filterBills(filterDetails) {
  return billDao.filterBills(filterDetails).then((data) => {
    return data;
  });
}

function createBill(billDetails) {
  console.log('createBill');
  return billDao
    .create(billDetails)
    .then((data) => {
      return { data, isSuccessful: true };
    })
    .catch((error) => {
      console.log('xxxxxxxx Controller xxxxxxxxx');
      console.log(error);
      return { error, isSuccessful: false };
    });
}

function undoDeletedBill(bill) {
  console.log('undoDeletedBill');
  return billDao
    .undoDeleted(bill)
    .then((data) => {
      return {
        data,
        isSuccessful: true,
        message: 'Deleted bill restored successfully.',
      };
    })
    .catch((error) => {
      return {
        error,
        isSuccessful: false,
        message: 'Deleted bill cannot be restored.',
      };
    });
}

function deleteBill(id: number) {
  return billDao
    .deleteById(id)
    .then((data) => {
      return {
        id: data,
        isSuccessful: true,
        message: `Bill no ${data} deleted successfully`,
      };
    })
    .catch((error) => {
      console.log(error);
      return { error, isSuccessful: false, message: 'Bill cannot be deleted.' };
    });
}

function updateBill(req, res) {
  billDao
    .updateBill(req.body, req.params.id)
    .then((data) => {
      res.status(200).json({
        message: 'Bill updated successfully',
        Bill: data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function getAllBills(includeEmployee = false, includeEntries = false) {
  return billDao
    .findAll(
      (includeEmployee = includeEmployee),
      (includeEntries = includeEntries)
    )
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}

function getBillById(
  id: number,
  includeEmployee: boolean = false,
  includeEntries: boolean = false
) {
  return billDao
    .findById(
      id,
      (includeEmployee = includeEmployee),
      (includeEntries = includeEntries)
    )
    .then((data) => {
      if (data) return { data, isSuccessful: true, message: 'Bill found' };
      return {
        data,
        isSuccessful: true,
        message: `No bill found for bill id ${id}`,
      };
    })
    .catch((error) => {
      console.log('xxxxxxxxxxxxxxxxxxxxxxxx');
      console.log(error);
      return {
        error,
        isSuccessful: false,
        message: `Error while searching bill id ${id}`,
      };
    });
}

function findByEmployeeId(company_id: number) {
  return billDao
    .findByEmployeeId(company_id)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}

function mergeAllEntries(data) {
  let ent = [];
  if (data?.[0]?.Entries?.id) {
    ent = data.map((bill) => bill.Entries);
  }
  let bill = {};
  for (const property in data[0]) {
    if (property == 'Entries') {
      continue;
    }
    bill[property] = data[0][property];
  }
  bill['entries'] = ent;
  return bill;
}

function findLastestBills(limit = 1) {
  return billDao
    .findLastestBills(limit)
    .then((data) => {
      console.log('====== RAW data');
      console.log(data);
      console.log('====== data');
      console.log(mergeAllEntries(data));
      return { data: mergeAllEntries(data), isSuccessful: true };
    })
    .catch((error) => {
      return { error, isSuccessful: false };
    });
}

function getBillGreaterThan(id: number, limit = 1) {
  console.log('bill.controller > getBillGreaterThan');
  console.log(id);
  return billDao
    .getBillGreaterThan(id, limit)
    .then((data) => {
      // console.log("------- getBillGreaterThan");
      // console.log(data);
      return { data: data, isSuccessful: true };
    })
    .catch((error) => {
      return { error, isSuccessful: false };
    });
}

function getBillLesserThan(id: number, limit = 1) {
  return billDao
    .getBillLesserThan(id, limit)
    .then((data) => {
      return { data: data, isSuccessful: true };
    })
    .catch((error) => {
      return { error, isSuccessful: false };
    });
}

const billController = {
  getAllBills,
  getBillById,
  updateBill,
  deleteBill,
  findByEmployeeId,
  createBill,
  filterBills,
  findLastestBills,
  getBillGreaterThan,
  getBillLesserThan,
  undoDeletedBill,
};

export default billController;
