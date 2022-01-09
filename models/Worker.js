const mongoose = require("mongoose");

const WorkerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 2,
    },
  },
  { timestamps: true }
);

const Worker = mongoose.model("Worker", WorkerSchema);

module.exports = Worker;
