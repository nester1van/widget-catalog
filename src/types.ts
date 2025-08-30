export interface IGood {
  id: string;
  name: string;
  price: number;
  image: string;
  dealerId?: string;
}

export type DealerId = string;

export type SortMode = 'off' | 'asc' | 'desc';

export interface WidgetOptions {
  el: string; // селектор, например, '#widget-catalog'
  dealers?: string[]; // список идентификаторов дилеров для инициализации
}
