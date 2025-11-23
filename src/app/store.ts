import { configureStore } from "@reduxjs/toolkit";

import { adsListReducer } from "../features/adsList/adsListSlice";
import { adDetailsReducer } from "../features/adDetails/adDetailsSlice";
import { statsReducer } from "../features/stats/statsSlice";

export const store = configureStore({
  reducer: {
    adsList: adsListReducer,
    adDetails: adDetailsReducer,
    stats: statsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
