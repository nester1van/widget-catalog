import React from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { List, Button, Empty, Typography, InputNumber, Spin, Popconfirm } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import { useStores } from "../stores/StoreProvider";
import { IGood } from "../types";

const { Title, Paragraph } = Typography;

const CartPage: React.FC = () => {
  const { cartStore, goodsStore } = useStores();

  if (goodsStore.loading) {
    return <Spin />;
  }

  const cartItems = Array.from(cartStore.items.entries())
    .map(([id, quantity]) => {
      const product = goodsStore.goods.find((g) => g.id === id);
      return { product, quantity };
    })
    .filter((item) => item.product) as { product: IGood; quantity: number }[];

  if (cartItems.length === 0) {
    return (<div style={{ display: 'flex', justifyContent: 'center' }}>
      <Empty 
        description="Корзина пуста"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      >
        <p>Добавьте товары из каталога, чтобы сделать заказ</p>
        <Link to="/catalog">
          <Button type="default" style={{ marginTop: 16 }}>
            Перейти в каталог
          </Button>
        </Link>
      </Empty>
    </div>);
  }

  return (
    <div>
      <Title level={2}>Корзина</Title>
      <Paragraph>Проверьте выбранные товары перед оформлением заказа</Paragraph>
      <List
        itemLayout="horizontal"
        dataSource={cartItems}
        renderItem={(item) => (
          <List.Item
            key={item.product.id}
            actions={[
              <div
                style={{ display: "flex", alignItems: "center" }}
                key={`quantity-${item.product.id}`}
              >
                <Button
                  onClick={() => cartStore.decrement(item.product.id)}
                  disabled={item.quantity <= 1}
                >
                  -
                </Button>
                <InputNumber
                  min={1}
                  value={item.quantity}
                  onChange={(value) =>
                    cartStore.updateItemQuantity(
                      item.product.id,
                      value as number,
                    )
                  }
                  style={{ margin: "0 8px", width: "60px" }}
                />
                <Button onClick={() => cartStore.increment(item.product.id)}>
                  +
                </Button>
              </div>,
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
          </List.Item>
        )}
      />
      <Title level={4}>Итого: {cartStore.totalPrice.toFixed(2)}</Title>
      <Popconfirm
        title="Очистить корзину?"
        description="Все товары будут удалены из корзины"
        onConfirm={() => cartStore.clearCart()}
        okText="Очистить"
        cancelText="Отмена"
        okType="danger"
      >
        <Button type="primary" danger icon={<DeleteOutlined />}>
          Очистить корзину
        </Button>
      </Popconfirm>
    </div>
  );
};

export default observer(CartPage);
