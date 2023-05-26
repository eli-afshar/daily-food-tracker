import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import { userCheck } from "./UserCheck";
import { useState } from "react";
import { Alert } from "@mui/material";

export interface Inputs {
  username: string;
  password: string;
}

export const LoginForm = () => {
  const [isError, setIsError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit = async (data: Inputs) => {
    const res = await userCheck(data);

    if (res.token) {
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="username"
            autoComplete="username"
            autoFocus
            {...register("username", { required: true })}
            helperText={errors.username && "Username is required."}
            error={Boolean(errors.username)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register("password", { required: true, minLength: 3 })}
            helperText={
              errors.password && "password should be at least 3 characters."
            }
            error={Boolean(errors.password)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
        {isError && <Alert severity="error">Something went wrong!</Alert>}
      </Box>
    </Container>
  );
};
