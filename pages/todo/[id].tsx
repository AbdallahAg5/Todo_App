import axiosClient from '@/api/api'
import { AxiosResponse } from 'axios'
import React from 'react'
import { dataType  } from "@/types/types";
import { useRouter } from 'next/router';


type PropsType = {
    data : dataType 
}

export default function Details({data} : PropsType ) {
    const param = useRouter().query.param
    const todo = data; 
    console.log(todo)


  return (
    <div>
      {todo?.task_name}
    </div>
  )

}

interface ApiResponse {
  data: {
    data: dataType[]; // An array of 'dataType'
  };
}

export async function getStaticProps(context: { params: { id: number } }) {
  const { params } = context;
  const res = await axiosClient.get(`todos/${params.id}`);
  const response: AxiosResponse<ApiResponse> = await res;
  const data = response.data.data[0] as dataType
  
  return {
    props: {
      data: data, 
    },
  };
}


export async function getStaticPaths() {
  try {
    const res: dataType[] = await axiosClient.get('todos');
    const paths = res.map((todo) => ({
      params: { param: todo.id.toString() }, // Assuming todo.id is a number; adjust if needed
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error('Error fetching data for static paths:');
    return {
      paths: [],
      fallback: false,
    };
  }
}

 
  
  





 