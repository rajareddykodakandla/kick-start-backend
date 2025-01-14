require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");

app.use(express.json());
app.use(cors({}));

app.get("/", (req, res) => {
  res.send("Hello There");
});

app.post("/createTodo", async (req, res) => {
  console.log("body", req.body);
  const parsedData = createTodo.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(401).json({
      msg: "You sent the wrong inputs",
    });
  }

  const savedData = await todo.create({
    title: parsedData.data.title,
    description: parsedData.data.description,
    completed: false,
  });

  res.json({
    msg: "Todo create successfully",
    todo: savedData,
  });
});

app.get("/todos", async (req, res) => {
  const todos = await todo.find({});
  console.log(todos);
  res.status(200).json({ todos });
});

app.put("/completed", async (req, res) => {
  console.log("req.body", req.body);
  const parsedData = updateTodo.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(401).json({
      msg: "You sent the wrong inputs",
    });
  }

  const updatedTodo = await todo.updateOne(
    {
      _id: parsedData.data.id,
    },
    {
      completed: true,
    },
  );

  res.status(200).json({
    msg: "Todo marked as completed",
    todo: updatedTodo,
  });
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Internal server error");
});

app.listen("8080", () => {
  console.log("server running at port 8080");
});
