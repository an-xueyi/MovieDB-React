import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  sessionId: localStorage.getItem("session_id") || null,
  accountId: localStorage.getItem("account_id") || null,
  username: localStorage.getItem("username") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.sessionId = action.payload.sessionId;
      state.accountId = action.payload.accountId;
      state.username = action.payload.username;

      localStorage.setItem("session_id", action.payload.sessionId);
      localStorage.setItem("account_id", action.payload.accountId);
      localStorage.setItem("username", action.payload.username);
    },
    logout(state) {
      state.sessionId = null;
      state.accountId = null;
      state.username = null;

      localStorage.removeItem("session_id");
      localStorage.removeItem("account_id");
      localStorage.removeItem("username");
    },
  },
});

export const { login, logout } = authSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;
