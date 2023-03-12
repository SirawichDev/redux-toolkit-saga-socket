import { fork, all } from "redux-saga/effects";
import { marketSaga } from "features/market/marketSaga";


export default function* rootSaga() {
    yield all([
        marketSaga()
    ])
}