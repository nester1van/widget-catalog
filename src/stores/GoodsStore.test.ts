import { GoodsStore } from "@/stores/GoodsStore";
import { RootStore } from "@/stores/RootStore";
import { IGood } from "@/types";

// Mock RootStore and its dependencies
jest.mock("./RootStore", () => ({
  RootStore: jest.fn(() => ({
    filterStore: {
      priceSort: "off",
    },
  })),
}));

const mockGoods: IGood[] = [
  { id: "1", name: "A", price: 10, image: "" },
  { id: "2", name: "B", price: 20, image: "" },
  { id: "3", name: "C", price: 5, image: "" },
  { id: "4", name: "D", price: 15, image: "" },
];

describe("GoodsStore", () => {
  let rootStore: RootStore;

  beforeEach(() => {
    rootStore = new RootStore();
  });

  it("should sort goods by price ascending", () => {
    rootStore.filterStore.priceSort = "asc";
    const goodsStore = new GoodsStore(rootStore);
    goodsStore.goods = [...mockGoods];

    const sorted = goodsStore.sortedGoods;
    expect(sorted.map((g) => g.id)).toEqual(["3", "1", "4", "2"]);
  });

  it("should sort goods by price descending", () => {
    rootStore.filterStore.priceSort = "desc";
    const goodsStore = new GoodsStore(rootStore);
    goodsStore.goods = [...mockGoods];

    const sorted = goodsStore.sortedGoods;
    expect(sorted.map((g) => g.id)).toEqual(["2", "4", "1", "3"]);
  });

  it("should return unsorted goods when sort is off", () => {
    rootStore.filterStore.priceSort = "off";
    const goodsStore = new GoodsStore(rootStore);
    goodsStore.goods = [...mockGoods];

    const sorted = goodsStore.sortedGoods;
    expect(sorted.map((g) => g.id)).toEqual(["1", "2", "3", "4"]);
  });


  it("should return 8 carousel goods, supplementing with other goods if filtered are less than 8", () => {
    const goodsStore = new GoodsStore(rootStore);
    goodsStore.goods = [
      { id: "1", name: "A", price: 10, image: "" }, // filtered
      { id: "2", name: "B", price: 20, image: "" }, // filtered
      { id: "3", name: "C", price: 5, image: "" },
      { id: "4", name: "D", price: 15, image: "" }, // filtered
      { id: "5", name: "E", price: 1, image: "" },
      { id: "6", name: "F", price: 2, image: "" },
      { id: "7", name: "G", price: 3, image: "" },
      { id: "8", name: "H", price: 4, image: "" },
      { id: "9", name: "I", price: 6, image: "" },
      { id: "10", name: "J", price: 7, image: "" },
    ];

    const carouselGoods = goodsStore.mainCarouselGoods;
    expect(carouselGoods.length).toBe(8);
    // Ensure filtered items are included and then supplemented
    expect(carouselGoods.some((g) => g.id === "1")).toBe(true);
    expect(carouselGoods.some((g) => g.id === "2")).toBe(true);
    expect(carouselGoods.some((g) => g.id === "4")).toBe(true);
    // Check that other items are added to reach 8
    expect(carouselGoods.some((g) => g.id === "3")).toBe(true);
    expect(carouselGoods.some((g) => g.id === "5")).toBe(true);
    expect(carouselGoods.some((g) => g.id === "6")).toBe(true);
    expect(carouselGoods.some((g) => g.id === "7")).toBe(true);
    expect(carouselGoods.some((g) => g.id === "8")).toBe(true);
    expect(carouselGoods.some((g) => g.id === "9")).toBe(false); // Should not be included as we only need 5 more
  });

  it("should return first 8 items if no items meet the price criteria", () => {
    const goodsStore = new GoodsStore(rootStore);
    goodsStore.goods = Array.from({ length: 10 }, (_, i) => ({
      id: `${i}`,
      name: `G${i}`,
      price: 1, // All prices less than 10
      image: "",
    }));

    const carouselGoods = goodsStore.mainCarouselGoods;
    expect(carouselGoods.length).toBe(8);
    expect(carouselGoods.every((g) => g.price === 1)).toBe(true);
    expect(carouselGoods.map((g) => g.id)).toEqual(["0", "1", "2", "3", "4", "5", "6", "7"]);
  });
});
