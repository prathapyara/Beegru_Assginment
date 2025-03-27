"use client";

import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Snackbar,
  Alert,
  Stack,
  CircularProgress,
} from "@mui/material";
import { login, signup } from "./utils/api.js";
import { setToken } from "./utils/auth.js";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });
  const router = useRouter();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.username || !form.password) {
      return setSnackbar({
        open: true,
        message: "Please fill all fields",
        severity: "warning",
      });
    }

    setLoading(true);
    try {
      const res = isSignup ? await signup(form) : await login(form);
      setToken(res.data.username);
      router.push(`/inventory?new=${res.data.isNew}`);
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Authentication failed",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" >
      <Box mt={10} textAlign="center">
        <Typography variant="h4" mb={3}>
          {isSignup ? "Create an Account" : "Login"}
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Username"
            name="username"
            fullWidth
            variant="outlined"
            value={form.username}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            fullWidth
            type="password"
            variant="outlined"
            value={form.password}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            disabled={loading}
            size="large"
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : isSignup ? (
              "Sign Up"
            ) : (
              "Login"
            )}
          </Button>

          <Button
            onClick={() => setIsSignup((prev) => !prev)}
            fullWidth
            variant="text"
            sx={{ mt: 1 }}
          >
            {isSignup ? "Already have an account? Login" : "New here? Sign up"}
          </Button>
        </Stack>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

