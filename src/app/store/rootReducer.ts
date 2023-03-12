import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import marketSlice from "features/market/marketSlice";
import { history } from "utils";

export default combineReducers({
    router: connectRouter(history),
    market: marketSlice
});