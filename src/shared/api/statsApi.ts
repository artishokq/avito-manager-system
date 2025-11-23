import { http } from "./http";

export type PeriodBackend = "today" | "week" | "month";

export type SummaryStats = {
  totalReviewed: number;
  totalReviewedToday: number;
  totalReviewedThisWeek: number;
  totalReviewedThisMonth: number;
  approvedPercentage: number;
  rejectedPercentage: number;
  requestChangesPercentage: number;
  averageReviewTime: number;
};

export type ActivityPointFromApi = {
  date: string;
  approved: number;
  rejected: number;
  requestChanges: number;
};

export type DecisionsChartFromApi = {
  approved: number;
  rejected: number;
  requestChanges: number;
};

export type CategoriesChartFromApi = Record<string, number>;

export async function fetchSummaryStats(
  period: PeriodBackend
): Promise<SummaryStats> {
  const { data } = await http.get<SummaryStats>("/stats/summary", {
    params: { period },
  });
  return data;
}

export async function fetchActivityChart(
  period: PeriodBackend
): Promise<ActivityPointFromApi[]> {
  const { data } = await http.get<ActivityPointFromApi[]>(
    "/stats/chart/activity",
    {
      params: { period },
    }
  );
  return data;
}

export async function fetchDecisionsChart(
  period: PeriodBackend
): Promise<DecisionsChartFromApi> {
  const { data } = await http.get<DecisionsChartFromApi>(
    "/stats/chart/decisions",
    { params: { period } }
  );
  return data;
}

export async function fetchCategoriesChart(
  period: PeriodBackend
): Promise<CategoriesChartFromApi> {
  const { data } = await http.get<CategoriesChartFromApi>(
    "/stats/chart/categories",
    { params: { period } }
  );
  return data;
}
