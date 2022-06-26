const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();


const dbCoonect = require("./config/dbConnect");
dbCoonect();

const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/notesRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();


app.use(cors());
app.use(express.json())
app.use("/api/users", userRouter);
app.use("/api/notes", noteRouter);


app.use(notFound);
app.use(errorHandler);




app.get("/", (req, res)=>{
    console.log("Hallo to new project")
    res.send("wolcame")
})

/*
app.get("/api/notes", (req, res) => {
    res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
    const note = notes.find((n)=> n._id == req.params.id);
    res.json(note)
});
*/

const PORT = process.env.PORT || 5000

app.listen(5000, ()=>{
    console.log(`wolcame to my server${PORT}`);
})