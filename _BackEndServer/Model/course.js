const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  authorName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tutor",
    // default: null,
  },
  price: {
    type: Number,
    // required: true,
  },
  //   thumbnail: {
  //     type: String,
  //     required: true,
  //   },
  description: {
    type: String,
    // required: true,
  },
  category: {
    type: String,
    // required: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  discount: {
    type: Number,
    default: 0,
  },
  total_subscriptions: {
    type: Number,
    default: 0,
  },
  course_duration: {
    type: Number,
    // required: true,
  },
  level: {
    type: String,
    // required: true,
  },
  reviews: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "students",
  },
});

module.exports = mongoose.model("course", courseSchema);
