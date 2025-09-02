import { IGood, DealerId } from "@/types";

const API_BASE_URL = "https://test-frontend.dev.int.perx.ru/api";
const ASSETS_BASE_URL = "https://test-frontend.dev.int.perx.ru";

async function request<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export async function getDealers(): Promise<DealerId[]> {
  return request<DealerId[]>(`${API_BASE_URL}/dealers/`);
}

export async function getGoods(dealers?: DealerId[]): Promise<IGood[]> {
  const q = dealers?.length ? `?dealers=${dealers.join(",")}` : "";
  return request<IGood[]>(`${API_BASE_URL}/goods/${q}`);
}

export function getImageUrl(path: string): string {
  if (!path) return "";
  return path.startsWith("http")
    ? path
    : `${ASSETS_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}
