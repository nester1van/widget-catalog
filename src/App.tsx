import React, { Suspense } from "react";
import { Spin } from "antd";
import { Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import Header from "@/components/Header";

const { Content } = Layout;
const MainPage = React.lazy(() => import('@/pages/MainPage'));
const CatalogPage = React.lazy(() => import('@/pages/CatalogPage'));
const CartPage = React.lazy(() => import('@/pages/CartPage'));  

const App: React.FC = () => {
  return (
    <Layout>
      <Header />
      <Content className="widget-catalog__content">
        <div className="widget-catalog__inner-content">
          <Suspense fallback={<Spin size="large" className="widget-catalog__full-page-spinner" />}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </Suspense>
        </div>
      </Content>
    </Layout>
  );
};

export default App;
