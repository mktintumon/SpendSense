import { useEffect, useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import API from "../api/api";
import { useSnackbar } from "notistack";

interface ExpenseFormProps {
  onClose?: () => void;
  existingData?: any;
}

function ExpenseForm({ onClose, existingData }: ExpenseFormProps) {

  const { enqueueSnackbar } = useSnackbar();

  const [form, setForm] = useState({
    date: "",
    amount: "",
    vendor: "",
    description: "",
  });

  useEffect(() => {
    if (existingData) {
      setForm({
        date: existingData.date || "",
        amount: existingData.amount ? String(existingData.amount) : "",
        vendor: existingData.vendor || "",
        description: existingData.description || "",
      });
    } 
  }, [existingData]);


  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async () => {
    if (existingData) {
      // Update existing expense
      await API.put(`/updateExpense/${existingData.id}`, {
        ...form,
        amount: Number(form.amount),
      });

      enqueueSnackbar("Expense updated successfully", { variant: "success" });

    } else {
      // Add new expense
      await API.post("/addExpense", {
        ...form,
        amount: Number(form.amount),
      });

      enqueueSnackbar("Expense added successfully", { variant: "success" });
    }

    onClose && onClose();
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} mb={3}>
      <TextField
        type="date"
        name="date"
        onChange={handleChange}
        label="Date"
        InputLabelProps={{ shrink: true }}
        value={form.date} // important for edit functionality to show existing date
      />
      <TextField
        label="Amount"
        name="amount"
        type="number"
        onChange={handleChange}
        value={form.amount} //  important for edit functionality to show existing amount
      />
      <TextField
        label="Vendor"
        name="vendor"
        onChange={handleChange}
        value={form.vendor} //  important for edit functionality to show existing vendor
      />
      <TextField
        label="Description"
        name="description"
        onChange={handleChange}
        value={form.description} //  important for edit functionality to show existing description
        multiline
        rows={3}
      />
      <Button variant="contained" onClick={handleSubmit}>
        {existingData ? "Update Expense" : "Add Expense"}
      </Button>
    </Box>
  );
}

export default ExpenseForm;
