import { createSlice } from '@reduxjs/toolkit'


// Define the initial state using that type
const initialState = {
  value: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state,action) => {
      state.value = action.payload
    },
    resetToken: (state) => {
        state.value =''
    },
    
  },
})

export const { setToken,resetToken } = authSlice.actions

