import { create } from "zustand";
import { AddressModel } from "@/modules/checkout/types/api-response";
type CheckoutStore = {
  selectedAddress: AddressModel | null;
  source: "cart" | "buy_now" | "menu" | "recipe";
  items: { productId: string; quantity: number }[];
  setSelectedAddress: (address: AddressModel | null) => void;
  setCheckoutDraft: (
    source: "cart" | "buy_now" | "menu" | "recipe",
    items: { productId: string; quantity: number }[]
  ) => void;
  clearCheckoutDraft: () => void;
};

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  selectedAddress: null,
  source: "cart",
  items: [],
  setSelectedAddress: (address) => set({ selectedAddress: address }),
  setCheckoutDraft: (source, items) => set({ source, items }),
  clearCheckoutDraft: () => set({ source: "cart", items: [], selectedAddress: null }),
}));
