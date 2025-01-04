require("dotenv").config();
const express = require("express");
const app = express();
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello There");
});

app.post("/todo", async (req, res) => {
  const parsedData = createTodo.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(401).json({
      msg: "You sent the wrong inputs",
    });
  }

  await todo
    .create({
      title: parsedData.title,
      description: parsedData.description,
      completde: false,
    })
    .save();

  res.json({
    msg: "Todo create successfully",
  });
});

app.get("/todos", async (req, res) => {
  const todos = todo.find({});
  console.log(todos);
  res.status(200).json({ todos });
});

app.put("/completed", async (req, res) => {
  const parsedData = updateTodo.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(401).json({
      msg: "You sent the wrong inputs",
    });
  }

  await todo.update(
    {
      _id: req.body.id,
    },
    {
      completed: true,
    },
  );

  res.status(200).json({
    msg: "Todo marked as completed",
  });
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Internal server error");
});

app.listen("8080", () => {
  console.log("server running at port 8080");
});
