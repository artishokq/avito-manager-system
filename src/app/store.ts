import { configureStore } from "@reduxjs/toolkit";

import { adsListReducer } from "../features/adsList/adsListSlice";
import { adDetailsReducer } from "../features/adDetails/adDetailsSlice";

export const store = configureStore({
  reducer: {
    adsList: adsListReducer,
    adDetails: adDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
