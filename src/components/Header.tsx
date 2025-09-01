import React from "react";
import { Layout, Menu, Badge } from "antd";
import { 
  HomeOutlined,
  AppstoreOutlined, 
  ShoppingCartOutlined 
} from '@ant-design/icons';
import { observer } from "mobx-react-lite";
import { useStores } from "@/stores/StoreProvider";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const { cartStore } = useStores();
  const { pathname } = useLocation();

  const items = [
    {
      key: "/",
      icon: <HomeOutlined style={{ color: "white" }} />,
      label: <Link to="/">Главная</Link>,
    },
    {
      key: "/catalog",
      icon: <AppstoreOutlined style={{ color: "white" }} />,
      label: <Link to="/catalog">Каталог</Link>,
    },
    {
      key: "/cart",
      icon: <ShoppingCartOutlined style={{ color: "white" }} />,
      label: (
        <Link to="/cart">
          <Badge count={cartStore.totalQuantity} offset={[10, -5]}>
            <span style={{ color: "white" }}>Корзина</span>
          </Badge>
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
