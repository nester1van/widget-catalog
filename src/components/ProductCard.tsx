import React from 'react';
import { Card, Button, InputNumber } from 'antd';
import { observer } from 'mobx-react-lite';
import { useStores } from '../stores';
import { IGood } from '../types';

interface ProductCardProps {
  product: IGood;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cartStore } = useStores();
  const quantity = cartStore.items.get(product.id) || 0;

  return (
    <Card
      className="widget-catalog__product-card"
      hoverable
      cover={<img alt={product.name} src={product.image} loading="lazy" />}
    >
      <Card.Meta title={product.name} description={`Price: ${product.price}`} />
      <div className="widget-catalog__product-card-actions">
        {quantity > 0 ? (
          <>
            <Button onClick={() => cartStore.decrement(product.id)}>-</Button>
            <InputNumber
              min={1}
              value={quantity}
              onChange={(value) => {
                if (value) {
                  const newQuantity = Number(value);
                  const currentQuantity = quantity;
                  if (newQuantity > currentQuantity) {
                    for (let i = 0; i < newQuantity - currentQuantity; i++) {
                      cartStore.increment(product.id);
                    }
                  } else {
                    for (let i = 0; i < currentQuantity - newQuantity; i++) {
                      cartStore.decrement(product.id);
                    }
                  }
                }
              }}
            />
            <Button onClick={() => cartStore.increment(product.id)}>+</Button>
            <Button danger onClick={() => cartStore.removeItem(product.id)}>
              Delete
            </Button>
          </>
        ) : (
          <Button type="primary" onClick={() => cartStore.addItem(product.id)}>
            Add to cart
          </Button>
        )}
      </div>
    </Card>
  );
};

export default observer(ProductCard);
