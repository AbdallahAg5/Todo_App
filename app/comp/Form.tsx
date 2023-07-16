import React, {
  useState,
  MouseEvent,
  ChangeEvent,
  useRef,
  MutableRefObject,
} from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Button } from "primereact/button";
import { dataType, valType } from "../../types/types";
import { status, values } from "../data/data";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "@/redux/todos/TodoSlice";
import { RootType } from "@/redux/store/store";
import { Toast } from "primereact/toast";

const Form: React.FC = () => {
  const toast: MutableRefObject<any> = useRef(null);
  const [val, setVal] = useState<valType>(values);
  const arrayLength = useSelector((e: RootType) => e.todo.tasks.length);
  const dispatch = useDispatch();

  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "All fields required",
      life: 3000,
    });
  };

  // void this function doesn't return nothing
  const HandleChange: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    // without HTMLButtonElement type on the e.traget by default typescript assign it's type to  EventTarget
    const { name, value } = e.target as HTMLButtonElement;
    setVal({ ...val, [name]: value });
  };

  // void this function doesn't return nothing
  const HandleSelect: (e: DropdownChangeEvent) => void = (e) => {
    setVal({ ...val, status: e.target.value });
  };

  const BtnHandler: (event: MouseEvent<HTMLButtonElement>) => void = () => {
    if (val.status == "" || val.task_name == "") {
      showError();
    } else {
      const newTask: dataType = {
        id: arrayLength + 1, // Replace 0 with the appropriate value for the new task's id
        ...val,
      };
      dispatch(addTask(newTask));
      setVal(values);
    }
  };

  return (
    <div className="pt-4 w-full justify-content-center flex flex-row">
      <Toast ref={toast} />
      <InputText
        value={val?.task_name}
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
      <Button
        icon="pi pi-check"
        aria-label="Filter"
        className="ml-1"
        onClick={BtnHandler}
      />
    </div>
  );
};

export default Form;
