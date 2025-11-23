import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  fetchSummaryStats,
  fetchActivityChart,
  fetchDecisionsChart,
  fetchCategoriesChart,
  type SummaryStats,
  type ActivityPointFromApi,
  type CategoriesChartFromApi,
  type PeriodBackend,
} from "../../shared/api/statsApi";

export type Period = "today" | "7d" | "30d";

export type ActivityPoint = {
  date: string;
  count: number;
};

export type CategoryPoint = {
  category: string;
  count: number;
};

export type StatsState = {
  period: Period;
  totalReviewedToday: number;
  totalReviewedWeek: number;
  totalReviewedMonth: number;

  summaryCurrentPeriod: SummaryStats | null;
  activity: ActivityPoint[];
  decisions: {
    approved: number;
    rejected: number;
    returned: number;
  } | null;
  categories: CategoryPoint[];
  isLoading: boolean;
  error: string | null;
};

const initialState: StatsState = {
  period: "7d",
  totalReviewedToday: 0,
  totalReviewedWeek: 0,
  totalReviewedMonth: 0,
  summaryCurrentPeriod: null,
  activity: [],
  decisions: null,
  categories: [],
  isLoading: false,
  error: null,
};

function mapPeriodToBackend(p: Period): PeriodBackend {
  if (p === "today") return "today";
  if (p === "7d") return "week";
  return "month";
}

export const fetchStats = createAsyncThunk<StatsState, Period>(
  "stats/fetchStats",
  async (period) => {
    const backendPeriod = mapPeriodToBackend(period);

    // Три запроса summary для today/week/month
    const [summaryToday, summaryWeek, summaryMonth] = await Promise.all([
      fetchSummaryStats("today"),
      fetchSummaryStats("week"),
      fetchSummaryStats("month"),
    ]);

    // Остальные графики - только для текущего выбранного периода
    const [activityRaw, decisionsRaw, categoriesRaw] = await Promise.all([
      fetchActivityChart(backendPeriod),
      fetchDecisionsChart(backendPeriod),
      fetchCategoriesChart(backendPeriod),
    ]);

    const activity: ActivityPoint[] = activityRaw.map(
      (p: ActivityPointFromApi) => ({
        date: p.date,
        count: p.approved + p.rejected + p.requestChanges,
      })
    );

    const decisions = {
      approved: decisionsRaw.approved / 100,
      rejected: decisionsRaw.rejected / 100,
      returned: decisionsRaw.requestChanges / 100,
    };

    const categories: CategoryPoint[] = Object.entries(
      categoriesRaw as CategoriesChartFromApi
    ).map(([category, count]) => ({
      category,
      count,
    }));

    return {
      period,
      totalReviewedToday: summaryToday.totalReviewed,
      totalReviewedWeek: summaryWeek.totalReviewed,
      totalReviewedMonth: summaryMonth.totalReviewed,
      summaryCurrentPeriod:
        backendPeriod === "today"
          ? summaryToday
          : backendPeriod === "week"
          ? summaryWeek
          : summaryMonth,
      activity,
      decisions,
      categories,
      isLoading: false,
      error: null,
    };
  }
);

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStats.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.period = action.meta.arg;
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        state.period = action.payload.period;
        state.totalReviewedToday = action.payload.totalReviewedToday;
        state.totalReviewedWeek = action.payload.totalReviewedWeek;
        state.totalReviewedMonth = action.payload.totalReviewedMonth;
        state.summaryCurrentPeriod = action.payload.summaryCurrentPeriod;
        state.activity = action.payload.activity;
        state.decisions = action.payload.decisions;
        state.categories = action.payload.categories;
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Не удалось загрузить статистику";
      });
  },
});

export const statsReducer = statsSlice.reducer;
