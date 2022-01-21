// Depends.
// ===========================================================
var express = require("express");


// set up the express app.
// ===========================================================
var app = express();
var PORT = process.env.PORT || 3000;


//  runs express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


require('./routes/htmlRoute')(app);
require("./routes/apiRoute")(app);
