export type WishListProduct = {
  _id: string;
  name: string;
  price: number;
  images: string;
  categoryId: string;
  finalPrice: number;
  salePercent: number;
};
export type WishListItemResponse = {
  _id: string;
  createdAt: string;
  product: WishListProduct;
};
export type WishListResponse = WishListItemResponse[];
export type RemoveFavouriteItemsResponse = {
  code: number;
  message: string;
};
