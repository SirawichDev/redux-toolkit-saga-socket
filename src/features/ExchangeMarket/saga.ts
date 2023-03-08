import { PayloadAction } from "@reduxjs/toolkit";
import { take, fork, call, takeEvery, takeLatest } from "redux-saga/effects";
import { marketAactions, MarketPayload } from "./slice";

function* watchStartedFlow() {
  console.log("started");
}

function* fetchMarketList() {
  console.log("fetching");
}

export function* marketSaga() {
//   yield fork(watchStartedFlow);
  yield takeLatest(marketAactions.fetchMarket.type, fetchMarketList);
}
