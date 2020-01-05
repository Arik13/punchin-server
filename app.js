const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const jwt = require("jsonwebtoken");
// const mongoConnect = require("./util/database").mongoConnect;
const mongoose = require('mongoose');

// Middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log("Request: ", req.body);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

// Routes
const jobRoutes = require("./routes/Job");
const employeeRoutes = require("./routes/Employee");
const userRoutes = require("./routes/User");

app.use(jobRoutes);
app.use(employeeRoutes);
app.use(userRoutes);

// // Connect to db and launch server
// mongoConnect(() => {
//     app.listen(3000);
//     console.log("Server listening on port 3000");
// });


mongoose
    .connect("mongodb+srv://arik:sjEni561gT5JG4np@cluster0-lw22l.mongodb.net/punchin?retryWrites=true&w=majority")
    .then(result => {
        app.listen(3000);
        console.log("Connected to mongodb");
        console.log("Listening on port 3000");
    })
    .catch(err => {
        console.log(err);
    });
