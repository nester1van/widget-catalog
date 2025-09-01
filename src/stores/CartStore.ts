import { makeAutoObservable, runInAction } from "mobx";
import { RootStore } from "./RootStore";
import { IGood } from "../types";

const CART_STORAGE_KEY = "cart";
const CART_TTL = 10 * 60 * 1000; // 10 minutes

interface ICartStorage {
  items: [string, number][];
  timestamp: number;
}

export class CartStore {
  items = new Map<string, number>();
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.loadFromStorage();
  }

  addItem(id: string) {
    this.items.set(id, (this.items.get(id) || 0) + 1);
    this.saveToStorage();
  }

  increment(id: string) {
    this.items.set(id, (this.items.get(id) || 0) + 1);
    this.saveToStorage();
  }

  decrement(id: string) {
    const current = this.items.get(id);
    if (current && current > 1) {
      this.items.set(id, current - 1);
    } else {
      this.items.delete(id);
    }
    this.saveToStorage();
  }

  removeItem(id: string) {
    this.items.delete(id);
    this.saveToStorage();
  }

  clearCart() {
    this.items.clear();
    this.saveToStorage();
  }

  get totalQuantity() {
    return Array.from(this.items.values()).reduce(
      (sum, count) => sum + count,
      0,
    );
  }

  get totalPrice() {
    return Array.from(this.items.entries()).reduce((sum, [id, quantity]) => {
      const good = this.rootStore.goodsStore.goods.find(
        (g: IGood) => g.id === id,
      );
      return sum + (good ? good.price * quantity : 0);
    }, 0);
  }

  saveToStorage() {
    const data: ICartStorage = {
      items: Array.from(this.items.entries()),
      timestamp: Date.now(),
    };
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(data));
  }

  loadFromStorage() {
    const data = localStorage.getItem(CART_STORAGE_KEY);
    if (data) {
      try {
        const parsed = JSON.parse(data) as ICartStorage;
        if (Date.now() - parsed.timestamp > CART_TTL) {
          this.clearCart();
          localStorage.removeItem(CART_STORAGE_KEY);
        } else {
          runInAction(() => {
            this.items = new Map(parsed.items);
          });
        }
      } catch (error) {
        console.error("Failed to load cart from storage", error);
        this.clearCart();
      }
    }
  }
}
