import { useEffect, useState } from "react";
import { TextField, Button, Box, CircularProgress  } from "@mui/material";
import API from "../api/api";
import { useSnackbar } from "notistack";

interface ExpenseFormProps {
  onClose?: () => void;
  existingData?: any;
  aiData?: any;
}

function ExpenseForm({ onClose, existingData, aiData }: ExpenseFormProps) {

  const { enqueueSnackbar } = useSnackbar();

  const[loading, setLoading] = useState(false);

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
    else if (aiData) {
      setForm({
        date: aiData.date || "",
        amount: aiData.amount ? String(aiData.amount) : "",
        vendor: aiData.vendor || "",
        description: aiData.description || "",
      });
  }
  }, [existingData, aiData]);


  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async () => {

    try {
      setLoading(true);

      if (existingData) {

        await API.put(`/updateExpense/${existingData.id}`, {
          ...form,
          amount: Number(form.amount),
        });

        enqueueSnackbar("Expense updated successfully", { variant: "success" });

      } else {

        await API.post("/addExpense", {
          ...form,
          amount: Number(form.amount),
        });

        enqueueSnackbar("Expense added successfully", { variant: "success" });
      }

      onClose && onClose();

    } catch (err) {
      enqueueSnackbar("Operation failed", { variant: "error" });
    } finally {
      setLoading(false);
    }
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
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={
          loading ||
          !form.date ||
          !form.amount ||
          !form.vendor
        }
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : existingData ? (
          "Update Expense"
        ) : (
          "Add Expense"
        )}
      </Button>
    </Box>
  );
}

export default ExpenseForm;
