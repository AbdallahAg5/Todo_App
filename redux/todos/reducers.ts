import { InitialStateType, dataType } from "@/types/types";
import { PayloadAction } from "@reduxjs/toolkit";

export const todosPending =  (state:InitialStateType) => {

}


export const todosSuccess = (state:InitialStateType,{ payload }: PayloadAction<dataType[]>) => {
     state.tasks = payload
    
}  


export const todosRejected = (state:InitialStateType,{ payload }: PayloadAction<any>) => {
    
}