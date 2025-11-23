import { useEffect } from "react";
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
} from "@mui/material";

import { MetricsCards } from "./components/MetricsCards";
import { ActivityChart } from "./components/ActivityChart";
import { DecisionsPieChart } from "./components/DecisionsPieChart";
import { CategoriesBarChart } from "./components/CategoriesBarChart";

import { useAppDispatch, useAppSelector } from "../../shared/lib/hooks";
import { fetchStats, type Period } from "../../features/stats/statsSlice";

function StatsPage() {
  const dispatch = useAppDispatch();
  const {
    period,
    totalReviewedToday,
    totalReviewedWeek,
    totalReviewedMonth,
    summaryCurrentPeriod,
    activity,
    decisions,
    categories,
    isLoading,
    error,
  } = useAppSelector((state) => state.stats);

  useEffect(() => {
    dispatch(fetchStats(period));
  }, [dispatch, period]);

  const handlePeriodChange = (
    _: React.MouseEvent<HTMLElement>,
    value: Period | null
  ) => {
    if (!value) return;
    dispatch(fetchStats(value));
  };

  const hasData = summaryCurrentPeriod && decisions;

  return (
    <Box
      px={3}
      py={2}
      display="flex"
      flexDirection="column"
      gap={3}
      maxWidth="1200px"
      mx="auto"
      width="100%"
      boxSizing="border-box"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Статистика модерации</Typography>
        <ToggleButtonGroup
          size="small"
          value={period}
          exclusive
          onChange={handlePeriodChange}
        >
          <ToggleButton value="today">Сегодня</ToggleButton>
          <ToggleButton value="7d">7 дней</ToggleButton>
          <ToggleButton value="30d">30 дней</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {isLoading && !hasData ? (
        <Box py={4} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : !hasData ? (
        <Typography color="text.secondary">
          Данные статистики отсутствуют
        </Typography>
      ) : (
        <>
          <MetricsCards
            period={period}
            totals={{
              today: totalReviewedToday,
              week: totalReviewedWeek,
              month: totalReviewedMonth,
            }}
            decisions={{
              approved: summaryCurrentPeriod!.approvedPercentage / 100,
              rejected: summaryCurrentPeriod!.rejectedPercentage / 100,
              returned: summaryCurrentPeriod!.requestChangesPercentage / 100,
            }}
            avgReviewTimeSeconds={summaryCurrentPeriod!.averageReviewTime}
          />

          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            gap={2}
          >
            <Box flex={1}>
              <ActivityChart data={activity} />
            </Box>
            <Box flex={1}>
              <DecisionsPieChart decisions={decisions!} />
            </Box>
          </Box>

          <CategoriesBarChart data={categories} />
        </>
      )}
    </Box>
  );
}

export default StatsPage;
