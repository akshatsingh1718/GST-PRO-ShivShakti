import companyDao from '../dao/company.dao';

function createOrUpdateCompany(company) {
  if (company?.id) {
    return companyDao
      .update(company, company.id)
      .then((data) => {
        console.log('Added!!!');
        console.log(data);
        return {
          data,
          isSuccessful: true,
          message: 'Company details updated successfully.',
        };
      })
      .catch((error) => {
        console.log(error);
        return {
          error,
          isSuccessful: false,
          message: 'Error updating company.',
        };
      });
  }
  return companyDao
    .create(company)
    .then((data) => {
      console.log('Added!!!');
      console.log(data);
      return {
        data,
        isSuccessful: true,
        message: 'Company added successfully.',
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        error,
        isSuccessful: false,
        message: 'Error on adding company.',
      };
    });
}

function findCompanyById(req, res) {
  companyDao
    .findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteById(req, res) {
  companyDao
    .deleteById(req.params.id)
    .then((data) => {
      res.status(200).json({
        message: 'Company deleted successfully',
        company: data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateCompany(req, res) {
  companyDao
    .updateCompany(req.body, req.params.id)
    .then((data) => {
      res.status(200).json({
        message: 'Company updated successfully',
        company: data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}


function findCompany(filter) {
  return companyDao
    .findAll(filter)
    .then((data) => {
      return { data, isSuccessful: true, message: 'Company data.' };
    })
    .catch((error) => {
      console.log(error);
      return {
        error,
        isSuccessful: false,
        message: 'Error fetching company.',
      };
    });
}

const companyController = {
  createOrUpdateCompany,
  findCompany,
  findCompanyById,
  updateCompany,
  deleteById,
};


export default companyController;
