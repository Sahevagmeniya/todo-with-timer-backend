import todoModel from "../model/todo.model.js";

export const createTodo = async (req, res) => {
  try {
    const { todoList } = req.body;

    await todoModel.create({ todoList });
    return res.status(201).json("Created successfully.");
  } catch (error) {
    console.log("Creating todo error.", error);
    return res.status(400).json("Internal server error");
  }
};

export const allTodos = async (req, res) => {
  try {
    const todos = await todoModel.find();
    if (!todos) return res.status(404).json([]);

    const todoWithTimers = todos.map((todo) => {
      let seconds = Math.floor(todo.totalSeconds / 1000);
      if (todo.isRunning) {
        seconds += Math.floor((Date.now() - todo.startTime) / 1000);
      }

      return {
        ...todo.toObject(),
        seconds,
      };
    });

    return res.status(200).json(todoWithTimers);
  } catch (error) {
    console.log("fetching all todos error.", error);
    return res.status(400).json("Internal server error");
  }
};

export const startTimer = async (req, res) => {
  try {
    const id = req.params.id;

    const todo = await todoModel.findById(id);

    todo.startTime = Date.now();
    todo.isRunning = true;
    todo.timerLight = "yellow";

    await todo.save();

    return res.status(200).json("Timer started successfully.");
  } catch (error) {
    console.log("Starting timer error.", error);
    return res.status(400).json("Internal server error");
  }
};

export const pauseTimer = async (req, res) => {
  try {
    const id = req.params.id;

    const todo = await todoModel.findById(id);

    const timeSpened = Date.now() - todo.startTime;

    todo.totalSeconds += timeSpened;
    todo.startTime = 0;
    todo.isRunning = false;
    todo.timerLight = "red";

    await todo.save();

    return res.status(200).json("Timer paused successfully.");
  } catch (error) {
    console.log("Starting timer error.", error);
    return res.status(400).json("Internal server error");
  }
};

export const resetTimer = async (req, res) => {
  try {
    const id = req.params.id;

    const todo = await todoModel.findById(id);

    todo.totalSeconds = 0;
    todo.startTime = null;
    todo.isRunning = false;
    todo.timerLight = "green";

    await todo.save();

    return res.status(200).json("Reset timer successfully.");
  } catch (error) {
    console.log("Starting timer error.", error);
    return res.status(400).json("Internal server error");
  }
};

export const getTodoById = async (req, res) => {
  try {
    const id = req.params.id;

    const todo = await todoModel.findById(id);

    return res.status(200).json(todo);
  } catch (error) {
    console.log("fetching todo error.", error);
    return res.status(400).json("Internal server error");
  }
};

export const editTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const { todoList } = req.body;

    await todoModel.findByIdAndUpdate(id, { todoList });

    return res.status(200).json("Updated successfully.");
  } catch (error) {
    console.log("fetching todo error.", error);
    return res.status(400).json("Internal server error");
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;

    const todo = await todoModel.findByIdAndDelete(id);

    return res.status(200).json("Deleted successfully.");
  } catch (error) {
    console.log("deleting todo error.", error);
    return res.status(400).json("Internal server error");
  }
};

export const clearTodos = async (req, res) => {
  try {
    await todoModel.deleteMany({ timerLight: "red" });

    return res.status(200).json("Deleted completed tasks.");
  } catch (error) {
    console.log("deleting todo error.", error);
    return res.status(400).json("Internal server error");
  }
};
