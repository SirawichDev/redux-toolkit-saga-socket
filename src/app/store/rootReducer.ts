import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import marketSocketSlice from 'features/marketSocket/modules/socket/socket.slice'
import { history } from "app/utils";

export default combineReducers({
    router: connectRouter(history),
    marketSocket: marketSocketSlice
});