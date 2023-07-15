import { data } from '@/app/data/data';
import { dataType, valType } from '@/types/types';
import {createSlice , PayloadAction } from '@reduxjs/toolkit'



type InitialStateType = {
    tasks: dataType[]
}


const InitialState : InitialStateType  = {
         tasks : data
    }

const TodoSlice =  createSlice({
      name : 'TodoSlice',
      initialState:InitialState,
      reducers:{
        addTask: (state, { payload }: PayloadAction<dataType>) => {
              state.tasks.push(payload)
          },
          deleteTask: (state, action: PayloadAction<{ id: number }>) => {
            state.tasks = state.tasks.filter((task : any) => task.id !== action.payload.id);
          },
          deleteAllSelected: (state: InitialStateType, { payload }: { payload: valType[] }) => {
            const { tasks } = state;
            if (tasks.length == payload.length) {
                state.tasks = []
            }
            const filteredTasks = tasks.filter((task) => {
            const matchingTasks = payload.find((selectedTask) => selectedTask.task_name === task.task_name);
            return matchingTasks === undefined;
            });

            state.tasks = filteredTasks;
          },
          
          
      },
      extraReducers:{}
})   


export const { addTask , deleteTask , deleteAllSelected } = TodoSlice.actions
export default TodoSlice.reducer