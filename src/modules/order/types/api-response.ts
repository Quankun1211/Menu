import { AddressModel } from "@/modules/checkout/types/api-response";
export type OrderResponse = {
    _id: string;
    userId: string;
    subTotal: number;
    couponCode: string | null;
    couponDiscount: number;
    totalPrice: number;
    status: "pending" | "delivered" | "cancelled" | "shipping"; 
    createdAt: string;
    cancelReason: string;
    cancelledAt: string;
    cancelledBy: string;
    address: AddressModel;
    productSummary: string;
    thumbnail: string;
    updatedAt: string;
    paymentUrl?: string;
    paymentStatus: string;
  };

export type OrderProductResponse = {
  productId: string;
  name: string;
  image: string;
  unit: string;
  price: number;
  quantity: number;
  total: number
}

export type OrderDetailResponse = {
  _id: string,
  orderId: string,
  status: string,
  address: AddressModel,
  items: OrderProductResponse[],
  subTotal: number,
  couponDiscount: number,
  totalPrice: number,
  createdAt: string,
  paymentStatus: string;
  paidAt: Date;
  paymentMethod: string
}
  