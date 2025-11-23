import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import { fetchAdByIdApi, type FullAd } from "../../shared/api/adsApi";

export type AdDetailsState = {
  item: FullAd | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: AdDetailsState = {
  item: null,
  isLoading: false,
  error: null,
};

export const fetchAdById = createAsyncThunk<FullAd, string | number>(
  "adDetails/fetchById",
  async (id) => {
    return fetchAdByIdApi(id);
  }
);

const adDetailsSlice = createSlice({
  name: "adDetails",
  initialState,
  reducers: {
    clearAdDetails(state) {
      state.item = null;
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchAdById.fulfilled,
        (state, action: PayloadAction<FullAd>) => {
          state.isLoading = false;
          state.item = action.payload;
        }
      )
      .addCase(fetchAdById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Не удалось загрузить объявление";
      });
  },
});

export const { clearAdDetails } = adDetailsSlice.actions;
export const adDetailsReducer = adDetailsSlice.reducer;
