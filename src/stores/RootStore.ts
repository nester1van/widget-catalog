import { DealersStore } from "@/stores/DealersStore";
import { FilterStore } from "@/stores/FilterStore";
import { GoodsStore } from "@/stores/GoodsStore";
import { CartStore } from "@/stores/CartStore";

export class RootStore {
  dealersStore: DealersStore;
  filterStore: FilterStore;
  goodsStore: GoodsStore;
  cartStore: CartStore;

  constructor(initialDealers?: string[]) {
    this.dealersStore = new DealersStore();
    this.goodsStore = new GoodsStore(this);
    this.filterStore = new FilterStore(this);
    this.cartStore = new CartStore(this);

    if (initialDealers) {
      this.filterStore.setSelectedDealers(initialDealers);
    }
  }
}
