import { makeAutoObservable, runInAction } from 'mobx';
import { getDealers } from '../services/api';
import { DealerId } from '../types';

export class DealersStore {
  dealers: DealerId[] = [];
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchDealers() {
    this.loading = true;
    this.error = null;
    try {
      const dealers = await getDealers();
      runInAction(() => {
        this.dealers = dealers;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : String(error);
        this.loading = false;
      });
    }
  }
}
