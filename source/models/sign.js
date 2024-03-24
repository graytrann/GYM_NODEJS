import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class sign extends Model {
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
    DisCode: {
      type: DataTypes.STRING(255),
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
    CourseID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'course',
        key: 'ID'
      }
    }
  }, {
    sequelize,
    tableName: 'sign',
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
        name: "CourseID",
        using: "BTREE",
        fields: [
          { name: "CourseID" },
        ]
      },
    ]
  });
  }
}
