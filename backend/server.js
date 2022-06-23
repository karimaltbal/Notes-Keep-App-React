const express = require("express");
const notes= require("./data/notes");
const dotenv = require("dotenv")

const app = express();
dotenv.config()

app.get("/", (req, res)=>{
    console.log("Hallo to new project")
    res.send("wolcame")
})


app.get("/api/notes", (req, res) => {
    res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
    const note = notes.find((n)=> n._id == req.params.id);
    res.json(note)
});


const PORT = process.env.PORT || 5000

app.listen(5000, ()=>{
    console.log(`wolcame to my server${PORT}`);
})