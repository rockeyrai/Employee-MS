'use client'
import { changeBackgroundColor, incrementHeight, incrementWidth } from '@/lib/redux/slices/cardSlice'
import { decrement, increment } from '@/lib/redux/slices/counterSlice'
import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
const ReduxTest = () => {
  const {width, height, backgroundColor} = useSelector(state=>state.card)
  const dispatch = useDispatch()
    
  return (
    <div>
        <div style={{
            backgroundColor,
            width,
            height
        }}>
        </div>
  
        <button onClick={()=>dispatch(incrementWidth())}>Increment width</button>
        <button onClick={()=>dispatch(incrementHeight())}>Decrement height</button>
        <input onChange={(e)=>dispatch(changeBackgroundColor(e.target.value))}/>
    </div>
  )
}
export default ReduxTest