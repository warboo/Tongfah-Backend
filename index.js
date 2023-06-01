const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const postRoutes = require("./routes/postRoutes");

const app = express();

app.use(express.json());

const corsOptions = {
  origin: true,
};

app.use(cors(corsOptions));

app.use("/posts", postRoutes);

main()
    .then(() => console.log("Successfully connected to the database!"))
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL + process.env.DB_NAME);
}

app.listen(3000, () => {
    console.log("Server started at 3000.");
});

