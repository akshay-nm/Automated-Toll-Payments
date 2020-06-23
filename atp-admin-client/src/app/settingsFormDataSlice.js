import { createSlice } from '@reduxjs/toolkit'

const settingsFormDataSlice = createSlice({
  name: 'settingsFormData',
  initialState: {
    name: {
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
    }
  },
  reducers: {
    nameUpdated: (state, action) => {
      state.name = action.payload
    },
    passwordUpdated: (state, action) => {
      state.password = action.payload
    },
    confirmPasswordUpdated: (state, action) => {
      state.confirmPassword = action.payload
    },
  }
})

export const {
  nameUpdated,
  passwordUpdated,
  confirmPasswordUpdated,
} = settingsFormDataSlice.actions

export const nameChanged = value => (dispatch, getState) => {
  dispatch(nameUpdated({
    value,
    isValid: value !== '' && value !== getState().session.user.name,
    wasValidated: true
  }))
}

export const passwordChanged = value => (dispatch) => {
  dispatch(passwordUpdated({
    value,
    isValid: value !== '',
    wasValidated: true
  }))
}

export const confirmPasswordChanged = value => (dispatch, getState) => {
  dispatch(confirmPasswordUpdated({
    value,
    isValid: value !== '' && value === getState().settingsFormData.password.value,
    wasValidated: true
  }))
}



export default settingsFormDataSlice.reducer