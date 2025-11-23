import { Paper, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type ActivityPoint = {
  date: string;
  count: number;
};

type Props = {
  data: ActivityPoint[];
};

export function ActivityChart({ data }: Props) {
  return (
    <Paper sx={{ p: 2, height: 320 }}>
      <Typography variant="subtitle1" gutterBottom>
        Активность по дням
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 16, right: 16, bottom: 20, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#1976d2" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}
