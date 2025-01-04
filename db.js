const mongoose = require("mongoose");

(async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL);
    if (connection.connection.readyState) {
      console.log("Connected successfully");
    }
  } catch (err) {
    console.log("Error connecting to mongodb", err);
  }
})();

const todoSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const todo = mongoose.model("todo", todoSchema);

module.exports = {
  todo,
};
