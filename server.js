const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const connenctDB = require("./database/db");
const authRoutes = require("./routes/auth");
const path = require("path");

//middleware
app.use(express.static("public"));
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/auth", authRoutes);

connenctDB();

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
