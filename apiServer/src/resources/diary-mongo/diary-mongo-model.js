const mongoose = require("mongoose");

const diarySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 100,
      required: true,
      immutable: false,
    },
  },
  { timestamps: true }
);

const Diary = mongoose.model("Diary", diarySchema);

module.exports = Diary;
