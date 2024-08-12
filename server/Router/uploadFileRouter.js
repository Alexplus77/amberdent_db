const express = require("express");
const router = express.Router();
const { uploads } = require("../Middlewares/multerStorage");
const { uploadTest } = require("../Controllers/uploadTest");
const { postFile } = require("../Controllers/uploadCsvFile");

router.post("/uploadfile", uploads.single("uploadfile"), postFile);
router.post("/uploadTest", uploads.single("uploadfile"), uploadTest);
module.exports = router;
