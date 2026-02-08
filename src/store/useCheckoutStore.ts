import { create } from "zustand";
import { AddressModel } from "@/modules/checkout/types/api-response";
type CheckoutStore = {
  selectedAddress: AddressModel | null;
  setSelectedAddress: (address: AddressModel | null) => void;
};

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  selectedAddress: null,
  setSelectedAddress: (address) => set({ selectedAddress: address }),
}));
