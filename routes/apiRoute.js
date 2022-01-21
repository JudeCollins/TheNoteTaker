const fs = require("fs")
const database = require("../db/db.json")

// creating the delete id
let id = database.length + 1

module.exports = function (app) {

    // creating api Routes
    app.get("/api/notes", function (req, res) {
        res.json(database)
    })
    // create post for our api
    app.post("/api/notes", function (req, res) {
        req.body.id = id++;
       
        database.push(req.body)
        fs.writeFile("./db/db.json", JSON.stringify(database), function (err) {
            if (err) throw err
        })
        res.json(database)

    })