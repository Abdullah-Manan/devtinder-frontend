import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: false,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserInfoLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    loginUser: (state, action) => {
      state.isLoggedIn = true;
      state.isLoading = false;
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.isLoading = false;
      state.user = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const {
  setUser,
  setUserInfoLoading,
  loginUser,
  logoutUser,
  setIsLoggedIn,
  setLoading,
} = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectUserId = (state) => state.auth.user?.userId;
export const selectUserRole = (state) => state.auth.user?.role;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsLoading = (state) => state.auth.isLoading;

export default authSlice.reducer;
