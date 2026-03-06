import { useState, useEffect } from "react";
import API from "../api/api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
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

  const [expenses, setExpense] = useState<Expense[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState<Expense | null>(null);

  const fetchExpenses = async () => {
    const result = await API.get<Expense[]>("/expenses");
    setExpense(result); // because of response interceptor, result is already unwrapped data
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
  }, []);

  return (
    <Box>
      {/* Header with title and buttons */}
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddExpense}
          >
            Add Expense
          </Button>
          <CsvUpload />
        </Box>
      </Box>

      {/* Expense Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Vendor</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Anomaly</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {expenses.map((exp) => (
              <TableRow key={exp.id}>
                <TableCell>{exp.date}</TableCell>
                <TableCell>{exp.vendor}</TableCell>
                <TableCell>{exp.category}</TableCell>
                <TableCell>₹ {exp.amount}</TableCell>
                <TableCell>
                  {exp.anomaly ? <Chip label="Anomaly" color="error" /> : "NA"}
                </TableCell>
                <TableCell>{exp.description}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ mr: 1 }}
                    onClick={() => {
                      setEditData(exp);
                      setOpenModal(true);
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deleteExpense(exp.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Add Expense Form */}
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
             // key={editData ? editData.id : "new"} // force remount to reset form when switching between edit and add
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
