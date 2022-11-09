import masterDao from '../dao/master.dao';

function findLastestMaster() {
  console.log('findLastestMaster');
  return masterDao
    .findLastest()
    .then((data) => {
      console.log(data);
      return {
        data,
        isSuccessful: true,
        message: `Latest Master found with id '${data.id}'`,
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        error,
        isSuccessful: false,
        message: 'Cannot find master details.',
      };
    });
}

function createMaster(master) {
  console.log('createMaster');
  return masterDao
    .create(master)
    .then((data) => {
      return {
        data,
        isSuccessful: true,
        message: `Successfully create ${data.name} | ${data.ceo}`,
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        error,
        isSuccessful: false,
        message: `Master cannot be created`,
      };
    });
}

function updateMaster(master) {
  console.log('updateMaster');
  return masterDao
    .update(master, master.id)
    .then((data) => {
      return {
        data,
        isSuccessful: true,
        message: 'Master details updated successfully',
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        error,
        isSuccessful: false,
        message: 'Master details not updated.',
      };
    });
}

function findMasterById(id: number) {
  console.log('findMasterById');
  return masterDao
    .findById(id)
    .then((data) => {
      return {
        data,
        isSuccessful: true,
        message: `Master found with id= '${id}'`,
      };
    })
    .catch((error) => {
      return {
        error,
        isSuccessful: false,
        message: `Master cannot be found with id= '${id}'`,
      };
    });
}

function createOrUpdateMaster(master) {
  console.log('createOrUpdate');
  return master?.id ? updateMaster(master) : createMaster(master);
}

const masterController = {
  createMaster,
  findMasterById,
  updateMaster,
  findLastestMaster,
  createOrUpdateMaster,
};
export default masterController;
