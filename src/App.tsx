import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import CatalogPage from "./pages/CatalogPage";
import CartPage from "./pages/CartPage";
import { useStores } from "./stores/StoreProvider";

const { Content } = Layout;

const App: React.FC = () => {
  const { goodsStore } = useStores();

  useEffect(() => {
    goodsStore.fetchGoods();
  }, [goodsStore]);

  return (
    <Layout>
      <Header />
      <Content className="widget-catalog__content">
        <div className="widget-catalog__inner-content">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </Content>
    </Layout>
  );
};

export default App;
