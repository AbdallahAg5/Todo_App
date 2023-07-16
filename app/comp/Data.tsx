import React, {
  useState,
  MouseEvent,
  useRef,
  MutableRefObject,
  useEffect,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Column } from "primereact/column";
import { RootType } from "@/redux/store/store";
import { dataType, ColumnMeta } from "@/types/types";
import { deleteAllSelected, deleteTask } from "@/redux/todos/TodoSlice";
import { Paginator } from "primereact/paginator";
import { Tooltip } from "primereact/tooltip";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { ProgressSpinner } from "primereact/progressspinner";
import { Badge } from "primereact/badge";
import todoThunk from "@/redux/todos/TodoThunk";

function Data() {
  const toast: MutableRefObject<any> = useRef(null);
  const tasks = useSelector((e: RootType) => e.todo.tasks);
  const [selectedTodos, setSelectedTodos] = useState<dataType[] | null>(null);
  const [rowClick, setRowClick] = useState<boolean>(true);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(2);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const cols: ColumnMeta[] = [
    { field: "id", header: "Id" },
    { field: "task_name", header: "Name" },
    { field: "status", header: "Status" },
  ];

  
  useEffect(() => {
       dispatch(todoThunk());
  },[]);


  const exportColumns = cols.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));

  const showWarn = (): void => {
    toast.current.show({
      severity: "warn",
      summary: "Warning",
      detail: "No Todos Selected",
      life: 3000,
    });
  };

  const DeleteAllSelectTodos = () => {
    if (selectedTodos !== null) {
      setLoading(true);
      setInterval(() => {
        setLoading(false);
        dispatch(deleteAllSelected(selectedTodos));
      }, 3000);
      setSelectedTodos(null);
    } else {
      showWarn();
    }
  };

  const acceptAction = (id: number) => {
    console.log(id);
    dispatch(deleteTask({ id }));
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Deleted Successfully",
      life: 3000,
    });
  };

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "Delete rejected",
      life: 3000,
    });
  };

  const DeleteHandler: (id: number) => void = (id: number) => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: (): void => {
        acceptAction(id);
      },
      reject,
    });
  };

  const Operations = (rowData: dataType) => {
    return (
      <>
        <Button
          label="Delete"
          severity="danger"
          raised
          className="mr-2"
          onClick={() => DeleteHandler(rowData.id)}
        />
        <Button label="Update" severity="success" raised />
      </>
    );
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(tasks);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "products");
    });
  };

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);

        doc.autoTable(exportColumns, tasks);
        doc.save("products.pdf");
      });
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  const header = (
    <div className="flex align-items-center justify-content-between gap-2">
      <Badge value={tasks.length} className="h-2 ml-2"></Badge>
      <div>
        <Button
          type="button"
          icon="pi pi-file-excel"
          severity="success"
          rounded
          onClick={exportExcel}
          data-pr-tooltip="XLS"
          className="mr-2"
        />
        <Button
          type="button"
          icon="pi pi-file-pdf"
          severity="warning"
          rounded
          onClick={exportPdf}
          data-pr-tooltip="PDF"
        />
      </div>
    </div>
  );

  return (
    <div className="card w-11 mx-auto ">
      <Toast ref={toast} />
      <ConfirmDialog />
      <Button
        disabled={tasks.length == 0 || selectedTodos == null}
        label="Delete Checked Todos"
        severity="danger"
        raised
        className="mr-2 ml-8"
        onClick={() => DeleteAllSelectTodos()}
      />
      {loading ? (
        <ProgressSpinner
          style={{ width: "30px", height: "30px" }}
          strokeWidth="8"
          fill="transparent"
          animationDuration=".5s"
        />
      ) : null}
      <Tooltip target=".export-buttons>button" position="bottom" />
      <DataTable
        className="mt-5 w-11 mx-auto text-center"
        value={tasks.slice(first, first + rows)}
        selectionMode={rowClick ? undefined : "multiple"}
        selection={selectedTodos!}
        onSelectionChange={(e) => {
          const value = e.value as dataType[];
          setSelectedTodos(value);
        }}
        header={header}
        dataKey="id"
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column>
        <Column
          field={"task_name"}
          sortable
          header="Task Name"
          className="font-bold w-5"
        ></Column>
        <Column
          field={"status"}
          header="Progress"
          body={(rowData) => PregressStyle(rowData)}
          className="w-5"
        ></Column>
        <Column
          body={(rowData) => Operations(rowData)}
          header="Operations"
          className="w-2 "
        ></Column>
      </DataTable>
      {tasks.length > 0 ? (
        <Paginator
          className="mx-7"
          first={first}
          rows={rows}
          totalRecords={tasks.length}
          rowsPerPageOptions={[2, 4, 6]}
          onPageChange={(e) => {
            setFirst(e.first);
            setRows(e.rows);
          }}
        />
      ) : null}
    </div>
  );
}

export default Data;

function PregressStyle(rowData: dataType): any {
  let backgroundColor;
  if (rowData.status == "todo") {
    backgroundColor = "red";
  } else if (rowData.status == "ongoing") {
    backgroundColor = "orange";
  } else {
    backgroundColor = "green";
  }

  return (
    <div
      style={{ backgroundColor }}
      className={`w-2 text-center py-1 border-round-md text-white font-bold ${
        rowData.status == "todo" ? "px-1" : "pr-3 px-1"
      }`}
    >
      {rowData.status}
    </div>
  );
}
