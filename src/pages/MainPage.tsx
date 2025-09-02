import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Button, Carousel, Spin, Alert, Typography } from "antd";
import { useStores } from "@/stores/StoreProvider";
import ProductCard from "@/components/ProductCard";
import { IGood } from "@/types";

const { Title, Paragraph } = Typography;

const MainPage: React.FC = () => {
  const { goodsStore, dealersStore } = useStores();

  if (goodsStore.loading || dealersStore.loading) {
    return <Spin size="large" />;
  }

  if (goodsStore.error || dealersStore.error) {
    return (
      <Alert
        message="Ошибка"
        description={goodsStore.error || dealersStore.error}
        type="error"
        showIcon
      />
    );
  }

  const carouselSettings = {
    arrows: true,
    dragable: true,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Title level={2}>Популярные товары</Title>
      <Paragraph>
        Откройте для себя лучшие инструменты разработки по выгодным ценам
      </Paragraph>
      <Carousel {...carouselSettings} className="widget-catalog__carousel">
        {goodsStore.mainCarouselGoods.map((good: IGood) => (
          <div key={good.id}>
            <ProductCard product={good} />
          </div>
        ))}
      </Carousel>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link to="/catalog">
          <Button type="default" style={{ marginTop: 16 }}>
            Смотреть весь каталог
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default observer(MainPage);
