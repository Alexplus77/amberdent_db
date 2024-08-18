const express = require("express");
const router = express.Router();
const { getAllListController } = require("../Controllers/getAllLists");
const { getSearchList } = require("../Controllers/getSearchList");
const {findAndUpdateData} = require("../Controllers/findAndUpdateData");
router.get("/allList", getAllListController);
router.post("/search", getSearchList);
router.post('/update', findAndUpdateData)
module.exports = router;
