import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';

import loginFormDataReducer from './loginFormDataSlice';

export default configureStore({
  reducer: {
    loginFormData: loginFormDataReducer,
  },
  middleware: [...getDefaultMiddleware(), logger]
});
