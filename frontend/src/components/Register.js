import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Alert,
  Snackbar,
} from "@mui/material";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student", // default role
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();

  const { name, email, password, role } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/register", formData);
      setSuccess(true);
      setError("");
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response.data.message || "Registration failed");
      setSuccess(false);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <form onSubmit={onSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={name}
          onChange={onChange}
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={onChange}
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={onChange}
          margin="normal"
          variant="outlined"
          required
        />
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel>Role</InputLabel>
          <Select name="role" value={role} onChange={onChange} label="Role">
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="parent">Parent</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "20px" }}
        >
          Register
        </Button>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {success ? (
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            variant="filled"
          >
            Registration successful! Redirecting to login...
          </Alert>
        ) : (
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            variant="filled"
          >
            {error}
          </Alert>
        )}
      </Snackbar>
    </Container>
  );
};

export default Register;
