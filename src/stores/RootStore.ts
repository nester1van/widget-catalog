import { DealersStore } from './DealersStore';
import { FilterStore } from './FilterStore';
import { GoodsStore } from './GoodsStore';
import { CartStore } from './CartStore';

export class RootStore {
  dealersStore: DealersStore;
  filterStore: FilterStore;
  goodsStore: GoodsStore;
  cartStore: CartStore;

  constructor(initialDealers?: string[]) {
    this.dealersStore = new DealersStore();
    this.goodsStore = new GoodsStore(this);
    this.filterStore = new FilterStore(this);
    this.cartStore = new CartStore();

    if (initialDealers) {
      this.filterStore.setSelectedDealers(initialDealers);
    }
  }
}
