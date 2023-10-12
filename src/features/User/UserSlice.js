import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  regUsers: JSON.parse(localStorage.getItem("users")),
  isSuccess: false,
  isError: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signupUser: (state, action) => {
      const newUser = action.payload;
      const findUser = state.regUsers?.[newUser.email];

      if (findUser) {
        state.isError = true;
        state.isSuccess = false;
      } else {
        localStorage.setItem(
          "users",
          JSON.stringify({
            ...JSON.parse(localStorage.getItem("users")),
            [newUser.email]: newUser,
          })
        );
        state.regUsers = JSON.parse(localStorage.getItem("users"));
        state.isSuccess = true;
        state.isError = false;
      }
    },
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
    },
  },
});

export const { signupUser, clearState } = userSlice.actions;
export default userSlice.reducer;
