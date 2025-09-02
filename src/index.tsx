import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import { ConfigProvider } from "antd";
import App from "./App";
import { WidgetOptions } from "./types";
import "./styles/main.scss";
import { RootStore } from "./stores/RootStore";
import { StoreProvider } from "./stores/StoreProvider";

class WidgetCatalog {
  opts: WidgetOptions;
  constructor(opts: WidgetOptions) {
    this.opts = opts;
  }

  run = () => {
    const el = document.querySelector(this.opts.el);
    if (!el) {
      console.error(`[WidgetCatalog] element ${this.opts.el} not found`);
      return;
    }
    const root = createRoot(el as HTMLElement);
    const rootStore = new RootStore(this.opts.dealers);

    rootStore.init().then(() => {
      root.render(
        <StoreProvider store={rootStore}>
          <Router>
            <ConfigProvider prefixCls="ant-widget">
              <App />
            </ConfigProvider>
          </Router>
        </StoreProvider>,
      );
    });
  };
}

export default WidgetCatalog;

// @ts-expect-error: Attaching to window for async load
if (typeof window !== "undefined") window.WidgetCatalog = WidgetCatalog;
// This part is now inside the .then() block
