const express = require("express");
const path = require("path")

const app = express();

// routes
app.get("/notes", (req, res) => {
    // res.send("Hi!")
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})



app.listen(3001, () => {
    console.log("Server is now running!")
})