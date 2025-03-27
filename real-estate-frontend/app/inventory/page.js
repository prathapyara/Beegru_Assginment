"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import {  getUsername } from "../utils/auth.js";
import {
  getProperties,
  createProperty,
  deleteProperty,
  updateProperty,
} from "../utils/api.js";

import PropertyCard from "../components/PropertyCard.js";
import PropertyModal from "../components/PropertyModal.js";
import Navbar from "../components/Navbar.js";

export default function InventoryPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState(null);
  const [snack, setSnack] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = getUsername();

  useEffect(() => {
    if (!username) return router.push("/");
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await getProperties();
      setProperties(res.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data) => {
    console.log(data);
    const ress=await createProperty(data);
    console.log(ress)
    setSnack("Property Created");
    fetchProperties();
  };

  const handleUpdate = async (id, data) => {
    await updateProperty(id, data);
    setSnack("Property Updated");
    fetchProperties();
  };

  const handleDelete = async (id) => {
    await deleteProperty(id);
    setSnack("Property Deleted");
    fetchProperties();
  };

  return (
    <Container>
      <Navbar username={username} onCreate={() => setModalData({})} />

      <Typography variant="h5" sx={{ mt: 3 }}>
        {searchParams.get("new") === "true"
          ? `Welcome ${username}`
          : `Welcome back ${username}`}
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {properties.length === 0 ? (
            <>
              <h1>No Products</h1>
            </>
          ) : (
            <>
              {properties.map((property) => (
                <Grid item xs={12} md={4} key={property._id}>
                  <PropertyCard
                    data={property}
                    onEdit={() => setModalData(property)}
                    onDelete={() => handleDelete(property._id)}
                  />
                </Grid>
              ))}
            </>
          )}
        </Grid>
      )}

      <PropertyModal
        open={!!modalData}
        data={modalData}
        onClose={() => setModalData(null)}
        onSubmit={(data) =>
          modalData && modalData._id
            ? handleUpdate(modalData._id, data)
            : handleCreate(data)
        }
      />

      <Snackbar
        open={!!snack}
        autoHideDuration={2000}
        onClose={() => setSnack("")}
        message={snack}
      />
    </Container>
  );
}
