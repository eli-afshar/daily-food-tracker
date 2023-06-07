import { Container, Paper, Typography } from "@mui/material";
import { getDailyRecords } from "../axios/getDailyRecords";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import { FoodDetailsForm } from "../mainPage/MainForm";

export const RecordForm = () => {
  const [records, setRecords] = useState<FoodDetailsForm[]>([]);

  const getRecords = async () => {
    const res = await getDailyRecords();
    setRecords(res);
  };

  useEffect(() => {
    getRecords();
  }, []);

  return (
    <Container component="div" maxWidth="xs">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          sx={{
            marginTop: 3,
            alignItems: "center",
            textAlign: "center",
            display: "flex",
          }}
        />
      </LocalizationProvider>

      {records.map((record) => (
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            m: 4,
            width: 257,
            flexDirection: "column",
            display: "flex",
          }}
        >
          <Typography variant="body1">Food name = {record.name}</Typography>

          <Typography variant="body1">Amount = {record.amount}</Typography>

          <Typography variant="body1">Total Cal = {record.total}</Typography>
        </Paper>
      ))}
    </Container>
  );
};
