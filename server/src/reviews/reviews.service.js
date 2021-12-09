const knex = require("../db/connection");

function destroy(review_id) {
    return knex("reviews").where({ review_id }).del();
  }

  module.exports = {
      delete: destroy,
  }