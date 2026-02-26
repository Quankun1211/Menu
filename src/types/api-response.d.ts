export type UserRecord = {
    id: number;
    name: string;
    username: string;
    email: string;
    role: string;
    avatar: string;
    classId: string;
    isOnline: boolean
}

export type MetaResponse = {
    total: number;
    page: number;
    limit: number;
}

export type PaginationResponse<T> = {
    meta: MetaResponse;
    data: T[];
}
export type SearchProductResponse = {
  _id: string;
  name: string;
  price: number;
  images: string;
  categoryId: {
    _id: string;
    name: string;
  };
  soldCount: number;
};
