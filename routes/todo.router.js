import express from "express";
import {
  allTodos,
  clearTodos,
  createTodo,
  deleteTodo,
  editTodo,
  getTodoById,
  pauseTimer,
  resetTimer,
  startTimer,
} from "../controller/todo.js";

const router = express.Router();

// Create todo
router.route("/create").post(createTodo);

// get all todos
router.route("/all").get(allTodos);

// start todo timer
router.route("/startTimer/:id").post(startTimer);

// pause todo timer
router.route("/pauseTimer/:id").post(pauseTimer);

// reset todo timer
router.route("/resetTimer/:id").post(resetTimer);

// edit todo list
router.route("/edit/:id").post(editTodo).get(getTodoById);

// delete all completed todo
router.route("/clearTodos").post(clearTodos);

// delete todo by id
router.route("/:id").post(deleteTodo);


export default router;
