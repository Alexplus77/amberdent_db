const Patients_listSchema = require("../Models/patients_list");

exports.getAllListController = (req, res) => {
  try {
    Patients_listSchema.find()
      .limit(20)
      .then((data) => {
        res.send(data);
      });
  } catch (e) {
    res.send({ message: "Ошибка getAllList" });
  }
};
