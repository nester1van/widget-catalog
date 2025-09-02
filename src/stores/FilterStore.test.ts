import { FilterStore } from "@/stores/FilterStore";
import { RootStore } from "@/stores/RootStore";

// Mock RootStore and its dependencies
jest.mock("./RootStore", () => ({
  RootStore: jest.fn(() => ({
    goodsStore: {
      fetchGoods: jest.fn(),
    },
  })),
}));

describe("FilterStore", () => {
  let rootStore: RootStore;

  beforeEach(() => {
    rootStore = new RootStore();
    // Clear mock history
    (rootStore.goodsStore.fetchGoods as jest.Mock).mockClear();
    // Reset URL
    window.history.replaceState({}, "", window.location.pathname);
  });

  it("should toggle a dealer", () => {
    const filterStore = new FilterStore(rootStore);
    filterStore.toggleDealer("dealer1");
    expect(filterStore.selectedDealers).toContain("dealer1");
    filterStore.toggleDealer("dealer1");
    expect(filterStore.selectedDealers).not.toContain("dealer1");
  });

  it("should cycle through price sort modes", () => {
    const filterStore = new FilterStore(rootStore);
    expect(filterStore.priceSort).toBe("off");
    filterStore.cyclePriceSort();
    expect(filterStore.priceSort).toBe("asc");
    filterStore.cyclePriceSort();
    expect(filterStore.priceSort).toBe("desc");
    filterStore.cyclePriceSort();
    expect(filterStore.priceSort).toBe("off");
  });

  it("should update URL when filters change", () => {
    const filterStore = new FilterStore(rootStore);
    filterStore.toggleDealer("dealer1");
    filterStore.cyclePriceSort();

    const params = new URLSearchParams(window.location.search);
    expect(params.get("dealers")).toBe("dealer1");
    expect(params.get("sort")).toBe("asc");
  });

  it("should load filters from URL on initialization", () => {
    window.history.replaceState({}, "", "?dealers=d1,d2&sort=desc");
    const filterStore = new FilterStore(rootStore);

    expect(filterStore.selectedDealers).toEqual(["d1", "d2"]);
    expect(filterStore.priceSort).toBe("desc");
  });

  it("should call fetchGoods when filters change", () => {
    const filterStore = new FilterStore(rootStore);
    filterStore.toggleDealer("dealer1");
    expect(rootStore.goodsStore.fetchGoods).toHaveBeenCalledWith(["dealer1"]);
  });
});
