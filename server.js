const express = require("express");
const app = express();
var path = require("path");

app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/welcome.html"));
});

app.get("/exercise-menu", function(req, res) {
    res.sendFile(path.join(__dirname + "/exercise-menu.html"));
});

app.get("/exercise1", function(req, res) {
    res.sendFile(path.join(__dirname + "/exercise1.html"));
});

app.listen(8080, () => console.log("Listening on port 8080!"));
