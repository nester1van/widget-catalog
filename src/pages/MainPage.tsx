import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Carousel, Spin, Alert } from "antd";
import { useStores } from "../stores/StoreProvider";
import ProductCard from "../components/ProductCard";
import { IGood } from "../types";

const MainPage: React.FC = () => {
  const { goodsStore, dealersStore } = useStores();

  useEffect(() => {
    if (!dealersStore.dealers.length) {
      dealersStore.fetchDealers();
    }
    if (!goodsStore.goods.length) {
      goodsStore.fetchGoods();
    }
  }, [dealersStore, goodsStore]);

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
    dots: true,
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
      <h1>Главная страница</h1>
      <Carousel {...carouselSettings}>
        {goodsStore.mainCarouselGoods.map((good: IGood) => (
          <div key={good.id}>
            <ProductCard product={good} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default observer(MainPage);
