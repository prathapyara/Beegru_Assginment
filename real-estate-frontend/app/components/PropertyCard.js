"use client";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function PropertyCard({ data, onEdit, onDelete }) {
  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {data.name}
        </Typography>
        <Typography color="text.secondary">Price: ₹{data.price}</Typography>
        <Typography color="text.secondary">
          Type: {data.propertyType}
        </Typography>
        <Typography color="text.secondary">
          Transaction: {data.transactionType}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <IconButton onClick={onEdit} aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton onClick={onDelete} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

