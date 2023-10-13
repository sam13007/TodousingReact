import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../features/User/UserSlice";
import TodoSlice from "../features/Todos/TodoSlice";

export const store = configureStore({
  reducer: {
    users: UserSlice,
    todos: TodoSlice,
  },
});
