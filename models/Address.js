module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    city: DataTypes.STRING,
    street: DataTypes.STRING,
    number: DataTypes.STRING,
    employeeId: { type: DataTypes.INTEGER, foreignKey: true }
  }, {
    timestamps: false,
    tableName: 'Addresses',
    underscored: true,
  })

  Address.associete = (models) => {
    Address.belongsTo(models.Employee,
      { foreignKey: 'emplyee_id', as: 'employees' })
  }

  return Address
}