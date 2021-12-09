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

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), read],
};