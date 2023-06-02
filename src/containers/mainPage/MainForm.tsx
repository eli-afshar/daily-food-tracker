import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Autocomplete from "@mui/material/Autocomplete";
import { getFoodsList } from "../axios/getFoodsList";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, CircularProgress } from "@mui/material";
import { submitRecords } from "../axios/submitRecords";
import { getDailyRecords } from "../axios/getDailyRecords";

interface FoodDetails {
  id?: number;
  name: string;
  caloriesPer100g: number | null;
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
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState("");

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

  const calcTotalCalories = async () => {
    const res = await getDailyRecords();
    let sum = 0;
    res.forEach((obj: any) => {
      if (obj.total) {
        sum += obj.total;
      }
    });
    setTotal(sum);
  };

  useEffect(() => {
    getFoods();
    calcTotalCalories();
  }, []);

  console.log(process.env);

  const onSubmit = async (data: FoodDetailsForm) => {
    data.total = ((data.amount ?? 0) * (data.caloriesPer100g ?? 0)) / 100;
    setIsLoading(true);
    const res: any = await submitRecords(data);

    if (res.status === 200) {
      setIsLoading(false);
      setIsError(false);
      reset();
      calcTotalCalories();
      setMessage("Record added successfully");
    } else {
      setIsLoading(false);
      setIsError(true);
    }
  };

  const closeAlert = () => {
    const timeout = setTimeout(() => {
      setMessage("");
    }, 2000);

    return () => clearTimeout(timeout);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div
        style={{
          position: "absolute",
          zIndex: 3,
          top: 20,
          width: "calc(100% - 64px)",
        }}
      >
        {message && (
          <Alert
            severity="success"
            onClose={closeAlert()}
            style={{ width: "100%" }}
          >
            {message}
          </Alert>
        )}
      </div>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          id="total-daily-cal"
          margin="normal"
          size="small"
          label={`Daily total calories =  ${total}`}
          variant="outlined"
        />

        <Autocomplete
          disablePortal
          id="combo-box-demo"
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
          />

          <p>{`Total = ${
            (Number(watch("amount") ?? 0) *
              Number(watch("caloriesPer100g") ?? 0)) /
            100
          }`}</p>

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
