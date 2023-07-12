import React, { useState , MouseEvent } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import {DataTable} from 'primereact/datatable'
import {Button} from 'primereact/button'
import { Column } from 'primereact/column'
import {RootType} from '@/redux/store/store'
import { dataType  } from '@/types/types'
import { deleteTask } from '@/redux/slice/TodoSlice'




function Data() {
    const tasks = useSelector( (e : RootType) => e.todo.tasks)
    const [selectedProducts, setSelectedProducts] = useState<{}[] | null>(null);
    const [rowClick, setRowClick] = useState<boolean>(true);
    const dispatch = useDispatch()

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
        <DataTable
            className='mt-5 w-11 mx-auto text-center'
            value={tasks}
            selectionMode={rowClick ? undefined : 'multiple'}
            selection={selectedProducts!}
            onSelectionChange={(e) => {
                const value = e.value as dataType[];
                setSelectedProducts(value);
            }}
            dataKey="id"
            tableStyle={{ minWidth: '50rem' }}
            >
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
            <Column field={'task_name'} header="Task Name"></Column>
            <Column field={'status'} header="Progress"></Column>
            <Column  body={(rowData) =>Operations(rowData)} header="Operations" className='w-2'></Column>
            </DataTable>
  </div>

  )
}

export default Data


