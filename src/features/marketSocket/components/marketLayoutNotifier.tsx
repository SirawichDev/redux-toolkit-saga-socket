import { Layout, message } from "antd";
import { Header } from "antd/es/layout/layout";
import { useAppDispatch, useAppSelector } from "app/store/hooks";

import React, { FC, useEffect } from "react";
import { marketSocketConnectStatus } from "../modules/socket/socket.slice";
type MarketLayoutNotifierProps = {
  children: React.ReactNode;
};
const MarketLayoutNotifier: FC<MarketLayoutNotifierProps> = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { isConnected, isConnecting, isErrorConnected } = useAppSelector(
    marketSocketConnectStatus
  );
  const key = 'updatable';
  useEffect(() => {
    if (isConnecting) {
      messageApi.open({
        key,
        type: "loading",
        content: "Satang websocket connecting... 🦄",
      });
    }
  }, [isConnecting]);
  useEffect(() => {
    if (isConnected) {
      messageApi.open({
        key,
        type: "success",
        content: "Satang websocket connected",
      });
    }
  }, [isConnected]);
  useEffect(() => {
    if (isErrorConnected) {
      messageApi.open({
        key,
        type: "error",
        content: "Something went wrong please try again",
      });
    }
  }, [isErrorConnected]);
  return (
    <Layout className="market">
      {contextHolder}
      <Header className="market__header"></Header>
      {children}
    </Layout>
  );
};

export default MarketLayoutNotifier;
