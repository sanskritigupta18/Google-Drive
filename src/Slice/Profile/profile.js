import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  loading: false,
  token: localStorage.getItem("accessToken")
    ? JSON.parse(localStorage.getItem("accessToken"))
    : null,
  dashboard: [],
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUser(state, value) {
      state.user = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
    setDashboard(state,value)
    {
      state.dashboard = value.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  setUser,
  setLoading,
  setToken,
  setDashboard,
} = profileSlice.actions;

export default profileSlice.reducer;