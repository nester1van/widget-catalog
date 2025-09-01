import React from "react";
import { Layout, Menu, Badge } from "antd";
import { observer } from "mobx-react-lite";
import { useStores } from "@/stores/StoreProvider";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const { cartStore } = useStores();
  const { pathname } = useLocation();

  const items = [
    {
      key: "/",
      label: <Link to="/">Главная</Link>,
    },
    {
      key: "/catalog",
      label: <Link to="/catalog">Каталог</Link>,
    },
    {
      key: "/cart",
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
        selectedKeys={[pathname]}
        items={items}
      />
    </Layout.Header>
  );
};

export default observer(Header);
