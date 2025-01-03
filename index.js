const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello There");
});

app.post("/todo", (req, res) => { });

app.get("/todos", (req, res) => { });

app.put("/completed", (req, res) => { });

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Internal server error");
});

app.listen("8080", () => {
  console.log("server running at port 8080");
});
