import React, { createContext, useContext } from "react";
import { RootStore } from "./RootStore";

const StoreContext = createContext<RootStore | null>(null);

export const StoreProvider: React.FC<{
  children: React.ReactNode;
  store: RootStore;
}> = ({ children, store }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStores = () => {
  const context = useContext(StoreContext);
  if (context === null) {
    throw new Error("useStores must be used within a StoreProvider");
  }
  return context;
};
