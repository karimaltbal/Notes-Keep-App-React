const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");


const dbCoonect = require("./config/dbConnect");
dbCoonect();

const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/notesRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const path = require("path");
const app = express();
dotenv.config()


app.use(cors());
app.use(express.json())
app.use("/api/users", userRouter);
app.use("/api/notes", noteRouter);

// --------------------------deployment------------------------------
var __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// --------------------------deployment------------------------------

app.use(notFound);
app.use(errorHandler);




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