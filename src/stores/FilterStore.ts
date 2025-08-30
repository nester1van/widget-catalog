import { makeAutoObservable, reaction } from 'mobx';
import { DealerId, SortMode } from '../types';
import { RootStore } from './RootStore';

export class FilterStore {
  selectedDealers: DealerId[] = [];
  priceSort: SortMode = 'off';
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;

    this.loadFromUrl();

    reaction(
      () => ({
        dealers: this.selectedDealers.slice(),
        sort: this.priceSort,
      }),
      () => {
        this.updateUrl();
        this.rootStore.goodsStore.fetchGoods(this.selectedDealers);
      }
    );
  }

  toggleDealer(id: DealerId) {
    if (this.selectedDealers.includes(id)) {
      this.selectedDealers = this.selectedDealers.filter(d => d !== id);
    } else {
      this.selectedDealers.push(id);
    }
  }

  cyclePriceSort() {
    const modes: SortMode[] = ['off', 'asc', 'desc'];
    const currentIndex = modes.indexOf(this.priceSort);
    this.priceSort = modes[(currentIndex + 1) % modes.length];
  }

  setSelectedDealers(ids: DealerId[]) {
    this.selectedDealers = ids;
  }

  updateUrl() {
    const params = new URLSearchParams(window.location.search);
    if (this.selectedDealers.length > 0) {
      params.set('dealers', this.selectedDealers.join(','));
    } else {
      params.delete('dealers');
    }
    params.set('sort', this.priceSort);
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
  }

  loadFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const dealers = params.get('dealers');
    const sort = params.get('sort') as SortMode;

    if (dealers) {
      this.selectedDealers = dealers.split(',');
    }
    if (sort && ['off', 'asc', 'desc'].includes(sort)) {
      this.priceSort = sort;
    }
  }
}
