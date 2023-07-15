import React, { useState , MouseEvent, useRef, MutableRefObject } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import {DataTable} from 'primereact/datatable'
import {Button} from 'primereact/button'
import {Toast} from 'primereact/toast'
import { Column } from 'primereact/column'
import {RootType} from '@/redux/store/store'
import { dataType  } from '@/types/types'
import { deleteAllSelected, deleteTask } from '@/redux/slice/TodoSlice'




function Data() {
    const toast: MutableRefObject<any> = useRef(null);
    const tasks = useSelector( (e : RootType) => e.todo.tasks)
    const [selectedTodos, setSelectedTodos] = useState<dataType[] | null>(null);
    const [rowClick, setRowClick] = useState<boolean>(true);
    const dispatch = useDispatch()
    

    const showWarn = ():void => {
        toast.current.show({severity:'warn', summary: 'Warning', detail:'No Todos Selected', life: 3000});
    }

    const DeleteAllSelectTodos = () =>{
        if (selectedTodos !== null) {
            dispatch(deleteAllSelected(selectedTodos));
            setSelectedTodos(null)
          }
          else{
              showWarn()
          }
   }

    const DeleteHandler : (id : number) => void  = (id : number) =>{
        dispatch(deleteTask({id}));
    }

    const Operations = (rowData: dataType) =>{
          return (
             <>
              <Button label="Delete" severity="danger" raised  className='mr-2' onClick={() => DeleteHandler(rowData.id)}/>
              <Button label="Update" severity="success" raised />
             </>
          )
    }

  return (
    <div className="card">
        <Toast ref={toast} />
        <Button label="Delete Checked Todos" severity="danger" raised  className='mr-2 ml-8' onClick={() => DeleteAllSelectTodos()}/>
        <DataTable
            className='mt-5 w-11 mx-auto text-center'
            value={tasks}
            selectionMode={rowClick ? undefined : 'multiple'}
            selection={selectedTodos!}
            onSelectionChange={(e) => {
                const value = e.value as dataType[];
                setSelectedTodos(value);
            }}
            dataKey="id"
            tableStyle={{ minWidth: '50rem' }}
            >
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
            <Column field={'task_name'} header="Task Name"></Column>
            <Column field={'status'} header="Progress" body={(rowData) =>PregressStyle(rowData)}></Column>
            <Column  body={(rowData) =>Operations(rowData)} header="Operations" className='w-2'></Column>
            </DataTable>
  </div>

  )
}

export default Data


function PregressStyle (rowData : dataType) : any {
    let backgroundColor;
    if (rowData.status == 'todo') {
       backgroundColor = 'red'
    }
    else if(rowData.status == 'ongoing'){
       backgroundColor = 'orange'
    }
    else{
      backgroundColor = 'green'
    }

    

    return <div style={{ backgroundColor }} className='w-2 text-center py-1 border-round-md text-white font-bold px-1'>{rowData.status}</div>;
}


