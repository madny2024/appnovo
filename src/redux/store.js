import { configureStore } from '@reduxjs/toolkit';
import { xtreamApi } from './api/xtreamApi';
import authReducer from './slices/authSlice';
import contentReducer from './slices/contentSlice';
// As linhas de 'localStorage' foram removidas para o teste.
// import { loadState, saveState } from '../utils/localStorage';

// A linha 'preloadedState' foi removida para o teste.
// const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    [xtreamApi.reducerPath]: xtreamApi.reducer,
    auth: authReducer,
    content: contentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(xtreamApi.middleware),
  // A chave 'preloadedState' foi removida para o teste.
  // preloadedState: { auth: preloadedState },
});

// A função 'subscribe' foi removida para o teste.
// store.subscribe(() => {
//   saveState(store.getState().auth);
// });
