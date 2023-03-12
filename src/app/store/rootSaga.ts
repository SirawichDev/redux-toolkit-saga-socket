import { all } from "redux-saga/effects";
import { marketSaga } from "features/market/modules/market.saga";


export default function* rootSaga() {
    yield all([
        marketSaga()
    ])
}