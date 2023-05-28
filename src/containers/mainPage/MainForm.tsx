import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Autocomplete from "@mui/material/Autocomplete";

export const MainForm = () => {
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
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={["Rice", "Chicken", "Meat", "Cheese", "Peach", "Grape"]}
          sx={{ width: 357 }}
          renderInput={(params) => <TextField {...params} label="Food" />}
        />
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="food name"
            label="food name"
            autoComplete="food name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="cal per 100gr"
            id="cal per 100gr"
            autoComplete="cal per 100gr"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            type="number"
            label="amount"
            id="amount"
            autoComplete="amount"
          />
          <p>Total: amount * cal</p>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
