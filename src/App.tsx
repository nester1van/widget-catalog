import React, { useEffect } from 'react';
import { getDealers } from './services/api';

interface Props {
  initialDealers?: string[] | undefined;
}

const App: React.FC<Props> = ({ initialDealers }) => {

  return (
    <div className="widget-catalog__root">
      <div style={{ padding: 16 }}>
        <h3>Widget Catalog</h3>
        <div>Initial dealers: {initialDealers?.join(', ') ?? 'all'}</div>
      </div>
    </div>
  );
};

export default App;
