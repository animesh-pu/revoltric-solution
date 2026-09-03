// Shared, localStorage-backed cart store used by the product pages, the nav
// badge, the cart page and checkout. Lines store product snapshots so the
// cart keeps working even if the catalogue data changes later.
import { useSyncExternalStore } from "react";

export interface CartLine {
  productId: string;
  name: string;
  category: string;
  categoryId: string;
  price: number;
  image?: string;
  quantity: number;
}

export type CartSnapshot = CartLine[];

const STORAGE_KEY = "revoltric_cart_v1";

let cache: CartSnapshot | null = null;
const listeners = new Set<() => void>();

function read(): CartSnapshot {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as CartSnapshot) : [];
    cache = Array.isArray(parsed) ? parsed : [];
  } catch {
    cache = [];
  }
  return cache;
}

function persist(next: CartSnapshot) {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage may be unavailable (private mode) — cart still works in memory.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export interface CartAddable {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  price: number;
  image?: string;
}

export function addToCart(product: CartAddable, quantity = 1) {
  const qty = Math.max(1, Math.floor(quantity));
  const lines = read().slice();
  const existing = lines.find((line) => line.productId === product.id);
  if (existing) {
    existing.quantity += qty;
  } else {
    lines.push({
      productId: product.id,
      name: product.name,
      category: product.category,
      categoryId: product.categoryId,
      price: product.price,
      image: product.image,
      quantity: qty,
    });
  }
  persist(lines);
}

export function setCartQuantity(productId: string, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  const lines = read().map((line) =>
    line.productId === productId ? { ...line, quantity } : line,
  );
  persist(lines);
}

export function removeFromCart(productId: string) {
  persist(read().filter((line) => line.productId !== productId));
}

export function clearCart() {
  persist([]);
}

export function cartCount(): number {
  return read().reduce((sum, line) => sum + line.quantity, 0);
}

function getSnapshot(): CartSnapshot {
  return read();
}

/** Reactive cart state for React components. */
export function useCart() {
  const lines = useSyncExternalStore(subscribe, getSnapshot);
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);
  const total = lines.reduce(
    (sum, line) => sum + line.price * line.quantity,
    0,
  );
  return { lines, count, total };
}
