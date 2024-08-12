const express = require("express");
const router = express.Router();
const { getAllListController } = require("../Controllers/getAllLists");
router.get("/allList", getAllListController);
module.exports = router;
