const service = require("./reviews.service");
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

  async function destroy(req, res){
    await service.delete(req.params.reviewId);
    res.sendStatus(204).json();
}

//update review and include critic information as critic key
async function update(req, res) {
    const updatedReview = {
      ...req.body.data,
      review_id: res.locals.review.review_id,
    };
    await service.update(updatedReview)
    const criticData = await service.readReviewCritic(res.locals.review.review_id);
    res.json({data: criticData});
  }

  async function list(req, res){
    const data = await service.list();
    res.json({ data });
  }
  
  async function read(req, res) {
      const { review: data } = res.locals;
      res.json({ data });
  }

  module.exports = {
      list: asyncErrorBoundary(list),
      read: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(read)],
      update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
      delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  }