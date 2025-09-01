import React from "react";
import { render } from "@testing-library/react";
import { StoreProvider, useStores } from "./StoreProvider";
import { RootStore } from "./RootStore";

describe("StoreProvider", () => {
  it("should provide the store to child components", () => {
    const rootStore = new RootStore();
    let storeFromHook: RootStore | null = null;

    const TestComponent = () => {
      storeFromHook = useStores();
      return null;
    };

    render(
      <StoreProvider store={rootStore}>
        <TestComponent />
      </StoreProvider>,
    );

    expect(storeFromHook).toBe(rootStore);
  });

  it("should throw an error if useStores is used outside of a StoreProvider", () => {
    const TestComponent = () => {
      useStores();
      return null;
    };

    // Prevent console.error from cluttering the test output
    const originalError = console.error;
    console.error = jest.fn();

    expect(() => render(<TestComponent />)).toThrow(
      "useStores must be used within a StoreProvider",
    );

    // Restore console.error
    console.error = originalError;
  });
});
