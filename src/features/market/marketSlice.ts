import {
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState, store } from "app/store";
import { push } from "connected-react-router";
import Router from "react-router-dom";
import { Ticker } from "features/market/models";
import { currencyFormatter } from "utils/currency";
export type MarketPayload = {};
export type MarketState = {
  data: Ticker[];
  itemSelected?: Ticker | null;
  loading: boolean;
  isSelecting: boolean
};
const initialState: MarketState = {
  data: [],
  itemSelected: null,
  isSelecting: false,
  loading: false,
};
export const marketSlice = createSlice({
  name: "market",
  initialState,
  reducers: {
    fetchMarket(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    fetchMarketSuccess(state, action: PayloadAction<Ticker[]>) {
      state.data = action.payload
        .sort((a, b) => b.quoteVolume - a.quoteVolume)
        .slice(0, 3);
      state.itemSelected = state.data[0];
      state.loading = false;
    },
    fetchPairDetail(state, action: PayloadAction<string>) {
      state.isSelecting = true
    },
    fetchMarketFailed(state, action: PayloadAction<string>) {
      state.loading = false;
    },
    selectPair(state, action: PayloadAction<Ticker>) {
      state.itemSelected = action.payload;
      state.isSelecting = false
    },
  },
});

// Action
export const marketAactions = marketSlice.actions;

// Selector
export const selectMarketLoading = (state: RootState) => state.market.loading;
export const marketList = (state: RootState) => state.market.data;
export const pairSelected = (state: RootState) => state.market.itemSelected;
export const pairSelecting = (state: RootState) => state.market.isSelecting;
export const marketListSelector = createSelector(marketList, (item) => {
  return item.map((item: Ticker) => ({
    ...item,
    name: item.symbol.toUpperCase().replace("_", "/"),
  }));
});
export const pairSelector = createSelector(pairSelected, (item) => {
  return {
    ...item,
    name: item?.symbol.toUpperCase().replace("_", "/"),
    lastPrice: currencyFormatter().format(item?.lastPrice ?? 0),
    volume: currencyFormatter().format(item?.volume ?? 0),
  };
});

// Reducer
export default marketSlice.reducer;
