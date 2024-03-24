import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class hire extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    DateBegin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Duration: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Total: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'ID'
      }
    },
    PTId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'PT',
        key: 'ID'
      }
    }
  }, {
    sequelize,
    tableName: 'hire',
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
        name: "UserId",
        using: "BTREE",
        fields: [
          { name: "UserId" },
        ]
      },
      {
        name: "PTId",
        using: "BTREE",
        fields: [
          { name: "PTId" },
        ]
      },
    ]
  });
  }
}
