import { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import { GetRecordResponse } from "../containers/axios/getDailyRecords";

interface Props {
  dailyRecordsCal: GetRecordResponse;
}

export function TotalDailyCalories({ dailyRecordsCal }: Props) {
  const [totalDaily, setTotalDaily] = useState(0);

  useEffect(() => {
    let sum = 0;
    dailyRecordsCal.records.forEach((obj: any) => {
      if (obj.total) {
        sum += obj.total;
      }
    });
    let totalDailyCal = Number(sum.toFixed(2));
    setTotalDaily(totalDailyCal);
  }, [dailyRecordsCal]);

  return (
    <div>
      <Paper
        variant="outlined"
        sx={{ p: 2, mb: 1 }}
      >{`Daily total calories =  ${totalDaily}`}</Paper>
    </div>
  );
}
