import { data } from '@/app/data/data';
import { dataType } from '@/types/types';
import {createSlice , PayloadAction } from '@reduxjs/toolkit'


type InitialStateType = {
    tasks: {}[]
}


const InitialState : InitialStateType  = {
         tasks : data
    }

const TodoSlice =  createSlice({
      name : 'TodoSlice',
      initialState:InitialState,
      reducers:{
        addTask: (state, { payload }: PayloadAction<{}>) => {
             state.tasks.push({id:state.tasks.length+1,...payload});
          },
          deleteTask: (state, action: PayloadAction<{ id: number }>) => {
            state.tasks = state.tasks.filter((task : any) => task.id !== action.payload.id);
          },
      },
      extraReducers:{}
})   


export const { addTask , deleteTask } = TodoSlice.actions
export default TodoSlice.reducer