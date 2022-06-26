const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");


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



const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
  res.json("server start");
});

app.listen(5000, ()=>{
    console.log(`wolcame to my server${PORT}`);
})