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
    return knex("comments as c")
      .join ("users as u", "u.user_id", "c.commenter_id")
      .join ("posts as p", "p.post_id", "c.post_id")
      .select("c.comment_id", "c.comment", "u.user_email as commenter_email", "p.post_body as commented_post")
      .where({ "c.comment_id": commentId})
      .then((comment) => comment[0])
  }

module.exports = {
  list,
  read,
};