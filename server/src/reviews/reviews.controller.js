const service = require("./reviews.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//checks to see if review exists
async function reviewExists(req, res, next) {
    const { reviewId } = req.params;
    const review = await service.read(reviewId);
    if (review) {
      res.locals.review = review;
      return next();
    }
    return next({ status: 404, message: `Review cannot be found.` });
  }

async function destroy(req, res) {
    const { review } = res.locals;
    await service.delete(review.review_id);
    res.sendStatus(204);
  }

//update review and include critic information as critic key
async function update(req, res) {
    const updatedReview = {
      ...req.body.data,
      review_id: res.locals.review.review_id,
    };
    const reviewData = await service.update(updatedReview)
    const criticData = await service.readReviewCritic(res.locals.review.critic_id)
    const data = {
        ...reviewData,
        criticData,
    }
    res.json({ data })
  }

  module.exports = {
      update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
      delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  }