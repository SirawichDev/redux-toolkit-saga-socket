import {
  Card,
  Col,
  List,
  Row,
  Spin,
  Statistic,
  Typography,
} from "antd";
import { useState } from "react";
import SkeletonList from "app/components/skeleton";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import {
  marketSocketActions,
  marketSocketSelector,
  pairSelectedSelector,
  TickerStream,
} from "features/marketSocket/modules/socket/socket.slice";
import { Content } from "antd/es/layout/layout";
import MarketLayoutNotifier from "features/marketSocket/components/marketLayoutNotifier";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
function ExchangeMarket() {
  const [activeId, setActive] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const marketTickers = useAppSelector(marketSocketSelector);
  const pairSelected = useAppSelector(pairSelectedSelector);
  const fetchDetail = (item: TickerStream, selectedIdx: number) => {
    // ;(history as any).pushState({}, null, ``);
    setActive(selectedIdx);
    dispatch(marketSocketActions.selectPair(item))
    
    window.history.replaceState({}, '', `${item.s.replace('/', '_').toUpperCase()}`);
  };
  return (
    <MarketLayoutNotifier>
        <Content>
          <Row justify={"center"} gutter={12} className="market__container">
            <Col span={12}>
              <SkeletonList row={4} loading={false}>
                <List
                  bordered
                  itemLayout="vertical"
                  dataSource={marketTickers}
                  renderItem={(item: TickerStream, idx: number) => (
                    <List.Item
                      className={`market-list ${
                        idx === activeId ? "active" : ""
                      }`}
                      onClick={() => fetchDetail(item, idx)}
                      key={item.s}
                    >
                      {item.s}
                    </List.Item>
                  )}
                />
              </SkeletonList>
            </Col>
            <Col span={6}>
              <Spin spinning={false}>
                <Card bordered size="default">
                  <Statistic
                    title={pairSelected?.s}
                    valueStyle={{ display: "none" }}
                  />
                  <Typography>{pairSelected?.c}</Typography>
                  <Typography>Volume: {pairSelected?.q}</Typography>
                </Card>
              </Spin>
            </Col>
          </Row>
        </Content>
    </MarketLayoutNotifier>
  );
}

export default ExchangeMarket;
