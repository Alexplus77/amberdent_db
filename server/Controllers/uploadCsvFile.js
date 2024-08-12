const csv = require("fast-csv");
const path = require("path");
const fs = require("fs");
const { header } = require("../HelperFiles/headerTabCsv");
const Patients_listSchema = require("../Models/patients_list");
// Контроллер парсит файл csv и записывает в базу данных
exports.postFile = function (req, res) {
  try {
    if (!req.file.filename)
      return res.status(400).send("No files were uploaded.");

    let patientsList = [];

    //Парсим csv файл.
    csv
      .parseFile(req.file.path, {
        discardUnmappedColumns: true,
        ignoreEmpty: true,
      })
      .on("data", (data) => {
        patientsList.push(data.join(",").split(";"));
      })
      .on("error", (err) => {
        console.log("Error from csvParsFile:", err);
      })
      .on("finish", () => {
        patientsList.splice(0, 1); //удалили строку с заголовками
        let indexDataPatients = 0; //индекс массива таблицы с которого начинаются строки данных по пациентам
        const iterator = () => {
          const obj = {}; //Обьект по пациенту для записи в БД
          try {
            if (patientsList[indexDataPatients]) {
              patientsList[indexDataPatients].map((el, i) => {
                return (obj[header[i]] = el.replaceAll("₽", " ").trim());
              });

              Patients_listSchema.findOne({
                Date: obj.Date,
                Clinic: obj.Clinic,
                Name: obj.Name,
                Operation: obj.Operation,
                Sum: obj.Sum,
                Comment: obj.Comment,
              })
                .then((docs) => {
                  obj.Date &&
                    !docs &&
                    new Patients_listSchema(obj).save().then(() => {
                      patientsList.splice(indexDataPatients, 1);
                    });
                })
                .catch((e) => {
                  console.log("error from uploadCSvfileNewPatientList", e);
                });

              indexDataPatients++;
              iterator(); //включаем рекурсию
            }
          } catch (e) {
            console.log("from iterator", e);
          }
        };
        iterator();
      })
      .on("end", () => {
        fs.unlink(req.file.path, function (err) {
          if (err) return console.log(err);
        }); // удаляем загружаемый файл
      });
  } catch (e) {
    res.status(500).send({ message: "Ошибка в функции postFile" });
  }
};
