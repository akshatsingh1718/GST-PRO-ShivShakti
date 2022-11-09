import db from '../models';

const Company = db.company;

// function findAll() {
//   return Company.findAll({ raw: true, nest: true });
// }

function findAll(filter = {}) {
  console.log(filter);
  return Company.findAll({
    where: filter,
    order: [['id', 'DESC']],
  }).then((companies) => {
    return companies.map((company) => company.get({ plain: true }));
  });
}

function findById(id) {
  return Company.findByPk(id).get({ plain: true });
}

function deleteById(id) {
  return Company.destroy({ where: { id } });
}

function create(values) {
  return Company.create(values)
    .then((company) => {
      return company.get({ plain: true });
    })
    .catch((err) => {
      console.log('>> Error while creating comment: ', err);
      return err;
    });
}

function update(company, id: number) {
  return Company.update(company, { where: { id } }).then((companyId) => {
    console.log(companyId);
    return companyId;
  });
}

const companyDao = {
  findAll,
  create,
  findById,
  deleteById,
  update,
};

export default companyDao;
