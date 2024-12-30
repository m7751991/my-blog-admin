import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: { username: string; id: string } | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: { username: string; id: string } }>) {
      console.log(action.payload, "action.payload");
      state.user = action.payload.user;
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("authorization");
      window.location.href = "/login";
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
