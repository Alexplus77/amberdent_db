const Patients_listSchema = require("../Models/patients_list");

exports.getSearchList = async (req, res) => {
  try {
    const data = await Patients_listSchema.find(req.body);
    data.length
      ? res.send(data)
      : Patients_listSchema.find()
          .limit(20)
          .then((data) => {
            return res.send(data);
          })
          .catch((e) => console.log("Ошибка пустого req"));
  } catch (e) {
    console.log("Ошибка getSearchList");
    return res.send({ message: "Ошибка getSearchList" });
  }
};
