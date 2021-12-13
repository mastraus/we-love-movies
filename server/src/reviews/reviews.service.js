const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

//get properties from critics
const criticProps = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

function list(){
  return knex("reviews").select("*");
}

  function read(reviewId) {
    return knex("reviews").select("*").where({ review_id: reviewId }).first();
  }

//returns updated review with critic information as a new key
function readReviewCritic (reviewId) {
  return knex("reviews as r")
  .join("critics as c", "r.critic_id", "c.critic_id")
  .select("*")
  .where({ "r.review_id": reviewId })
  .first()
  .then(criticProps);
}

  function update(updatedReview) {
    return knex("reviews as r")
      .select("*")
        .where({review_id: updatedReview.review_id})
        .update(updatedReview)
        .then((updatedReview) => updatedReview[0])
}

//to delece select review
function destroy(review_id) {
    return knex("reviews").where({ review_id }).del();
  }

  module.exports = {
    list,
      read,
      update,
      delete: destroy,
      readReviewCritic,
  }