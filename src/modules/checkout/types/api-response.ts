export type AddressModel = {
    _id: string;
    userId: string;
    name: string;
    phone: string;
    address: string;
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
export type AddAddressResponse = {
  message: string;
  data: AddressModel;
}

export type GetAddressesResponse = AddressModel[];


export type UpdateAddressResponse = {
  message: string;
  data: AddressModel;
}

export type SetDefaultAddressResponse = {
  message: string;
}

export type CheckoutSource = "cart" | "buy_now";

export type CheckoutItem = {
  productId: string;
  quantity: number;
};

export type CheckoutParams = {
  source: CheckoutSource;
  items: CheckoutItem[];
};

export type CheckoutItemResponse = {
  productId: string
  name: string
  price: number
  sale: {
    percent: number
    startDate: string
    endDate: string
  } | null
  finalPrice: number
  quantity: number
  total: number
}

export type PreviewCheckoutResponse = {
  items: CheckoutItemResponse[]
  totalAmount: number
}

export type AppliedCoupon = {
  code: string;
  discountAmount: number;
};

export type ApplyCouponResponse = {
  code: string;
  discountAmount: number;
  finalAmount: number;
};
