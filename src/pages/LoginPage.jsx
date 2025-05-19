import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import { login } from "../api";
import { login as loginAction } from "../store";
const validationSchema = yup.object({
  username: yup.string("Enter your username").required("Username is required"),
  password: yup.string("Enter your password").required("Password is required"),
});

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, formikHelpers) => {
      formikHelpers.setTouched({ username: true, password: true });

      const errors = await formikHelpers.validateForm();
      if (Object.keys(errors).length > 0) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const { sessionId, accountId } = await login(
          values.username,
          values.password
        );

        dispatch(
          loginAction({
            sessionId,
            accountId,
            username: values.username,
          })
        );

        navigate("/");
      } catch (error) {
        formikHelpers.setErrors({ submit: "Failed to login" });
      } finally {
        setLoading(false);
      }
    },
    validateOnBlur: false,
    validateOnChange: true,
  });

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h3" sx={{ mb: 3 }}>
          Login
        </Typography>

        {formik.errors.submit && (
          <Typography color="error" sx={{ mb: 2 }}>
            {formik.errors.submit}
          </Typography>
        )}

        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ width: "100%" }}
        >
          <TextField
            margin="normal"
            variant="standard"
            fullWidth
            id="username"
            name="username"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />

          <TextField
            margin="normal"
            variant="standard"
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2, height: 35 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "SUBMIT"
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
