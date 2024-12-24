
import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './slices/counterSlice'
import cardSlice from './slices/cardSlice'
export const store = configureStore({
  reducer: {
  },
})