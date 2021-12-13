const router = require("express").Router();
const app = require("../app");
const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed)

module.exports = router;

//GET /theaters : returns list of ALL theaters including the 'movies' each theater is showing
///each theater will have a key created called 'movies' that will include all of the movies objects that are playing there

//use reduceProperties, the uniqueField will be the theater_id
//config param is obj where key specifies original property value and value is an array that specifies path to the new property name