import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { WidgetOptions } from './types';
import './styles/main.scss';

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
    root.render(<App initialDealers={this.opts.dealers} />);
  }
}

export default WidgetCatalog;

// @ts-expect-error: Attaching to window for async load
if (typeof window !== 'undefined') window.WidgetCatalog = WidgetCatalog;
