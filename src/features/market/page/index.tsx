import {
  Card,
  Col,
  Layout,
  List,
  Row,
  Skeleton,
  Space,
  Spin,
  Statistic,
  Typography,
} from "antd";
import Avatar from "antd/es/avatar/avatar";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import SkeletonList from "app/components/skeleton";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import { Ticker } from "features/market/models";
import {
  marketAactions,
  marketListSelector,
  pairSelecting,
  pairSelector,
  selectMarketLoading,
} from "features/market/marketSlice";
import { Content, Header } from "antd/es/layout/layout";
import Paragraph from "antd/es/skeleton/Paragraph";
function ExchangeMarket() {
  const [activeId, setActive] = useState(0)
  const { exchange_name } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log('paramss', exchange_name)
  }, [exchange_name])
  useEffect(() => {
    dispatch(marketAactions.fetchMarket(""));
  }, [dispatch]);

  const marketTickers = useAppSelector(marketListSelector);
  console.log("🚀 ~ file: index.tsx:42 ~ ExchangeMarket ~ marketTickers:", marketTickers)
  const pairSelected = useAppSelector(pairSelector)
  console.log("🚀 ~ file: index.tsx:41 ~ ExchangeMarket ~ pairSelected:", pairSelected)
  // console.log("🚀 ~ file: index.tsx:36 ~ ExchangeMarket ~ marketTickers:", marketTickers)
  const dataLoading = useAppSelector(selectMarketLoading);
  const isPairSelecting = useAppSelector(pairSelecting)
  const fetchDetail = (item: Ticker, selectedIdx: number) => {
    setActive(selectedIdx)
    // make it refetch every 5 seconds
    dispatch(marketAactions.fetchPairDetail(item.symbol))
  };
  return (
    <>
      <Layout className="market">
        <Header className="market__header"></Header>
        <Content>
          <Row gutter={12} className="market__container">
            <Col span={12}>
              <SkeletonList row={4} loading={dataLoading}>
                <List
                  bordered
                  itemLayout="vertical"
                  dataSource={marketTickers}
                  renderItem={(item: Ticker, idx: number) => (
                    <List.Item
                      className={`market-list ${idx === activeId ? 'active': ''}`}
                      onClick={() => fetchDetail(item, idx)}
                      key={item.symbol}
                    >
                      {item.name}
                    </List.Item>
                  )}
                />
              </SkeletonList>
            </Col>
            <Col span={6}>
              <Spin spinning={isPairSelecting}>
              <Card bordered size="default">
                <Statistic title={pairSelected?.name} valueStyle={{ display: 'none'}}/>
                <Typography>{pairSelected?.lastPrice}</Typography>
                <Typography>Volume: {pairSelected?.volume}</Typography>
              </Card>
              </Spin>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
}

export default ExchangeMarket;
