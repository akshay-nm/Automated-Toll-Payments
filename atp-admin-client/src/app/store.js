import { configureStore } from '@reduxjs/toolkit';
import loginFormDataReducer from './loginFormDataSlice';

export default configureStore({
  reducer: {
    loginFormData: loginFormDataReducer,
  },
});
