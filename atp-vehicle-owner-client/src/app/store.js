import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';

import loginFormDataReducer from './loginFormDataSlice';
import registerFormDataReducer from './registerFormDataSlice';
import sessionReducer from './sessionSlice';
import settingsFormDataReducer from './settingsFormDataSlice';

export default configureStore({
  reducer: {
    loginFormData: loginFormDataReducer,
    registerFormData: registerFormDataReducer,
    session: sessionReducer,
    settingsFormData: settingsFormDataReducer,
  },
  middleware: [...getDefaultMiddleware(), logger]
});
