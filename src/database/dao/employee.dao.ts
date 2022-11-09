import db from '../models';

const { Sequelize } = db.Sequelize;
const Employee = db.emp;
const Company = db.company;

const EmployeeDao = {
  findAll: findAll,
  create: create,
  findById: findById,
  deleteById: deleteById,
  update: update,
  findByCompanyId: findByCompanyId,
  getDistinctValuesFromCol: getDistinctValuesFromCol,
};

function getDistinctValuesFromCol(column, filter) {
  return Employee.findAll({
    where: filter,
    raw: true,
    nest: true,
    attributes: [[Sequelize.fn('DISTINCT', Sequelize.col(column)), column]],
  }).then((data) => {
    return data.flatMap(Object.values);
  });
}

// function getDistinctValuesFromCol(columns, filter) {
//   const vals = columns.map((col) =>
//     Employee.findAll({
//       where: filter,
//       raw: true,
//       nest: true,
//       attributes: [[Sequelize.fn('DISTINCT', Sequelize.col(col)), col]],
//     }).then((data)=>data)
//   );
//   return Promise.all(vals).then((values) => {
//     console.log('getDistinctValuesFromCol DAO');
//     let resp = {};
//     values.map((val)=>{
//       try {
//         const key = Object.keys(val[0])[0];
//         resp[key] = val.flatMap(Object.values);
//       }
//       catch(err) {
//         resp[key]  = [];
//       }
//     });
//     return resp;
//   });
// }

// function findAll(filter = {}) {
//   return Employee.findAll({ raw: true, nest: true, where: filter });
// }

function findAll(filter = {}) {
  return Employee.findAll({
    where: filter,
    include: [{ model: Company, as: 'company' }],
    order: [['id', 'DESC']],
  }).then((employees) => {
    return employees.map((emp) => emp.get({ plain: true }));
  });
}

function findById(id) {
  return Employee.findByPk(id);
}

function deleteById(id) {
  return Employee.destroy({ where: { id: id } });
}

function findByCompanyId(companyId) {
  return Employee.findAll({
    where: {
      companyId: companyId,
    },
    raw: true,
    nest: true,
  });
}

function findByCompanyName(companyName) {
  return Employee.findAll({
    where: {
      companyId: companyId,
    },
  });
}

function create(emp) {
  // var newEmployee = new Employee(emp);
  // return newEmployee.save();

  return Employee.create(emp)
    .then((emp) => {
      console.log('>> Created employee: ' + emp);
      return emp.get({ plain: true });
    })
    .catch((err) => {
      console.log('>> Error while creating comment: ', err);
      return err;
    });
}

function update(emp, id) {
  return Employee.update(emp, { where: { id } }).then((employeeId) => {
    console.log(employeeId);
    return employeeId;
  });
}

export default EmployeeDao;
