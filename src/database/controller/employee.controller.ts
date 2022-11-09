import empDao from '../dao/employee.dao';

function createOrUpdateEmp(emp) {
  if (emp?.id) {
    return empDao
      .update(emp, emp.id)
      .then((data) => {
        console.log(`updated ${emp.id} ${emp.name}!!!`);
        console.log(data);

        return {
          data,
          isSuccessful: true,
          message: 'Employee updated successfully.',
        };
      })
      .catch((error) => {
        console.log(error);
        return {
          error,
          isSuccessful: false,
          message: 'Error updating employee.',
        };
      });
  }
  return empDao
    .create(emp)
    .then((data) => {
      console.log('Added!!!');
      console.log(data);
      return {
        data,
        isSuccessful: true,
        message: 'Employee added successfully.',
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        error,
        isSuccessful: false,
        message: 'Error on adding employee.',
      };
    });
}

function findEmployeeById(req, res) {
  empDao
    .findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteById(req, res) {
  empDao
    .deleteById(req.params.id)
    .then((data) => {
      res.status(200).json({
        message: 'Employee deleted successfully',
        emp: data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateEmployee(req, res) {
  empDao
    .updateEmployee(req.body, req.params.id)
    .then((data) => {
      res.status(200).json({
        message: 'Employee updated successfully',
        emp: data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function findEmployee(filter) {
  return empDao
    .findAll(filter)
    .then((data) => {
      return { data, isSuccessful: true, message: 'Employees data.' };
    })
    .catch((error) => {
      console.log(error);
      return {
        error,
        isSuccessful: false,
        message: 'Error fetching employees.',
      };
    });
}

function findByCompanyId(companyId) {
  return empDao
    .findByCompanyId(companyId)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}

function getDistinctValuesFromEmployeeCol(column, filter) {
  return empDao
    .getDistinctValuesFromCol(column, filter)
    .then((data) => {
      console.log('getDistinctValuesFromEmployeeCol Controller');
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}

const empController = {
  createOrUpdateEmp,
  findEmployee: findEmployee,
  findEmployeeById: findEmployeeById,
  updateEmployee: updateEmployee,
  deleteById: deleteById,
  findByCompanyId: findByCompanyId,
  getDistinctValuesFromEmployeeCol: getDistinctValuesFromEmployeeCol,
};

export default empController;
