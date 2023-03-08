import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { marketAactions } from "../slice";
function ExchangeMarket() {
  const { exchange_name } = useParams();
  const dispatch = useAppDispatch();
  console.log(
    "🚀 ~ file: index.tsx:4 ~ ExchangeMarket ~ exchange_name:",
    exchange_name
  );
  useEffect(() => {
    dispatch(marketAactions.fetchMarket('hellow'));
  }, [dispatch]);
  return <>Hello {exchange_name}</>;
}

export default ExchangeMarket;
