const express = require("express");

const jobController = require("../controller/JobsController");
const jobRoute = express.Router();

jobRoute.use("/get", jobController.getJob);
jobRoute.use("/add", jobController.addJob);
jobRoute.use("/upd", jobController.updJob);
jobRoute.use("/del", jobController.delJob);

module.exports = jobRoute;