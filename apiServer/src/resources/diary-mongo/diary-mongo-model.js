const mongoose = require("mongoose");

const diarySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: [100, "Name is too long"],
      required: [true, "Name is required"],
      unique: true,
      immutable: false,
    },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  },
  { timestamps: true }
);

const Diary = mongoose.model("Diary", diarySchema);

module.exports = Diary;
