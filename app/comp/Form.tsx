import React, { useState , MouseEvent , ChangeEvent } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Button } from "primereact/button";
import { type } from "os";
import { valType } from "../../types/types";
import { status, values } from "../data/data";
import { useDispatch } from 'react-redux'
import { addTask } from "@/redux/slice/TodoSlice";


const Form: React.FC = () => {
  const [val, setVal] = useState<valType>(values);
  const dispatch = useDispatch()

  // void this function doesn't return nothing
  const HandleChange: (e: ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    // without HTMLButtonElement type on the e.traget by default typescript assign it's type to  EventTarget
    const { name, value } = e.target as HTMLButtonElement;
    setVal({ ...val, [name]: value });
  };

  // void this function doesn't return nothing
  const HandleSelect: (e: DropdownChangeEvent) => void = (e) => {
    setVal({ ...val, status: e.target.value });
  };

  const BtnHandler :(event:MouseEvent<HTMLButtonElement>) => void = () =>{
      dispatch(addTask(val))
  }



  return (
    <div className="pt-4 w-full justify-content-center flex flex-row">
      <InputText
        onChange={HandleChange}
        name="task_name"
        className="w-2"
        placeholder="Enter Task "
      />
      <Dropdown
        value={val?.status}
        onChange={HandleSelect}
        options={status}
        optionLabel="opt"
        editable
        placeholder="Select Status"
        className="w-14rem ml-1"
      />
      <Button icon="pi pi-check" aria-label="Filter" className="ml-1" onClick={BtnHandler} />
    </div>
  );
};

export default Form;
