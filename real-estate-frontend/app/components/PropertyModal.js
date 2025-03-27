import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Select,
  MenuItem,
  Button,
  DialogActions,
} from "@mui/material";
import { useState, useEffect } from "react";

export default function PropertyModal({ open, data, onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    transactionType: "",
    propertyType: "",
  });

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (form.price < 100 || form.price > 100000) {
      alert("Price should be between 100 and 100000");
      return;
    }
    onSubmit(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{data && data._id ? "Edit" : "Create"} Property</DialogTitle>
      <DialogContent>
        <TextField
          label="Property Name"
          name="name"
          fullWidth
          value={form.name}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          fullWidth
          value={form.price}
          onChange={handleChange}
          margin="normal"
        />
        <Select
          name="transactionType"
          value={form.transactionType}
          onChange={handleChange}
          displayEmpty
          fullWidth
          margin="normal"
        >
          <MenuItem value="">Transaction Type</MenuItem>
          <MenuItem value="Sale">Sale</MenuItem>
          <MenuItem value="Rent">Rent</MenuItem>
        </Select>
        <Select
          name="propertyType"
          value={form.propertyType}
          onChange={handleChange}
          displayEmpty
          fullWidth
          margin="normal"
        >
          <MenuItem value="">Property Type</MenuItem>
          <MenuItem value="Apartment">Apartment</MenuItem>
          <MenuItem value="Land">Land</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {data && data._id ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
