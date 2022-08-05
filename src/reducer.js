import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    alertMessage: "",
    alertTheme: "",
    confirmMessage: ""
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    unsetUser: (state) => {
      state.user = null
    },
    setAlertMessage: (state, action) => {
      state.alertMessage = action.payload.alertMessage
      state.alertTheme = action.payload.alertTheme
    },
    unsetAlertMessage: (state) => {
      state.alertMessage = "";
    },
    setConfirmMessage: (state, action) => {
      state.confirmMessage = action.payload.confirmMessage
      state.confirmFunction = action.payload.confirmFunction
    },
    unsetConfirmMessage: state => {
      state.confirmMessage = "";
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
  setUser, 
  unsetUser,
  setAlertMessage, 
  unsetAlertMessage,
  setConfirmMessage,
  unsetConfirmMessage
} = userSlice.actions

export default userSlice.reducer