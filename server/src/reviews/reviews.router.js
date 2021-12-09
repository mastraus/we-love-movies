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

//PUT /reviews/:reviewID : checks to see if review ID exists, if not throws 404. If exists, returns updated review with critic info.
///response will have the new content (updated content) and a key called critic with the critic info, see route md for example

//DELETE /reviews/:reviewId : checks to see if review ID exists, if not throws 404. If exists, deletes.