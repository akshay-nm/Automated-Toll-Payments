import { createSlice } from '@reduxjs/toolkit';

const registerFormDataSlice = createSlice({
  name: 'registerFormData',
  initialState: {
    name: {
      value: '',
      isValid: false,
      wasValidated: false
    },
    email: {
      value: '',
      isValid: false,
      wasValidated: false
    },
    password: {
      value: '',
      isValid: false,
      wasValidated: false
    },
    confirmPassword: {
      value: '',
      isValid: false,
      wasValidated: false
    },
    error: ''
  },
  reducers: {
    nameUpdated: (state, action) => {
      state.name = action.payload
    },
    emailUpdated: (state, action) => {
      state.email = action.payload
    },
    passwordUpdated: (state, action) => {
      state.password = action.payload
    },
    confirmPasswordUpdated: (state, action) => {
      state.confirmPassword = action.payload
    },
    errorUpdated: (state, action) => {
      state.error = action.payload
    }
  }
})

export const {
  nameUpdated,
  emailUpdated,
  passwordUpdated,
  confirmPasswordUpdated,
  errorUpdated,
} = registerFormDataSlice.actions

export const nameChanged = value => dispatch => {
  dispatch(nameUpdated({
    value,
    isValid: value.length > 0,
    wasValidated: true
  }))
}

export const emailChanged = value => dispatch => {
  dispatch(emailUpdated({
    value,
    isValid: value.length > 0,
    wasValidated: true
  }))
}

export const passwordChanged = value => dispatch => {
  dispatch(passwordUpdated({
    value,
    isValid: value.length > 0,
    wasValidated: true
  }))
}

export const confirmPasswordChanged = value => dispatch => {
  dispatch(confirmPasswordUpdated({
    value,
    isValid: value.length > 0,
    wasValidated: true
  }))
}

export default registerFormDataSlice.reducer
