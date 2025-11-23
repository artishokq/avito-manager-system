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

type CategoryPoint = {
  category: string;
  count: number;
};

type Props = {
  data: CategoryPoint[];
};

export function CategoriesBarChart({ data }: Props) {
  return (
    <Paper sx={{ p: 2, height: 360 }}>
      <Typography variant="subtitle1" gutterBottom>
        Проверенные объявления по категориям
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 16, right: 16, bottom: 20, left: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" />
          <YAxis dataKey="category" type="category" />
          <Tooltip />
          <Bar dataKey="count" fill="#1976d2" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}
