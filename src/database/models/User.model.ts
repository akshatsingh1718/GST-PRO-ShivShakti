// const bcrypt = require('bcrypt');

import { digest } from '../../main/utils/common.utils';

const User = (sequelize, DataTypes) => {
  const userSchema = sequelize.define(
    'users',
    {
      id: {
        field: 'id',
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true,
      },
      password: {
        field: 'password',
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        field: 'name',
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        field: 'username',
        allowNull: false,
        unique: true,
      },
      userType: {
        type: DataTypes.STRING,
        field: 'userType',
        allowNull: false,
        unique: false,
        defaultValue: 'staff',
      },
      lastLogin: {
        type: DataTypes.DATE,
        field: 'lastLogin',
        allowNull: true,
        unique: false,
      },
      lastLogout: {
        type: DataTypes.DATE,
        field: 'lastLogout',
        allowNull: true,
        unique: false,
      },
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            // const salt = await bcrypt.genSaltSync(10, 'a');
            // user.password = bcrypt.hashSync(user.password, salt);
            const password = await digest({ message: user.password });
            user.password = password;
          }
        },
        beforeUpdate: async (user) => {
          if (user._changed.has('password')) {
            console.log('changing password');
            // const salt = await bcrypt.genSaltSync(10, 'a');
            // user.password = bcrypt.hashSync(user.password, salt);
            console.log('password :' + user.password);
            const password = await digest({ message: user.password });
            user.password = password;
            console.log('digest:' + password);
          }
        },
      },
      instanceMethods: {
        validPassword: (password) => {
          // return bcrypt.compareSync(password, this.password);
          console.log('instance Valid password');
          const userPassword = this.password;
          return digest({ message: password }).then((enteredPassword) => {
            return enteredPassword === userPassword;
          });
        },
      },
    }
  );

  userSchema.prototype.validPassword = async (password, hash) => {
    console.log('Valid password');
    return digest({ message: password }).then((enteredPassword) => {
      console.log('password: ' + password);
      console.log('enteredPasswordHash: ' + enteredPassword);
      console.log('hash: ' + hash);
      return enteredPassword === hash;
    });
    // return await bcrypt.compareSync(password, hash);
  };
  return userSchema;
};

export default User;
