require("dotenv").config({ path: "ENV_FILENAME" });
const mongoose = require("mongoose");

// Connect to database
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost/travel-log", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB connected");
    } catch (error) {
        console.error("Error: ", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
