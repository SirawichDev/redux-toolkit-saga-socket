import {
  createSelector,
  createSlice,
  current,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { currencyFormatter } from "app/utils/currency";
export type TickerStream = {
  E: number;
  e: string;
  s: string;
  c: string;
  h: string;
  l: string;
  o: string;
  q: string;
  v: string;
};
export type MarketSocketState = {
  data: TickerStream[];
  connectStatus: {
    isConnecting: boolean;
    isConnected: boolean;
    isErrorConnected: boolean
  };
  isPairSelecting: boolean,
  pairSelected?: TickerStream;
};
const initialState: MarketSocketState = {
  data: [],
  connectStatus: {
    isErrorConnected: false,
    isConnecting: false,
    isConnected: false,
  },
  isPairSelecting: false,
  pairSelected: undefined,
};
export const marketSocketSlice = createSlice({
  name: "marketSocket",
  initialState,
  reducers: {
    initial(state, action: PayloadAction<any>) {
      // console.log('init', action.payload)
      state.connectStatus.isConnecting = true;
    },
    received(state, action: PayloadAction<MarketSocketState>) {
      const parsedData: TickerStream[] = JSON.parse(String(action.payload));
      // we need to keep only what data we want and update it
      if (state.data.length > 0) {
        state.data = parsedData.filter((ele: TickerStream) => {
          return state.data.some((item: TickerStream) => item.s === ele.s);
        });
      } else {
        // initial value to state.data
        state.data = parsedData.slice(0, 3);
      }
      state.data.sort((a, b) => a.s.localeCompare(b.s));
      if (state.pairSelected === undefined) {
        state.pairSelected = state.data[0];
      }
    },
    open(state, action: PayloadAction<any>) {
      state.connectStatus.isConnected = true;
      state.connectStatus.isConnecting = false;
    },
    close(state, action: PayloadAction<any>) {
      state.connectStatus.isConnected = false;
      state.connectStatus.isConnecting = false;
      state.connectStatus.isErrorConnected = false
    },
    error(state, action: PayloadAction<any>) {
      state.connectStatus.isConnected = false;
      state.connectStatus.isConnecting = false;
      state.connectStatus.isErrorConnected = true
      marketSocketSlice.actions.initial("")
    },
    selectPair(state, action: PayloadAction<TickerStream>) {
      state.pairSelected = action.payload;
      state.isPairSelecting = false
    },
  },
});

export const marketSocketActions = marketSocketSlice.actions;
export const marketSocketConnectStatus = (state: RootState) => state.marketSocket.connectStatus
export const marketSocket = (state: RootState) => state.marketSocket.data;
export const pairSelected = (state: RootState) =>
  state.marketSocket.pairSelected;

export const marketSocketSelector = createSelector(marketSocket, (item) => {
  return item.map((item: TickerStream) => ({
    ...item,
    s: item.s.toUpperCase().replace("_", "/"),
  }));
});

export const pairSelectedSelector = createSelector(pairSelected, (item) => {
  return {
    ...item,
    s: item?.s.toUpperCase().replace("_", "/"),
    c: currencyFormatter().format(Number(item?.c) ?? 0),
    q: currencyFormatter().format(Number(item?.q) ?? 0),
  };
});

export default marketSocketSlice.reducer;
