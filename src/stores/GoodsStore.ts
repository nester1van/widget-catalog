import { makeAutoObservable, runInAction } from "mobx";
import { getGoods } from "@/services/api";
import { IGood, DealerId } from "@/types";
import { RootStore } from "@/stores/RootStore";

export class GoodsStore {
  goods: IGood[] = [];
  loading = false;
  error: string | null = null;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  async fetchGoods(dealers?: DealerId[]) {
    this.loading = true;
    this.error = null;
    try {
      const goods = await getGoods(dealers);
      runInAction(() => {
        this.goods = goods;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : String(error);
        this.loading = false;
      });
    }
  }

  get sortedGoods() {
    const { priceSort } = this.rootStore.filterStore;
    if (priceSort === "off") {
      return this.goods;
    }
    return [...this.goods].sort((a, b) => {
      return priceSort === "asc" ? a.price - b.price : b.price - a.price;
    });
  }

  get mainCarouselGoods() {
    const filtered = this.goods.filter((item) => item.price >= 10);
    if (filtered.length < 5) {
      return this.goods.slice(0, 8);
    }
    return filtered;
  }
}
