import { createSlice } from '@reduxjs/toolkit'
import { getAuth } from 'firebase/auth'


const initialState = {
  value: null,
}

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    chattinguser: (state , action) => {
        state.value = action.payload
     
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { chattinguser } = chatSlice.actions

export default chatSlice.reducer