const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

//for critic info to be added as key
const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
})

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
  .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
  .select("m.*")
  .distinct("m.movie_id")
  .where({ "mt.is_showing": true })
}

//returns theaters with specific movie ID
function theatersWithMovie(movieId){
  return knex("theaters as t")
  .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
  .join("movies as m", "mt.movie_id", "m.movie_id")
  .select("t.*")
  .where({ "mt.is_showing": true })
  .where({ "mt.movie_id": movieId })
  .orderBy("t.theater_id");
}

//returns movie's review with critic info
function criticReview(movieId) {
  return knex("reviews as r")
      .join("critics as c", "r.critic_id", "c.critic_id")
      .select("r.*", "c.*")
      .where({ "r.movie_id": movieId })
      .then(reviews => reviews.map(addCritic))
}

module.exports = {
  list,
  read,
  listOnlyShowing,
  theatersWithMovie,
  criticReview,
};