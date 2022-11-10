if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const mongoose = require("mongoose");
// require('dotenv').config(); -- maby delete

const dbUrl = process.env.DB_URL;

const dbConnect = async () => {

  mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("Successfully connected to MongoDB Atlas!");
  });
    
}

module.exports = dbConnect;