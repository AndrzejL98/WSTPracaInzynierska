const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    datevisit: {
      type: String,
      required: true,
    },
    worker: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
