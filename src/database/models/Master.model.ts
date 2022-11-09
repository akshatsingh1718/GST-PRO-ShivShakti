const Master = (sequelize, DataTypes) => {
  const MasterSchema = sequelize.define(
    'master',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      service: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gstin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      panNo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ceo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );
  return MasterSchema;
};

export default Master;
