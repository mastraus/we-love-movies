const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
    res.json({ data: await service.list() });
}

async function read(req, res, next) {
    const knexInstance = req.app.get("db");
    const { movie } = res.locals;
    res.json({ data: movie });
  }

  //checks to see if movie exists
async function movieExists(req, res, next) {
    const { movieId } = req.params;
    const movie = await service.read(movieId);
    if (movie) {
      res.locals.movie = movie;
      return next();
    }
    return next({ status: 404, message: `Movie cannot be found.` });
  }

  //only lists movies currently showing (is showing = true)
async function listOnlyShowing(req, res, next) {
  const data = await service.listOnlyShowing();
  res.json({ data });
}

//returns theaters with a specific movie ID
async function theatersWithMovie(req, res, next) {
  const data = await service.theatersWithMovie();
  res.json({ data });
}

//should return the reviews for a specific movie with the critic properties set as a key
async function criticReview(req, res, next) {
  const data = await service.criticReview();
  res.json({ data })
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  listOnlyShowing: asyncErrorBoundary(listOnlyShowing),
  theatersWithMovie: [asyncErrorBoundary(movieExists), asyncErrorBoundary(theatersWithMovie)],
  criticReview: [asyncErrorBoundary(movieExists), asyncErrorBoundary(criticReview)]
};