import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";
const initialState = JSON.parse(localStorage.getItem("tasks")) || [];

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = action.payload;
      state?.push({
        ...newTask,
        id: uuid(),
        stage: 0,
      });
      localStorage.setItem("tasks", JSON.stringify(state));
    },

    dragState: (state, action) => {
      const { dragId, destination } = action.payload;
      const updatedList = state.map((task) => {
        if (task.id === dragId) {
          task.stage = destination;
        }
        return task;
      });
      state = updatedList;
      localStorage.setItem("tasks", JSON.stringify(state));
    },

    deleteTask: (state, action) => {
      localStorage.setItem(
        "tasks",
        JSON.stringify(state.filter((task) => task.id !== action.payload))
      );
      return state.filter((task) => task.id !== action.payload);
    },

    moveRight: (state, action) => {
      const updatedList = state.map((task) => {
        if (task.id === action.payload) {
          task.stage += 1;
        }
        return task;
      });
      state = updatedList;
      localStorage.setItem("tasks", JSON.stringify(state));
    },

    moveLeft: (state, action) => {
      const updatedList = state.map((task) => {
        if (task.id === action.payload) {
          task.stage -= 1;
        }
        return task;
      });
      state = updatedList;
      localStorage.setItem("tasks", JSON.stringify(state));
    },

    editTaskName: (state, action) => {
      const { taskName, id, dueDate, priority } = action.payload;

      const updatedList = state.map((task) => {
        if (task.id === id) {
          task.taskName = taskName;
          task.dueDate = dueDate;
          task.priority = priority;
        }
        return task;
      });
      state = updatedList;
      localStorage.setItem("tasks", JSON.stringify(state));
    },
  },
});

export const {
  addTask,
  dragState,
  deleteTask,
  moveRight,
  moveLeft,
  editTaskName,
} = todoSlice.actions;
export default todoSlice.reducer;
