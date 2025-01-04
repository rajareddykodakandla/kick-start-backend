const express = require("express");
const app = express();
const { createTodo, updateTodo } = require("./types");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello There");
});

app.post("/todo", (req, res) => {
  const parsedData = createTodo.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(401).json({
      msg: "You sent the wrong inputs",
    });
  }
});

app.get("/todos", (req, res) => { });

app.put("/completed", (req, res) => {
  const parsedData = updateTodo.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(401).json({
      msg: "You sent the wrong inputs",
    });
  }
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Internal server error");
});

app.listen("8080", () => {
  console.log("server running at port 8080");
});
