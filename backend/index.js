import express from "express";

import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";

const app = express();

app.use("/posts", postRoutes);

app.use(express.json({ limit: "30 mb", extended: true }));
app.use(express.urlencoded({ limit: "30 mb", extended: true }));
app.use(cors());

const CONNECTION_URL =
    "mongodb+srv://Pracainzynierska:Pracainzynierska123@cluster0.ctvdw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
    .connect(CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
    )
    .catch((error) => {
        error.message;
    });