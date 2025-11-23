import { Box, Card, CardContent, Typography } from "@mui/material";

import type { Period } from "../../../features/stats/statsSlice";

type Totals = {
  today: number;
  week: number;
  month: number;
};

type DecisionsShare = {
  approved: number;
  rejected: number;
  returned: number;
};

type Props = {
  period: Period;
  totals: Totals;
  decisions: DecisionsShare;
  avgReviewTimeSeconds: number;
};

function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  if (mins === 0) {
    return `${secs} сек`;
  }

  return `${mins} мин ${secs} сек`;
}

export function MetricsCards({
  period,
  totals,
  decisions,
  avgReviewTimeSeconds,
}: Props) {
  let periodLabel: string;
  let mainTotal: number;

  switch (period) {
    case "today":
      periodLabel = "Сегодня";
      mainTotal = totals.today;
      break;
    case "7d":
      periodLabel = "За 7 дней";
      mainTotal = totals.week;
      break;
    case "30d":
    default:
      periodLabel = "За 30 дней";
      mainTotal = totals.month;
      break;
  }

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      gap={2}
      width="100%"
      alignItems="stretch"
    >
      {/* Проверено объявлений */}
      <Box flex={1} minWidth={0} display="flex">
        <Card sx={{ flex: 1 }}>
          <CardContent
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Проверено объявлений
              </Typography>
              <Typography variant="h3" mt={1}>
                {mainTotal}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {periodLabel}
              </Typography>
            </Box>

            <Box mt={2}>
              <Typography variant="body2" color="text.secondary">
                Сегодня: {totals.today}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                За неделю: {totals.week}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                За месяц: {totals.month}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Одобрено */}
      <Box flex={1} minWidth={0} display="flex">
        <Card sx={{ flex: 1 }}>
          <CardContent
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Одобрено
            </Typography>
            <Box mt={1}>
              <Typography variant="h3">
                {formatPercent(decisions.approved)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Доля одобренных объявлений
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Отклонено */}
      <Box flex={1} minWidth={0} display="flex">
        <Card sx={{ flex: 1 }}>
          <CardContent
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Отклонено
            </Typography>
            <Box mt={1}>
              <Typography variant="h3">
                {formatPercent(decisions.rejected)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Доля отклонённых
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Среднее время проверки */}
      <Box flex={1} minWidth={0} display="flex">
        <Card sx={{ flex: 1 }}>
          <CardContent
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Среднее время проверки
            </Typography>
            <Box mt={1}>
              <Typography variant="h4">
                {formatDuration(avgReviewTimeSeconds)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                На одно объявление
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
