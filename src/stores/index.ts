import React from 'react';
import { RootStore } from './RootStore';

let store: RootStore;

export function initializeStore(initialDealers?: string[]) {
  store = new RootStore(initialDealers);
  return store;
}

const StoreContext = React.createContext<RootStore | undefined>(undefined);

export const StoreProvider = StoreContext.Provider;

export function useStores() {
  const context = React.useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStores must be used within a StoreProvider.');
  }
  return context;
}
