const Bill = (sequelize, DataTypes) => {
  const BillSchema = sequelize.define(
    'bill',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      gstType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: false,
      timestamps: false,
    }
  );
  return BillSchema;
};

export default Bill;
