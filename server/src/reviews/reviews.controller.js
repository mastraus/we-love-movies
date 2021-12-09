const service = require("./reviews.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function destroy(req, res) {
    const { review } = res.locals;
    await service.delete(review.review_id);
    res.sendStatus(204);
  }

  module.exports = {
      delete: [asyncErrorBoundary(destroy)]
  }