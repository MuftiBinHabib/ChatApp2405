import { configureStore } from '@reduxjs/toolkit'
import  userSlice  from './slices/userSlices'
import  chatSlice  from './slices/chatSlice'

export const store = configureStore({
  reducer: {
    userLogin : userSlice,
    chatInfo: chatSlice
  },
})