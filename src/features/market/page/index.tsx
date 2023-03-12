import {
  Card,
  Col,
  Layout,
  List,
  Row,
  Spin,
  Statistic,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import SkeletonList from "app/components/skeleton";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import { Ticker } from "features/market/models";
import {
  marketAactions,
  marketListSelector,
  pairSelecting,
  pairSelector,
  selectMarketLoading,
} from "features/market/modules/market.slice";
import { Content, Header } from "antd/es/layout/layout";
function ExchangeMarket() {
  const [activeId, setActive] = useState(0)
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(marketAactions.fetchMarket(""));
  }, [dispatch]);

  const marketTickers = useAppSelector(marketListSelector);
  const pairSelected = useAppSelector(pairSelector)
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
          <Row justify={'center'} gutter={12} className="market__container">
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
