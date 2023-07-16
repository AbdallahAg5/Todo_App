
export type dataType = {
    id:number,
    task_name : string,
    status : string
}


export type selectType = {
      opt : string,
      value : string
}


export type valType = {
     task_name:string,
     status:string

}



export type ColumnMeta = {
    field: string;
    header: string;
}


export type InitialStateType = {
    tasks: dataType[]
}