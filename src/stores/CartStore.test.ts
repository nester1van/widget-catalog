import { CartStore } from "@/stores/CartStore";
import { RootStore } from "@/stores/RootStore";

jest.mock("./RootStore", () => ({
  RootStore: jest.fn(() => ({
    goodsStore: {
      goods: [],
    },
  })),
}));

const CART_TTL = 10 * 60 * 1000;

describe("CartStore", () => {
  let rootStore: RootStore;

  beforeEach(() => {
    localStorage.clear();
    jest.useFakeTimers();
    rootStore = new RootStore();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should add an item to the cart", () => {
    const cartStore = new CartStore(rootStore);
    cartStore.addItem("item1");
    expect(cartStore.items.get("item1")).toBe(1);
  });

  it("should increment an item in the cart", () => {
    const cartStore = new CartStore(rootStore);
    cartStore.addItem("item1");
    cartStore.increment("item1");
    expect(cartStore.items.get("item1")).toBe(2);
  });

  it("should decrement an item in the cart", () => {
    const cartStore = new CartStore(rootStore);
    cartStore.addItem("item1");
    cartStore.increment("item1");
    cartStore.decrement("item1");
    expect(cartStore.items.get("item1")).toBe(1);
  });

  it("should remove an item if quantity becomes zero", () => {
    const cartStore = new CartStore(rootStore);
    cartStore.addItem("item1");
    cartStore.decrement("item1");
    expect(cartStore.items.has("item1")).toBe(false);
  });

  it("should remove an item from the cart", () => {
    const cartStore = new CartStore(rootStore);
    cartStore.addItem("item1");
    cartStore.removeItem("item1");
    expect(cartStore.items.has("item1")).toBe(false);
  });

  it("should clear the cart", () => {
    const cartStore = new CartStore(rootStore);
    cartStore.addItem("item1");
    cartStore.addItem("item2");
    cartStore.clearCart();
    expect(cartStore.items.size).toBe(0);
  });

  it("should calculate total quantity correctly", () => {
    const cartStore = new CartStore(rootStore);
    cartStore.addItem("item1");
    cartStore.increment("item1");
    cartStore.addItem("item2");
    expect(cartStore.totalQuantity).toBe(3);
  });

  it("should calculate total price correctly", () => {
    rootStore.goodsStore.goods = [
      { id: "item1", name: "A", price: 10, image: "" },
      { id: "item2", name: "B", price: 20, image: "" },
    ];
    const cartStore = new CartStore(rootStore);
    cartStore.addItem("item1");
    cartStore.increment("item1"); // 2 * 10
    cartStore.addItem("item2");   // 1 * 20
    expect(cartStore.totalPrice).toBe(40);
  });

  it("should save to and load from localStorage", () => {
    const cartStore = new CartStore(rootStore);
    cartStore.addItem("item1");
    cartStore.addItem("item2");

    const newCartStore = new CartStore(rootStore);
    expect(newCartStore.items.get("item1")).toBe(1);
    expect(newCartStore.items.get("item2")).toBe(1);
    expect(newCartStore.totalQuantity).toBe(2);
  });

  it("should clear cart if TTL is expired", () => {
    const cartStore = new CartStore(rootStore);
    cartStore.addItem("item1");

    // Fast-forward time
    jest.advanceTimersByTime(CART_TTL + 1);

    const newCartStore = new CartStore(rootStore);
    expect(newCartStore.totalQuantity).toBe(0);
  });
});
