import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class PT extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Specialized: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    User_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'ID'
      }
    }
  }, {
    sequelize,
    tableName: 'PT',
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
        name: "User_ID",
        using: "BTREE",
        fields: [
          { name: "User_ID" },
        ]
      },
    ]
  });
  }
}
