import { fork, all, takeEvery, takeLatest } from "redux-saga/effects";
import { websocketManager } from 'features/marketSocket/modules/socket/socket.saga'
export default function* rootSaga() {
    yield all([
        fork(websocketManager, String(process.env.SATANG_WEB_SOCKET)),
    ])
}