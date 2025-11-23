import { http } from "./http";
import type { AdPriority } from "../../pages/ListPage/components/AdCard/AdCard";
import type { SortState } from "../../pages/ListPage/components/SortPanel/SortPanel";
import type { FiltersState } from "../../pages/ListPage/components/FiltersPanel/FilterPanel";

export type Ad = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  categoryId: number;
  status: string;
  priority: AdPriority;
  createdAt: string;
  updatedAt: string;
  images: string[];
};

export type AdsResponse = {
  items: Ad[];
  total: number;
  page: number;
  limit: number;
};

export async function fetchAdsApi(
  page: number,
  pageSize: number,
  filters: FiltersState,
  sort: SortState
): Promise<AdsResponse> {
  const params: Record<string, unknown> = {
    page,
    limit: pageSize,
    // сортировка: сервер ждёт sortBy / sortOrder
    sortBy: sort.field,
    sortOrder: sort.direction,
  };

  // статусы: ?status=pending&status=approved
  if (filters.statuses.length > 0) {
    params.status = filters.statuses;
  }

  // категория: фильтруем по categoryId
  if (filters.categoryId != null) {
    params.categoryId = filters.categoryId;
  }

  // цена: сервер ждёт minPrice / maxPrice
  if (filters.priceFrom != null) {
    params.minPrice = Number(filters.priceFrom);
  }
  if (filters.priceTo != null) {
    params.maxPrice = Number(filters.priceTo);
  }

  // поиск по названию
  if (filters.search.trim()) {
    params.search = filters.search.trim();
  }

  const { data } = await http.get<{
    ads: Ad[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    };
  }>("/ads", { params });

  return {
    items: data.ads || [],
    total: data.pagination?.totalItems ?? 0,
    page: data.pagination?.currentPage ?? page,
    limit: data.pagination?.itemsPerPage ?? pageSize,
  };
}
