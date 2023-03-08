import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MarketPayload = {};
export type MarketState = {
  data: any;
  loading: boolean;
};
const initialState: MarketState = {
  data: [],
  loading: false,
};
export const marketSlice = createSlice({
  name: "market",
  initialState,
  reducers: {
    fetchMarket(state, action: PayloadAction<string>) {
      state.loading = true;
    },
  },
  extraReducers: {},
});

export const marketAactions = marketSlice.actions;

export default marketSlice.reducer;
