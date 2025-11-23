import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import {
  fetchAdsApi,
  type Ad,
  type AdsResponse,
} from "../../shared/api/adsApi";
import type { FiltersState } from "../../pages/ListPage/components/FiltersPanel/FilterPanel";
import type { SortState } from "../../pages/ListPage/components/SortPanel/SortPanel";

const PAGE_SIZE = 10;

const initialFilters: FiltersState = {
  statuses: [],
  categoryId: null,
  priceFrom: null,
  priceTo: null,
  search: "",
};

const initialSort: SortState = {
  field: "createdAt",
  direction: "desc",
};

export type CategoryOption = {
  id: number;
  name: string;
};

export type AdsListState = {
  items: Ad[];
  total: number;
  page: number;
  pageSize: number;
  filters: FiltersState;
  sort: SortState;
  isLoading: boolean;
  error: string | null;
  categories: CategoryOption[];
};

const initialState: AdsListState = {
  items: [],
  total: 0,
  page: 1,
  pageSize: PAGE_SIZE,
  filters: initialFilters,
  sort: initialSort,
  isLoading: false,
  error: null,
  categories: [],
};

export const fetchAds = createAsyncThunk<
  AdsResponse,
  void,
  { state: { adsList: AdsListState } }
>("adsList/fetchAds", async (_, thunkApi) => {
  const state = thunkApi.getState().adsList;
  return fetchAdsApi(state.page, state.pageSize, state.filters, state.sort);
});

const adsListSlice = createSlice({
  name: "adsList",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<FiltersState>) {
      state.filters = action.payload;
      state.page = 1;
    },
    resetFilters(state) {
      state.filters = initialFilters;
      state.page = 1;
    },
    setSort(state, action: PayloadAction<SortState>) {
      state.sort = action.payload;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items || [];
        state.total = action.payload.total ?? 0;
        state.page = action.payload.page ?? state.page;
        state.pageSize = action.payload.limit ?? state.pageSize;

        // наполняем список категорий один раз, из всех пришедших объявлений
        const categoriesMap = new Map<number, string>();
        state.items.forEach((ad) => {
          if (ad.categoryId != null && ad.category) {
            categoriesMap.set(ad.categoryId, ad.category);
          }
        });
        const newCategories = Array.from(categoriesMap.entries()).map(
          ([id, name]) => ({ id, name })
        );

        // объединяем с уже существующими
        const mergedMap = new Map<number, string>();
        state.categories.forEach((c) => mergedMap.set(c.id, c.name));
        newCategories.forEach((c) => mergedMap.set(c.id, c.name));
        state.categories = Array.from(mergedMap.entries())
          .map(([id, name]) => ({ id, name }))
          .sort((a, b) => a.name.localeCompare(b.name, "ru"));
      })
      .addCase(fetchAds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Не удалось загрузить объявления";
        console.error("fetchAds error:", action.error);
      });
  },
});

export const { setFilters, resetFilters, setSort, setPage } =
  adsListSlice.actions;
export const adsListReducer = adsListSlice.reducer;
