import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  serverInfo: null,
  credentials: null,
  status: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      // Extração segura dos dados do payload da ação
      const responseData = action.payload.data || {};
      const loginCredentials = action.payload.credentials || {};

      const userInfo = responseData.user_info;
      const serverInfo = responseData.server_info;
      
      // Verificação de segurança: só atualiza o estado se os dados essenciais existirem
      if (userInfo && serverInfo && loginCredentials.host) {
        state.userInfo = userInfo;
        state.serverInfo = serverInfo;
        state.credentials = loginCredentials;
        state.status = 'succeeded';
      } else {
        // Se os dados estiverem incompletos, não quebra o app, apenas registra um erro.
        state.status = 'failed';
        console.error("Falha ao processar credenciais: dados da API incompletos ou inválidos.", action.payload);
      }
    },
    logOut: (state) => {
      state.userInfo = null;
      state.serverInfo = null;
      state.credentials = null;
      state.status = 'idle';
      localStorage.removeItem('authState');
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

// Selectors
export const selectIsAuthenticated = (state) => !!state.auth.userInfo;
export const selectAuthCredentials = (state) => state.auth.credentials;
