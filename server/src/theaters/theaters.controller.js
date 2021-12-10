const service = require("./theaters.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list() {
    console.log("hello")
}

module.exports = {
    list,
}