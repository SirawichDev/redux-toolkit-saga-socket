import { combineReducers } from "redux";
import marketSlice from "../../features/ExchangeMarket/slice";

export default combineReducers({
    market: marketSlice
});