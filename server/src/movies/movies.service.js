const knex = require("../db/connection");

//lists ALL movies from movies database
function list() {
  return knex("movies").select("*");
}

//list single movie
function read(movieId) {
    return knex("movies").select("*").where({ movie_id: movieId }).first();
  }

//returns only the movies that are currently playing in theaters, so will need to reference the movies_theaters table instead
function listOnlyShowing() {
    return knex("movies as m")
      .join ("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .select("m.*")
      .then((movie) => movie[0])
  }

//returns theaters with specific movie ID
function theatersWithMovie(movieId) {
  return knex("movies_theaters as mt")
    .join ("movies as m", "m.movie_id", "mt.movie_id")
    .join ("theaters as t", "t.theater_id", "mt.theater.id")
    .select("t.*")
    .then((theater) => theater[0])
}
//pulls the reviews of a movie and the critic's information
function criticReview(movieId) {
  return knex("reviews as r")
    .join ("movies as m", "m.movie_id", "r.movie_id")
    .join ("critics as c", "c.critic_id", "r.critic_id")
    .select ("r.*", "c.*")
}

module.exports = {
  list,
  read,
  listOnlyShowing,
  theatersWithMovie,
  criticReview,
};