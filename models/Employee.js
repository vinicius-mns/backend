module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    age: DataTypes.STRING,
  },{
    timestamps: false, // remove a obrigatoriedade de utilizar os campos `createdAt` e `updatedAt`
    underscored: true,
    tableName: 'Employees',
  })

  Employee.associate = (models) => {
    Employee.hasOne(models.Address, 
      { foreignKey: 'employee_id', as: 'addresses' })
  }

  return Employee
}