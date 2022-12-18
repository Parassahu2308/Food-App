const mongoose = require("mongoose");
const { db_Link } = require("../secret");

mongoose
  .connect(db_Link)
  .then(function (db) {
    console.log("review db is connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const reviewSchema = mongoose.Schema({
  review: {
    type: String,
    require: [true, "review is required"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    require: [true, "rating is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "userModel",
    require: [true, "Review must belong to a user"],
  },
  plan: {
    type: mongoose.Schema.ObjectId,
    ref: "planModel",
    require: [true, "Plan must belong to a user"],
  },
});

//this function called if any function called started by find name, like findOne, findById, findOneAndDelete
reviewSchema.pre(/^find/, function () {
  this.populate({
    path: "user",
    select: "name profileImage",
  }).populate("plan");
  next();
});

const reviewModel = mongoose.model("reviewModel", reviewSchema);
module.exports = reviewModel;
