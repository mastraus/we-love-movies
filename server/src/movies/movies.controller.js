const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const {as} = require("../db/connection");

async function list(req, res, next) {
  const { is_showing } = req.query;
  let data;
  if (is_showing == "true"){
    data = await service.listOnlyShowing()
    res.json({ data });
  }     
  data = await service.list();
  res.json({ data });
}

async function read(req, res, next) {
  const { movie: data } = res.locals;
  res.json({ data });
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

//returns theaters with a specific movie ID
async function theatersWithMovie(req, res, next) {
  const data = await service.theatersWithMovie(res.locals.movie.movie_id);
  res.json({ data });
}

//should return the reviews for a specific movie with the critic properties set as a key
async function criticReview(req, res, next) {
  const { movie_id } = res.locals.movie;
  res.json({ data: await service.criticReview(movie_id) });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), read],
  theatersWithMovie: [asyncErrorBoundary(movieExists), asyncErrorBoundary(theatersWithMovie)],
  criticReview: [asyncErrorBoundary(movieExists), asyncErrorBoundary(criticReview)],
};