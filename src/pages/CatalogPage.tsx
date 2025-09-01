import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Spin, Alert, Row, Col } from "antd";
import { useStores } from "../stores/StoreProvider";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import { IGood } from "../types";

const CatalogPage: React.FC = () => {
  const { goodsStore } = useStores();

  useEffect(() => {
    if (!goodsStore.goods.length) {
      goodsStore.fetchGoods();
    }
  }, [goodsStore]);

  if (goodsStore.loading) {
    return <Spin size="large" />;
  }

  if (goodsStore.error) {
    return (
      <Alert
        message="Ошибка"
        description={goodsStore.error}
        type="error"
        showIcon
      />
    );
  }

  return (
    <div>
      <h1>Каталог</h1>
      <Filters />
      <Row gutter={[16, 16]}>
        {goodsStore.sortedGoods.map((good: IGood) => (
          <Col xs={24} sm={12} md={8} lg={6} key={good.id}>
            <ProductCard product={good} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default observer(CatalogPage);
