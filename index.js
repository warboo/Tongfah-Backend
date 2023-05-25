const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.qfg2h5o.mongodb.net/?retryWrites=true&w=majority`;

main()
    .then(() => console.log("Successfully connected to the database!"))
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect(uri);
}

