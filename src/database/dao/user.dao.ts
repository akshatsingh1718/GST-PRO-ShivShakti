import db from '../models';

const { Op } = db.Op;
const User = db.user;

function findAll(filter = {}) {
  return User.findAll({
    where: filter,
    order: [['id', 'DESC']],
  }).then((users) => {
    return users.map((user) => user.get({ plain: true }));
  });
}

function authenticate(username: string, password: string) {
  console.log('user.dao > authenticate');

  return User.findOne({
    where: { username },
  }).then(async (response) => {
    console.log(response?.dataValues);
    if (
      response?.dataValues?.password &&
      (await response.validPassword(password, response.dataValues.password))
    ) {
      const user = response.dataValues;
      delete user?.password;
      return user;
    }
    return null;
  });
}

function create(user) {
  return User.create(user).then((userInstance) => {
    return userInstance.get({ plain: true });
  });
}

function deleteById(id: number) {
  return User.destroy({ where: { id } });
}

function update(id: number, newValues = {}) {
  return User.update(newValues, { where: { id }, individualHooks: true });
}

const userDao = {
  authenticate,
  create,
  findAll,
  deleteById,
  update,
};
export default userDao;
