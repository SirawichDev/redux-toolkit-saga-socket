import { fork, all } from "redux-saga/effects";
import { marketSaga } from "../../features/ExchangeMarket/saga";


export default function* rootSaga() {
    yield all([
        marketSaga()
    ])
}