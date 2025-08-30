import { GoodsStore } from './GoodsStore';
import { RootStore } from './RootStore';
import { IGood } from '../types';

// Mock RootStore and its dependencies
jest.mock('./RootStore', () => ({
  RootStore: jest.fn(() => ({
    filterStore: {
      priceSort: 'off',
    },
  })),
}));

const mockGoods: IGood[] = [
  { id: '1', name: 'A', price: 10, image: '' },
  { id: '2', name: 'B', price: 20, image: '' },
  { id: '3', name: 'C', price: 5, image: '' },
  { id: '4', name: 'D', price: 15, image: '' },
];

describe('GoodsStore', () => {
  let rootStore: RootStore;

  beforeEach(() => {
    rootStore = new RootStore();
  });

  it('should sort goods by price ascending', () => {
    rootStore.filterStore.priceSort = 'asc';
    const goodsStore = new GoodsStore(rootStore);
    goodsStore.goods = [...mockGoods];
    
    const sorted = goodsStore.sortedGoods;
    expect(sorted.map(g => g.id)).toEqual(['3', '1', '4', '2']);
  });

  it('should sort goods by price descending', () => {
    rootStore.filterStore.priceSort = 'desc';
    const goodsStore = new GoodsStore(rootStore);
    goodsStore.goods = [...mockGoods];
    
    const sorted = goodsStore.sortedGoods;
    expect(sorted.map(g => g.id)).toEqual(['2', '4', '1', '3']);
  });

  it('should return unsorted goods when sort is off', () => {
    rootStore.filterStore.priceSort = 'off';
    const goodsStore = new GoodsStore(rootStore);
    goodsStore.goods = [...mockGoods];
    
    const sorted = goodsStore.sortedGoods;
    expect(sorted.map(g => g.id)).toEqual(['1', '2', '3', '4']);
  });

  it('should return main carousel goods with price >= 10', () => {
    const goodsStore = new GoodsStore(rootStore);
    goodsStore.goods = [
      ...mockGoods,
      { id: '5', name: 'E', price: 25, image: '' },
      { id: '6', name: 'F', price: 30, image: '' },
    ];
    
    const carouselGoods = goodsStore.mainCarouselGoods;
    expect(carouselGoods.length).toBe(5);
    expect(carouselGoods.every(g => g.price >= 10)).toBe(true);
  });

  it('should return fallback carousel goods if not enough items >= 10', () => {
    const goodsStore = new GoodsStore(rootStore);
    goodsStore.goods = mockGoods; // Only 3 items >= 10
    
    const carouselGoods = goodsStore.mainCarouselGoods;
    expect(carouselGoods.length).toBe(4); // All goods
  });

  it('should return first 8 items for fallback if more than 8 exist', () => {
    const goodsStore = new GoodsStore(rootStore);
    goodsStore.goods = Array.from({ length: 10 }, (_, i) => ({
      id: `${i}`, name: `G${i}`, price: 1, image: ''
    }));
    
    const carouselGoods = goodsStore.mainCarouselGoods;
    expect(carouselGoods.length).toBe(8);
  });
});
