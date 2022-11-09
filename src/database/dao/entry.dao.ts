import db from '../models';

const Entry = db.entry;
const Employee = db.emp;



function findByBillId(billId: number) {
  // return Entry.findAll({  raw: true, nest: true});
  return Entry.findAll({
    where: {
      billId: billId,
    },
    raw: true,
    nest: true,
  });
}

function findById(id: number) {
  return Entry.findByPk(id);
}

function deleteById(id: number) {
  return Entry.destroy({ where: { id } });
}

function findByCompanyId(company_id) {
  return Entry.findAll({
    where: {
      company_id,
    },
  });
}

function findByCompanyName(companyName) {
  return Entry.findAll({
    where: {
      company_id: company_id,
    },
  });
}

function create(entry) {
  // var newEntry = new Entry(entry);
  // return newEntry.save();

  return Entry.create(entry)
    .then((entry) => {
      console.log('>> Created comment: ' + entry);
      return entry;
    })
    .catch((err) => {
      console.log('>> Error while creating comment: ', err);
    });
}

function createBulk(entries) {
  console.log('>> addBulkEntries');
  return Entry.bulkCreate(entries)
    .then((resp) => {
      console.log('>> Created comment: ' + resp);
      return resp;
    })
    .catch((err) => {
      console.log('>> Error while creating comment: ', err);
      return err;
    });
}

function updateCompany(entry, id) {
  var updateEntry = {
    name: entry.title,
    description: entry.description,
    contact_email: entry.contact_email,
  };
  return Entry.update(updateEntry, { where: { id } });
}


const EntryDao = {
  create: create,
  findById: findById,
  deleteById: deleteById,
  updateCompany: updateCompany,
  findByCompanyId: findByCompanyId,
  addEntries: createBulk,
  findByBillId: findByBillId,
};
export default EntryDao;
