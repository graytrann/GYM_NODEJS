import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _PT from  "./PT.js";
import _course from  "./course.js";
import _hire from  "./hire.js";
import _sign from  "./sign.js";
import _user from  "./user.js";

export default function initModels(sequelize) {
  const PT = _PT.init(sequelize, DataTypes);
  const course = _course.init(sequelize, DataTypes);
  const hire = _hire.init(sequelize, DataTypes);
  const sign = _sign.init(sequelize, DataTypes);
  const user = _user.init(sequelize, DataTypes);

  hire.belongsTo(PT, { as: "PT", foreignKey: "PTId"});
  PT.hasMany(hire, { as: "hires", foreignKey: "PTId"});
  sign.belongsTo(course, { as: "Course", foreignKey: "CourseID"});
  course.hasMany(sign, { as: "signs", foreignKey: "CourseID"});
  PT.belongsTo(user, { as: "User", foreignKey: "User_ID"});
  user.hasMany(PT, { as: "PTs", foreignKey: "User_ID"});
  hire.belongsTo(user, { as: "User", foreignKey: "UserId"});
  user.hasMany(hire, { as: "hires", foreignKey: "UserId"});
  sign.belongsTo(user, { as: "User", foreignKey: "UserId"});
  user.hasMany(sign, { as: "signs", foreignKey: "UserId"});

  return {
    PT,
    course,
    hire,
    sign,
    user,
  };
}
