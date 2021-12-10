const knex = require("../db/connection");

  function read(reviewId) {
    return knex("review").select("*").where({ review_id: reviewId }).first();
  }

//returns updated review with critic information as a new key
function readReviewCritic(critic_id) {
    return knex("critics")
      .select("*")
      .where({ critic_id })
      .first()
}
  function update(updatedReview) {
    return knex("reviews as r")
        .update(updatedReview, "*")
        .where({"r.review_id": updatedReview.review_id})
        .then(() => read(updatedReview.review_id))
}

//to delece select review
function destroy(review_id) {
    return knex("reviews").where({ review_id }).del();
  }

  module.exports = {
      read,
      update,
      destroy,
      readReviewCritic,
  }