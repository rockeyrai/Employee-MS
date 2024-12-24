'use client'
import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  backgroundColor: 'blue',
  width: 120,
  height: 120
}
export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    incrementWidth: (state) => {
        state.width = state.width +  10
    },
    incrementHeight: (state) => {
        state.height = state.height +  10
    },
    changeBackgroundColor: (state, action) => {
     state.backgroundColor = action.payload
    },
  },
})
export const { incrementWidth, incrementHeight, changeBackgroundColor } = cardSlice.actions
export default cardSlice.reducer