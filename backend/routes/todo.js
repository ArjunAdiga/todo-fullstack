const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");
const auth = require("./auth");

router.post("/", auth, async (req, res) => {
  try {
    const { text } = req.body;
    console.log(text)
    if (!text) return res.status(400).send({ message: "Text is required" });

    const todo = new Todo({ text, userId: req.user._id });
    await todo.save();
    res.status(201).send(todo);
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user._id });
    res.send(todos);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
      const updates = req.body; // this may contain text, isComplete, or both

    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { $set: updates }, // only update fields that exist in body
      { new: true }
    );
    if (!todo) return res.status(404).send("Todo not found");
    res.send(todo);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!todo) return res.status(404).send("Todo not found");
    res.send({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
