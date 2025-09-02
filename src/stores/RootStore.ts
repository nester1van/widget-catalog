import { makeAutoObservable, runInAction } from "mobx";
import { DealersStore } from "@/stores/DealersStore";
import { FilterStore } from "@/stores/FilterStore";
import { GoodsStore } from "@/stores/GoodsStore";
import { CartStore } from "@/stores/CartStore";

export class RootStore {
  dealersStore: DealersStore;
  filterStore: FilterStore;
  goodsStore: GoodsStore;
  cartStore: CartStore;
  private readonly initialDealers?: string[];

  constructor(initialDealers?: string[]) {
    makeAutoObservable(this);
    this.dealersStore = new DealersStore();
    this.goodsStore = new GoodsStore(this);
    this.filterStore = new FilterStore(this);
    this.cartStore = new CartStore(this);
    this.initialDealers = initialDealers;
  }

  async init() {
    await this.dealersStore.fetchDealers();

    runInAction(() => {
      const allDealerIds = this.dealersStore.dealers;
      let validatedDealers: string[];

      if (!this.initialDealers || this.initialDealers.length === 0) {
        validatedDealers = allDealerIds;
      } else {
        const allDealerIdsSet = new Set(allDealerIds);
        validatedDealers = this.initialDealers.filter((id) =>
          allDealerIdsSet.has(id),
        );
      }
      this.dealersStore.initialDealers = validatedDealers;
    });

    await this.goodsStore.fetchInitialGoods(this.dealersStore.initialDealers);

    runInAction(() => {
      // Загружаем дилеров из URL, если они там есть
      this.filterStore.loadFromUrl();
      // Если в URL не было дилеров, используем initialDealers
      if (this.filterStore.selectedDealers.length === 0) {
        this.filterStore.selectedDealers = this.dealersStore.initialDealers;
      }
    });
  }
}
