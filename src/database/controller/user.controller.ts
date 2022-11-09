import userDao from '../dao/user.dao';

function createOrUpdateUser(user) {
  if (user?.id) {
    return updateUser(user.id, user);
  }
  return createUser(user);
}

function updateUserLastLogin(id: number, lastLogin = new Date()) {
  console.log('updateUserLastLogin> ');
  console.log({ lastLogin });
  return updateUser(id, { lastLogin });
}
function updateUserLastLogout(id: number, lastLogout = new Date()) {
  console.log('updateUserLastLogout> ');
  console.log({ lastLogout });
  return updateUser(id, { lastLogout });
}

function updateUser(id, newValues) {
  console.log('updateUser> ');
  console.log(newValues);
  return userDao
    .update(id, newValues)
    .then((data) => {
      return { data, isSuccessful: true, message: 'User updated successfully' };
    })
    .catch((error) => {
      console.log(error);
      return {
        error,
        isSuccessful: false,
        message: 'Error user not updated',
      };
    });
}

function deleteUserById(filter) {
  return userDao
    .deleteById(filter)
    .then((data) => {
      return { data, isSuccessful: true, message: 'User deleted successfully' };
    })
    .catch((error) => {
      console.log(error);
      return {
        error,
        isSuccessful: false,
        message: 'Error user not deleted',
      };
    });
}

function isUsernameAvailable(username: string) {
  return userDao
    .findAll({ username })
    .then((data: Array) => {
      var resp;
      if (data.length > 0) {
        resp = {
          datat: data,
          data: false,
          isSuccessful: true,
          message: `Username '${username}' is not available`,
        };
      } else {
        resp = {
          datat: data,
          data: true,
          isSuccessful: true,
          message: `Username '${username}' is available.`,
        };
      }
      return resp;
    })
    .catch((error) => {
      console.log(error);
      return {
        error,
        isSuccessful: false,
        message: 'Error checking for username availability.',
      };
    });
}

function findUsers(filter) {
  return userDao
    .findAll(filter)
    .then((data) => {
      return { data, isSuccessful: true, message: 'User(s) data.' };
    })
    .catch((error) => {
      console.log(error);
      return {
        error,
        isSuccessful: false,
        message: 'Error fetching user(s).',
      };
    });
}

function authenticateUser(user) {
  return userDao
    .authenticate(user.username, user.password)
    .then((data) => {
      if (data)
        return {
          data,
          isSuccessful: true,
          message: 'User details matched',
        };
      return {
        data,
        isSuccessful: false,
        message: 'Invalid credentials',
      };
    })
    .catch((error) => {
      return {
        error,
        isSuccessful: false,
        message: 'Invalid credentials',
      };
    });
}

function createUser(user) {
  return userDao
    .create(user)
    .then((data) => {
      if (data)
        return {
          data,
          isSuccessful: true,
          message: 'User created successfully',
        };
    })
    .catch((error) => {
      return {
        error,
        isSuccessful: false,
        message: 'User cannot be created',
      };
    });
}

const userController = {
  authenticateUser,
  createUser,
  findUsers,
  isUsernameAvailable,
  deleteUserById,
  updateUser,
  updateUserLastLogin,
  updateUserLastLogout,
  createOrUpdateUser,
};

export default userController;
