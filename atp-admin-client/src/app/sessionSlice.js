import { createSlice } from '@reduxjs/toolkit';

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    isLoggedIn: false,
    user: null
  },
  reducers: {
    isLoggedInUpdated: (state, action) => {
      state.isLoggedIn = action.payload
    },
    userUpdated: (state, action) => {
      state.user = action.payload
    },
  }
})

export const {
  isLoggedInUpdated,
  userUpdated,
} = sessionSlice.actions

export default sessionSlice.reducer
