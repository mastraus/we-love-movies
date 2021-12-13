const router = require("express").Router();
const app = require("../app");
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed);
    
router
    .route("/:movieId")
    .get(controller.read)
    .all(methodNotAllowed);

router
    .route("/:movieId/theaters")
    .get(controller.theatersWithMovie)
    .all(methodNotAllowed);

router
    .route("/:movieId/reviews")
    .get(controller.criticReview)
    .all(methodNotAllowed);

module.exports = router;

//'read' one movie

//GET /movies : Return list of ALL movies.
// /showing=true Returns all movies currently showing

//GET /movies/:movieId : return 404 if ID does not match
//return movie detailswhen given existing ID

// /movies/:movieId/theaters : returns theaters for specified movie_id

//GET /movies/:movieId/reviews : returns reviews with critic property for specififed movie_id
///*critic property will be a key that includes all the critic details, see route for example

//should not include critics anywhere for path /movies/:movieId/critics (?)