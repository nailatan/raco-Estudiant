const mongoose = require("mongoose");

Schema = mongoose.Schema;

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: [100, "Name is too long"],
      required: [true, "Name is required"],
      unique: true,
      immutable: false,
    },
    description: {
      type: String,
      maxlength: [100, "Name is too long"],
      required: [true, "Name is required"],
      immutable: false,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    idDiary: { type: Schema.Types.ObjectId, ref: "Diary" },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
