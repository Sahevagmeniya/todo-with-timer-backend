import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  todoList: {
    type: String,
    required: true,
  },
  totalSeconds: {
    type: Number,
    default: 0,
  },
  startTime: {
    type: Number,
  },
  isRunning: {
    type: Boolean,
    default: false,
  },
  timerLight: {
    type: String,
    default: "green",
  },
});

const todoModel = mongoose.model("todo", todoSchema);

export default todoModel;
