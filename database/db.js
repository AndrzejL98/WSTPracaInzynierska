const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI ||
        "mongodb+srv://legobarber:legobarber123@cluster0.ctvdw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Baza danych połączona");
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
