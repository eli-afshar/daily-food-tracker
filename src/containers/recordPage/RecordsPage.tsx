import { Container, Box, Paper, Typography } from "@mui/material";
import { getDailyRecords } from "../axios/getDailyRecords";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import { FoodDetailsForm } from "../mainPage/MainForm";
import dayjs from "dayjs";

export const RecordsPage = () => {
  const [records, setRecords] = useState<FoodDetailsForm[]>([]);

  const getRecords = async (date?: Date) => {
    const res = await getDailyRecords(date);
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
          defaultValue={dayjs(new Date())}
          format="DD MMM YYYY"
          onChange={(e) => {
            getRecords(e?.toDate());
          }}
        />
      </LocalizationProvider>

      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "column-reverse",
          alignItems: "center",
        }}
      >
        {records.map((record) => (
          <Paper
            variant="outlined"
            sx={{
              p: 1,
              m: 0.5,
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
      </Box>
    </Container>
  );
};
