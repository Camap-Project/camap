//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const mongoose = require("mongoose");
mongoose
    .connect(
        "mongodb+srv://camapData:kimyang@cluster0.dcygt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        }
    )
    .then(() => console.log("MongoDB connected..."))
    .catch((error) => console.log(error));

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    res.send("great");
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000.");
});
