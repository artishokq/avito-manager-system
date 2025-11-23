import { Paper, Typography } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type DecisionsShare = {
  approved: number;
  rejected: number;
  returned: number;
};

type Props = {
  decisions: DecisionsShare;
};

const COLORS = {
  approved: "#4caf50",
  rejected: "#f44336",
  returned: "#ff9800",
};

export function DecisionsPieChart({ decisions }: Props) {
  const data = [
    { name: "Одобрено", key: "approved", value: decisions.approved },
    { name: "Отклонено", key: "rejected", value: decisions.rejected },
    { name: "На доработку", key: "returned", value: decisions.returned },
  ];

  return (
    <Paper sx={{ p: 2, height: 320 }}>
      <Typography variant="subtitle1" gutterBottom>
        Распределение решений
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 0, right: 0, bottom: 30, left: 0 }}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell
                key={entry.key}
                fill={COLORS[entry.key as keyof typeof COLORS]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(v: number) => `${Math.round(v * 100)}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
}
