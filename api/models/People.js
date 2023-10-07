const mongoose = require("mongoose");

const peopleSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, //mongodb will check if it's exist or not
      minLength: 4,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const People = mongoose.model("People", peopleSchema);

module.exports = People;
