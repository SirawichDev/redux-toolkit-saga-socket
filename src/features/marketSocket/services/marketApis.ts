import { AxiosResponse, AxiosStatic } from "axios";
import { get } from "app/network/client";

const URL = {
  GET_24HR_TICKER: "v3/ticker/24hr",
  GET_FLAT_CURRENCY: "fiat-currency/",
};
const marketApi = {
  get24hrTickers(
    symbol: string = ''
  ): Promise<AxiosResponse<Array<Record<string, any>>>> {
    return get(`${URL.GET_24HR_TICKER}${symbol ? `?symbol=${symbol}`: ''}`);
  },
  getFlatCurrency(): Promise<AxiosResponse<Array<Record<string, any>>>> {
    return get(URL.GET_FLAT_CURRENCY);
  },
};

export default marketApi;
