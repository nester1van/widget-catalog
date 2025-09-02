import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Spin, Alert, Row, Col, Typography } from "antd";
import { useStores } from "@/stores/StoreProvider";
import ProductCard from "@/components/ProductCard";
import Filters from "@/components/Filters";
import { IGood } from "@/types";

const { Title, Paragraph } = Typography;

const CatalogPage: React.FC = () => {
  const { goodsStore } = useStores();

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
      <Title level={2}>Каталог</Title>
      <Paragraph>Найдите идеальные инструменты для разработки</Paragraph>
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
