const express = require("express");

const cityController = require("../controller/CityController");
const cityRoute = express.Router();


cityRoute.use("/get", cityController.getCities);
cityRoute.use("/add", cityController.addCity);
cityRoute.use("/upd", cityController.updCity);
cityRoute.use("/del", cityController.delCity);

module.exports = cityRoute;