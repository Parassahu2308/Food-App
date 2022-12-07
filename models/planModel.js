const mongoose = require("mongoose");
const { db_link } = require("../secret");
const { v4, uuidv4 } = require("uuid");

mongoose
  .connect(db_link)
  .then(function (db) {
    console.log(" plan db is connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const planSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: [true, `plan name exist`],
    maxLength: [20, `plan name should not exceed 20 characters`],
  },
  duration: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: [true, `price not entered`],
  },
  discount: {
    type: Number,
    validate: [
      function () {
        return this.discount < 100;
      },
      `discount cannot be 100%`,
    ],
  },
  averageRating: {
    type: Number,
  },
});

const planModel = mongoose.model("planModel", planSchema);
module.exports = planModel;

// (async function createPlan() {
//   let plan = [
//     {
//       name: "SuperChineseFood",
//       price: 10000,
//       discount: 10,
//       averageRating: 4,
//       duration: 5,
//     },
//     {
//       name: "ChineseFood",
//       price: 10000,
//       discount: 10,
//       averageRating: 5,
//       duration: 5,
//     },
//     {
//       name: "SaladFood",
//       price: 10000,
//       discount: 10,
//       averageRating: 2,
//       duration: 5,
//     },
//     {
//       name: "SouthFood",
//       price: 10000,
//       discount: 10,
//       averageRating: 5,
//       duration: 5,
//     },
//   ];
//   let data = await planModel.create(plan);
//   console.log(data);
// })();
