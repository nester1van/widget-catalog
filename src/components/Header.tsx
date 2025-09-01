import React from 'react';
import { Layout, Menu, Badge } from 'antd';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/stores/StoreProvider';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const { cartStore } = useStores();

  return (
    <Layout.Header className="widget-catalog__header">
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/catalog">Catalog</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/cart">
            <Badge count={cartStore.totalQuantity}>
              Cart
            </Badge>
          </Link>
        </Menu.Item>
      </Menu>
    </Layout.Header>
  );
};

export default observer(Header);
