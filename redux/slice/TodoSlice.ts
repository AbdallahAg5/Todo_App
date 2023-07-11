import {createSlice} from '@reduxjs/toolkit'


type InitialStateType = {
    tasks: string[]
}

const InitialState : InitialStateType = {
         tasks:['tftftf','ughuygy']
    }

const TodoSlice =  createSlice({
      name : 'TodoSlice',
      initialState:InitialState,
      reducers:{},
      extraReducers:{}
})   


export default TodoSlice.reducer