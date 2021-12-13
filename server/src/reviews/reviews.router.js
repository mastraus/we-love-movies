const router = require("express").Router();
const app = require("../app")
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed);

router
    .route("/:reviewId")
    .get(controller.read)
    .put(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed)

module.exports = router;

//PUT /reviews/:reviewID : checks to see if review ID exists, if not throws 404. If exists, returns updated review with critic info.
///response will have the new content (updated content) and a key called critic with the critic info, see route md for example

//DELETE /reviews/:reviewId : checks to see if review ID exists, if not throws 404. If exists, deletes.