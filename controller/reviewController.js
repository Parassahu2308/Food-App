const planModel = require("../models/planModel");
const reviewModel = require("../models/reviewModel");

module.exports.getAllReviews = async function (req, res) {
  try {
    const reviews = await reviewModel.find();
    if (reviews) {
      return res.json({
        msg: "Reviews are retrieved",
        reviews,
      });
    } else {
      return res.json({
        msg: "reviews not found",
      });
    }
  } catch (err) {
    res.json({
      msg: err.message,
    });
  }
};

module.exports.getTop3Reviews = async function (req, res) {
  try {
    const top3Reviews = await reviewModel.find().sort({ rating: -1 }).limit(3);
    if (top3Reviews) {
      return res.json({
        msg: "top3Reviews are retrieved",
        top3Reviews,
      });
    } else {
      return res.json({
        msg: "top3Reviews not found",
      });
    }
  } catch (err) {
    res.json({
      msg: err.message,
    });
  }
};

module.exports.getPlanReviews = async function (req, res) {
  try {
    const planId = req.params.id;
    const planReviews = await reviewModel.find();
    planReviews = planReviews.filter((review) => review.plan["_id"] == planId);
    if (planReviews) {
      return res.json({
        msg: "planReviews are retrieved",
        planReviews,
      });
    } else {
      return res.json({
        msg: "planReviews not found",
      });
    }
  } catch (err) {
    res.json({
      msg: err.message,
    });
  }
};

module.exports.createReview = async function (req, res) {
  try {
    const planId = req.params.plan;
    const plan = await planModel.findById(planId);
    const review = req.body;
    const postReview = await reviewModel.create(review);
    plan.averageRating =
      (plan.averageRating * plan.nor + req.body.rating) / (plan.nor + 1);
    await plan.save();
    await postReview.save();
    if (postReview) {
      return res.json({
        msg: "Reviews are posted",
        postReview,
      });
    }
  } catch (err) {
    res.json.status(500)({
      msg: err.message,
    });
  }
};

module.exports.updateReview = async function (req, res) {
  try {
    const planId = req.params.plan;
    let id = req.body.id; // which review updated
    let dataToBeUpdated = req.body;
    let keys = [];
    for (let key in dataToBeUpdated) {
      if (key == id) continue;
      keys.push(key);
    }
    // keys.includes("rating")
    // if rating should be updated
    // const plan = await planModel.findById(planId);
    // plan.averageRating =
    //   (plan.averageRating * plan.nor + req.body.rating) / (plan.nor + 1);
    let review = await reviewModel.findById(id);
    for (let i = 0; i < keys.length; i++) {
      review[keys[i]] = dataToBeUpdated[keys[i]];
    }
    await review.save();
    return res.json({
      msg: "Reviews are updated",
      review,
    });
  } catch (err) {
    res.json({
      msg: err.message,
    });
  }
};

module.exports.deleteReview = async function (req, res) {
  try {
    let planId = req.params.plan;
    let id = req.body.id;
    //change average rating
    let review = await reviewModel.findByIdAndDelete(id);
    return res.json({
      msg: "Review deleted",
      review,
    });
  } catch (err) {
    res.json({
      msg: err.message,
    });
  }
};
