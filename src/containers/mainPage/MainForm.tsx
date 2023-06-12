import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Autocomplete from "@mui/material/Autocomplete";
import { getFoodsList } from "../axios/getFoodsList";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, CircularProgress, IconButton, Snackbar } from "@mui/material";
import { submitRecords } from "../axios/submitRecords";
import { GetRecordResponse, getDailyRecords } from "../axios/getDailyRecords";
import LogoutIcon from "@mui/icons-material/Logout";
import { TotalDailyCalories } from "../../components/TotalDailyCalories";

interface FoodDetails {
  id?: number;
  name: string;
  caloriesPer100g: number | null;
  defaultWeight: number | null;
}

export interface FoodDetailsForm {
  name: string;
  caloriesPer100g: number | null;
  amount: number | null;
  total?: number;
}

export const MainForm = () => {
  const [options, setOptions] = useState<FoodDetails[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [dailyRecordsCal, setDailyRecordsCal] = useState<GetRecordResponse>({
    records: [],
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    //getValues,
    watch,
  } = useForm<FoodDetailsForm>();

  const getFoods = async () => {
    const res = await getFoodsList();
    setOptions(res);
  };

  const getDailyRecordsApi = async () => {
    const res = await getDailyRecords();
    if (res) {
      setDailyRecordsCal(res);
    }
    console.log(res);
  };

  useEffect(() => {
    getFoods();
    getDailyRecordsApi();
  }, []);

  const onSubmit = async (data: FoodDetailsForm) => {
    data.total = ((data.amount ?? 0) * (data.caloriesPer100g ?? 0)) / 100;
    setIsLoading(true);
    const res = await submitRecords(data);

    if (res && res.status === 200) {
      setIsLoading(false);
      setIsError(false);
      reset();
      getDailyRecordsApi();
      setOpen(true);
      setMessage("Record added successfully");
    } else {
      setIsLoading(false);
      setIsError(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container component="div" maxWidth="xs">
      <IconButton aria-label="logout" color="primary">
        <LogoutIcon />
      </IconButton>

      <Snackbar
        open={open}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        onClose={handleClose}
        autoHideDuration={3000}
      >
        <Alert severity="success">{message}</Alert>
      </Snackbar>

      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TotalDailyCalories dailyRecordsCal={dailyRecordsCal} />

        <Autocomplete
          disablePortal
          options={options}
          fullWidth
          renderInput={(params) => <TextField {...params} label="Food" />}
          getOptionLabel={(opt) => opt.name}
          onChange={(e, v) => {
            setValue("name", v?.name ? v.name : "");
            setValue(
              "caloriesPer100g",
              v?.caloriesPer100g ? v.caloriesPer100g : null
            );
            setValue("amount", v?.defaultWeight ? v.defaultWeight : null);
          }}
        />
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
            id="food-name"
            label="Food name"
            hiddenLabel
            autoComplete="food name"
            autoFocus
            {...register("name", { required: true })}
            helperText={errors.name && "Food name is require."}
            error={Boolean(errors.name)}
            InputLabelProps={{
              shrink: Boolean(watch("name")),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Calories per 100gr"
            id="cal-per-100gr"
            autoComplete="calories per 100gr"
            {...register("caloriesPer100g", {
              required: true,
            })}
            helperText={errors.caloriesPer100g && "Food calories is require."}
            error={Boolean(errors.caloriesPer100g)}
            InputLabelProps={{
              shrink: Boolean(watch("caloriesPer100g")),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            type="number"
            label="Amount"
            id="amount"
            autoComplete="amount"
            helperText={errors.caloriesPer100g && "Amount is require."}
            error={Boolean(errors.amount)}
            {...register("amount", { required: true })}
            InputLabelProps={{
              shrink: Boolean(watch("amount")),
            }}
          />
          <p>
            {`Total = ${
              (Number(watch("amount") ?? 0) *
                Number(watch("caloriesPer100g") ?? 0)) /
              100
            }`}
          </p>

          {/* <TextField
            margin="normal"
            required
            fullWidth
            type="number"
            label="Total cal"
            id="total-cal"
            {...register("total", {
              required: true,
            })}
            helperText={errors.caloriesPer100g && "Total calories is require."}
            error={Boolean(errors.total)}
          >
            {`Total = ${
              (Number(watch("amount") ?? 0) *
                Number(watch("caloriesPer100g") ?? 0)) /
              100
            }`}
          </TextField> */}
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading || !watch("amount")}
            >
              Submit
            </Button>
          )}
        </Box>
        {isError && <Alert severity="error">Something went wrong!</Alert>}
      </Box>
    </Container>
  );
};
