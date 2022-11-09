import entryDao from '../dao/entry.dao';

function addEntry(entry) {
  return entryDao
    .create(entry)
    .then((data) => {
      console.log('Added!!!');
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}

function addEntriesFromBasicDetails(basicDetails, entriesData) {
  console.log('addEntriesFromBasicDetails');
  const entries = entriesData.map((entry) => ({
    entryGroupId: basicDetails.entryGroupId,
    createdAt: basicDetails.createdAt,
    docketNo: entry.docketNo,
    destination: entry.destination,
    description: entry.description,
    partyName: entry.partyName,
    weight: entry.weight,
    amount: entry.amount,
    emp_id: 1,
  }));
  console.log(entries);
  return addBulkEntries(entries)
    .then((data) => {
      console.log('Added!!!');
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}

function addBulkEntries(entries) {
  return entryDao
    .addBulkEntries(entries)
    .then((data) => {
      console.log('Added!!!');
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}

function addEntries(entries) {
  return entryDao
    .create(entry)
    .then((data) => {
      console.log('Added!!!');
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}

function findEntryByBillId(billId) {
  return entryDao
    .findByBillId(billId)
    .then((data) => {
      console.log('Added!!!');
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}

function findEntryById(req, res) {
  entryDao
    .findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteById(req, res) {
  entryDao
    .deleteById(req.params.id)
    .then((data) => {
      res.status(200).json({
        message: 'Entry deleted successfully',
        entry: data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateEntry(req, res) {
  entryDao
    .updateEntry(req.body, req.params.id)
    .then((data) => {
      res.status(200).json({
        message: 'Entry updated successfully',
        entry: data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function getAllEntries() {
  return entryDao
    .findAll()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}

function findByEmployeeId(company_id) {
  return entryDao
    .findByEmployeeId(company_id)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}

var entryController = {
  addEntry,
  getAllEntries,
  findEntryById,
  updateEntry,
  deleteById,
  findByEmployeeId,
  findEntryByBillId,
  addEntriesFromBasicDetails,
};

export default entryController;
