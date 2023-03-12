import { current, PayloadAction } from "@reduxjs/toolkit";
import {
  take,
  fork,
  call,
  takeEvery,
  takeLatest,
  put,
  delay,
} from "redux-saga/effects";
import { FlatCurrency, Ticker } from "./models";
import marketApi from "./services/marketApis";
import { marketAactions, MarketPayload } from "features/market/marketSlice";
import { push } from "connected-react-router";

function* fetchMarketList() {
  try {
    // yield delay(5000);
    const currency: FlatCurrency[] = yield call(marketApi.getFlatCurrency)
    console.log("🚀 ~ file: marketSaga.ts:20 ~ function*fetchMarketList ~ currency:", currency)
    const response: Ticker[] = yield call(marketApi.get24hrTickers);
    if (Array.isArray(response)) {
      yield put(push(`/market/${response[0].symbol.toUpperCase()}`))
      yield put(marketAactions.fetchMarketSuccess(response));
    }
  } catch (error: unknown) {
    const castErr = error as Error;
    console.log(`Failed to fetch ticker list`, castErr);
    yield put(marketAactions.fetchMarketFailed(castErr.message));
  }
}

function* fetchPairDetail(action: PayloadAction<string>) {
  const response: Ticker = yield call(marketApi.get24hrTickers, action.payload);
  yield put(marketAactions.selectPair(response))

  while(true) {
    yield delay(5000)
    const response: Ticker = yield call(marketApi.get24hrTickers, action.payload);
    yield put(marketAactions.selectPair(response))
  }
}

export function* marketSaga() {
  yield takeLatest(marketAactions.fetchMarket.type, fetchMarketList);
  yield takeLatest(marketAactions.fetchPairDetail.type, fetchPairDetail)
}
