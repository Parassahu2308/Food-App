const express = require("express");
const reviewRouter = express.Router();
const {
  getAllReviews,
  getPlanReviews,
  getTop3Reviews,
  createReview,
  updateReview,
  deleteReview,
} = require("../controller/reviewController");
const { protectedRoute } = require("../helper");

//get All reviews
reviewRouter.route("/all").get(getAllReviews);

//get top 3 reviews
reviewRouter.route("/top3").get(getTop3Reviews);

// get plan review
reviewRouter.route("/:id").get(getPlanReviews);

// Create and post a review Update and delete review
reviewRouter.use(protectedRoute);
reviewRouter
  .route("/crud:/plan")
  .post(createReview)
  .patch(updateReview)
  .delete(deleteReview);
