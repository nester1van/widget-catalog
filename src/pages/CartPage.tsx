import React from "react";
import { observer } from "mobx-react-lite";
import { List, Button, Empty, Typography } from "antd";
import { useStores } from "../stores/StoreProvider";
import { IGood } from "../types";

const { Title } = Typography;

const CartPage: React.FC = () => {
  const { cartStore, goodsStore } = useStores();

  const cartItems = Array.from(cartStore.items.entries())
    .map(([id, quantity]) => {
      const product = goodsStore.goods.find((g) => g.id === id);
      return { product, quantity };
    })
    .filter((item) => item.product) as { product: IGood; quantity: number }[];

  if (cartItems.length === 0) {
    return <Empty description="Корзина пуста" />;
  }

  return (
    <div>
      <Title level={2}>Корзина</Title>
      <List
        itemLayout="horizontal"
        dataSource={cartItems}
        renderItem={(item) => (
          <List.Item
            key={item.product.id}
            actions={[
              <Button
                key={`delete-${item.product.id}`}
                type="primary"
                danger
                onClick={() => cartStore.removeItem(item.product.id)}
              >
                Удалить
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={item.product.name}
              description={`Цена: ${item.product.price}`}
            />
            <div>Количество: {item.quantity}</div>
          </List.Item>
        )}
      />
      <Title level={4}>Итого: {cartStore.totalPrice.toFixed(2)}</Title>
      <Button type="primary" danger onClick={() => cartStore.clearCart()}>
        Очистить корзину
      </Button>
    </div>
  );
};

export default observer(CartPage);
