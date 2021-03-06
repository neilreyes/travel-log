// Dependencies
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

// Required local libraries
const middlewares = require("./middlewares");
const logs = require("./api/logs");
const connectDB = require("./config/database");

// Initiate app
const app = express();

// Connect to database
connectDB();

// Middlewares
/* app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
}); */
app.use(morgan("common"));
app.use(helmet());

// app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Hello World!",
    });
});

app.use("/api/logs", logs);

// Error handling middleware
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
