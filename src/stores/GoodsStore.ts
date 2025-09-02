import { makeAutoObservable, runInAction } from "mobx";
import { getGoods } from "@/services/api";
import { IGood, DealerId } from "@/types";
import { RootStore } from "@/stores/RootStore";

export class GoodsStore {
  goods: IGood[] = []; // Все товары, загруженные при инициализации
  filteredGoods: IGood[] = []; // Товары для каталога, могут меняться при фильтрации
  loading = false;
  error: string | null = null;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  async fetchInitialGoods(dealers?: DealerId[]) {
    this.loading = true;
    this.error = null;
    try {
      const goods = await getGoods(dealers);
      runInAction(() => {
        this.goods = goods;
        this.filteredGoods = goods; // Изначально показываем все товары
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : String(error);
        this.loading = false;
      });
    }
  }

  async fetchGoods(dealers?: DealerId[]) {
    this.loading = true;
    this.error = null;
    try {
      const goods = await getGoods(dealers);
      runInAction(() => {
        this.filteredGoods = goods;
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
      return this.filteredGoods;
    }
    return [...this.filteredGoods].sort((a, b) => {
      return priceSort === "asc" ? a.price - b.price : b.price - a.price;
    });
  }

  /**
   * Возвращает список товаров для главной карусели.
   * Фильтрует товары с ценой больше или равной 10.
   * Если отфильтрованный список содержит менее 8 элементов,
   * он дополняет список дополнительными товарами из общего списка,
   * пока не наберется 8 элементов, исключая дубликаты из уже отфильтрованных товаров.
   */
  get mainCarouselGoods() {
    const filtered = this.goods.filter((item) => item.price >= 10);
    if (filtered.length < 8) {
      const needed = 8 - filtered.length;
      const additionalGoods = this.goods.filter(
        (item) => !filtered.some((fItem) => fItem.id === item.id)
      ).slice(0, needed);
      return [...filtered, ...additionalGoods];
    }
    return filtered;
  }
}
