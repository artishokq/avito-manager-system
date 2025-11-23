import { configureStore } from "@reduxjs/toolkit";

import { adsListReducer } from "../features/adsList/adsListSlice";

export const store = configureStore({
  reducer: {
    adsList: adsListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
