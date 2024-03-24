import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class user extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    FullName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Phone: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: "unique_phone"
    },
    Password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    UserType: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
      {
        name: "unique_phone",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Phone" },
        ]
      },
    ]
  });
  }
}
