const express = require("express");
const noteRouter = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  fatchNotes,
  createNotes,
  fatchNotebyid,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");



noteRouter.get("/", authMiddleware, fatchNotes);
noteRouter.get("/:id", fatchNotebyid);
noteRouter.post("/", authMiddleware, createNotes);
noteRouter.put("/:id", authMiddleware, updateNote);
noteRouter.delete("/:id", authMiddleware, deleteNote);

module.exports = noteRouter;