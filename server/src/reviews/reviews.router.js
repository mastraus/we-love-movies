const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
    .route("/")
    .all();

router
    .route("/:reviewId")
    .delete(controller.delete)

module.exports = router;