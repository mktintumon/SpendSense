import { useState, useEffect } from "react";
import API from "../api/api";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Chip,
  TextField,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import CsvUpload from "./CsvUpload";
import ExpenseForm from "./ExpenseForm";
import { useSnackbar } from "notistack";



interface Expense {
  id: number;
  date: string;
  amount: number;
  vendor: string;
  description: string;
  category: string;
  anomaly: boolean;
}

function ExpenseList() {

  const { enqueueSnackbar } = useSnackbar();

  const[rows, setRows] = useState<Expense[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState<Expense | null>(null);

  const[page, setPage] = useState(0);
  const[pageSize, setPageSize] = useState(10);
  const[rowCount, setRowCount] = useState(0);
  const[search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);


  const fetchExpenses = async () => {
    setLoading(true);

    const result = await API.get<any>(
      `/getExpenses?page=${page}&size=${pageSize}&search=${search}`
    );
    
    setRows(result.content);
    setRowCount(result.totalElements);

    setLoading(false);
  };


  const deleteExpense = async (id: number) => {
    await API.delete(`/deleteExpense/${id}`);
    enqueueSnackbar("Expense deleted successfully", { variant: "success" });
    fetchExpenses();
  };


  const handleAddExpense = () => {
    setOpenModal(true);
  };


  const handleCloseModal = () => {
    setOpenModal(false);
    fetchExpenses();
  };


  useEffect(() => {
    fetchExpenses();
  }, [page, pageSize, search]);


  const columns: GridColDef[] = [
    { field: "date", headerName: "Date", width: 120 },
    { field: "vendor", headerName: "Vendor", width: 150 },
    { field: "category", headerName: "Category", width: 130 },
    { field: "amount", headerName: "Amount", width: 120 },
    { field: "anomaly", headerName: "Anomaly", width: 130, 
      renderCell: (params) => 
        params.value ? <Chip label="Anomaly" color="error" /> : "Normal"
    },
    { field: "description", headerName: "Description", width: 250 },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            color="primary"
            sx={{ mr: 1 }}
            onClick={() => {
              setEditData(params.row);
              setOpenModal(true);
            }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => deleteExpense(params.row.id)}
          >
            Delete
          </Button>
        </>
      )
    }
  ]


  return (
    <Box>
      {/* Header  --> header name, search bar, add expense button, upload csv button  */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        p={2}
        sx={{ backgroundColor: "#f5f5f5", borderRadius: "4px" }}
      >
        <Box sx={{ fontSize: "24px", fontWeight: "bold" }}>Expense List</Box>

        <Box display="flex" gap={2}>
          <TextField
            size="small"
            label="Search Vendor"
            value={search}
            onChange={(e) => {
              setPage(0);
              setSearch(e.target.value);
            }}
          />

          <Button variant="contained" onClick={handleAddExpense}>
            Add Expense
          </Button>

          <CsvUpload />
        </Box>
      </Box>

      {/* Data Grid */}
      <DataGrid
        loading={loading}
        rows={rows}
        columns={columns}
        autoHeight
        pagination
        paginationMode="server"
        rowCount={rowCount}
        pageSizeOptions={[5, 10, 20]}

        paginationModel={{ page, pageSize }} // IMPORTANT: This is needed to keep the pagination state in sync with the DataGrid

        onPaginationModelChange={(model) => {
          setPage(model.page);
          setPageSize(model.pageSize);
        }}
      />

      {/* Modal */}
      <Dialog
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditData(null);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{editData ? "Edit Expense" : "Add Expense"}</DialogTitle>

        <DialogContent>
          <Box mt={2}>
            <ExpenseForm
              onClose={() => {
                setEditData(null);
                handleCloseModal();
              }}
              existingData={editData}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default ExpenseList;
