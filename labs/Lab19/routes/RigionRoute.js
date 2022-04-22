const express = require("express");

const cityController = require("../controller/RegionController");
const cityRoute = express.Router();


cityRoute.use("/get", cityController.getRegions);
cityRoute.use("/add", cityController.addRegion);
cityRoute.use("/upd", cityController.updRegion);
cityRoute.use("/del", cityController.delRegion);

module.exports = cityRoute;