import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class course extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    NameCourse: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Price: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'course',
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
    ]
  });
  }
}
