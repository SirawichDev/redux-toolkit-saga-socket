import { eventChannel } from "redux-saga";
import { take, call, put, ActionPattern } from "redux-saga/effects";
import ReconnectingWebSocket from "reconnecting-websocket";
import {
  marketSocketActions,
} from "features/marketSocket/modules/socket/socket.slice";
import { Action } from "redux";
import { push } from "connected-react-router";
import { store } from "app/store";

const createWebsocketChannel = (ws: WebSocket) =>
  eventChannel((emitter) => {
    ws.addEventListener("message", (message: any) => {
      emitter(marketSocketActions.received(message.data));
    });
    ws.addEventListener("open", () => {
      emitter(marketSocketActions.open(""));
    });
    ws.addEventListener("error", () => {
      emitter(marketSocketActions.error(""));
    });

    ws.addEventListener("close", () => {
      emitter(marketSocketActions.close(""));
    });

    return () => ws.close();
  });

export function* websocketManager(url: string) {
  yield put(marketSocketActions.initial(""));
  const ws: any = new ReconnectingWebSocket(url, "", { minReconnectionDelay: 5000 });
  const wsChannel: ActionPattern = yield call(createWebsocketChannel, ws);
  
  let isFirstTime = false;

  while (true) {
    const reduxStore = store.getState();
    const action: Action<any> = yield take(wsChannel);
    if (!isFirstTime && reduxStore.marketSocket.data.length > 0) {
      yield put(
        push(`/market/${reduxStore.marketSocket.data[0].s.toUpperCase()}`)
      );
      isFirstTime = true;
    }
    yield put(action);
  }
}
