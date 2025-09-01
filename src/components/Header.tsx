import React from 'react';
import { Layout, Menu, Badge } from 'antd';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/stores/StoreProvider';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const { cartStore } = useStores();

  const items = [
    {
      key: '1',
      label: <Link to="/">Главная</Link>,
    },
    {
      key: '2',
      label: <Link to="/catalog">Каталог</Link>,
    },
    {
      key: '3',
      label: (
        <Link to="/cart">
          <Badge count={cartStore.totalQuantity}>Корзина</Badge>
        </Link>
      ),
    },
  ];

  return (
    <Layout.Header className="widget-catalog__header">
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        items={items}
      />
    </Layout.Header>
  );
};

export default observer(Header);
