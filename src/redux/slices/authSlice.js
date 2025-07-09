import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  serverInfo: null,
  credentials: null, // { username, password, host }
  status: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user_info, server_info } = action.payload.data;
      const { username, password, host } = action.payload.credentials;
      state.userInfo = user_info;
      state.serverInfo = server_info;
      state.credentials = { username, password, host };
      state.status = 'succeeded';
    },
    logOut: (state) => {
      state.userInfo = null;
      state.serverInfo = null;
      state.credentials = null;
      state.status = 'idle';
      // Limpa o localStorage ao deslogar
      localStorage.removeItem('authState');
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

// Selectors
export const selectIsAuthenticated = (state) => !!state.auth.userInfo;
export const selectAuthCredentials = (state) => state.auth.credentials;