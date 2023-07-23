import axiosClient from "@/api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";


const todoThunk = createAsyncThunk('todos', async () =>{
    try {
        const response = await axiosClient.get('todos/todos');
        return response.data.data;
      } catch (error) {
        throw new Error('Failed to fetch todos.');
      }
})


export default todoThunk



