import db from '../models';

const Master = db.master;

function findLastest() {
  return Master.findAll({
    where: {},
    order: [['id', 'DESC']],
  }).then((data) => {
    const masters = data.map((master) => master.get({ plain: true }));
    return masters[0];
  });
}

function create(master) {
  return Master.create(master)
    .then((masterInstance) => {
      return masterInstance.get({ plain: true });
    })
    .catch((err) => {
      console.log('>> Error while creating comment: ', err);
      return err;
    });
}

function findById(id: number) {
  return Entry.findByPk(id);
}

function update(master, id: number) {
  return Master.update(master, { where: { id } });
}

const MasterDao = {
  create,
  update,
  findById,
  findLastest,
};
export default MasterDao;
