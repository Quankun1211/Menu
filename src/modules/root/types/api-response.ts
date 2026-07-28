export type CategoryResponse = {
    _id: string,
    name: string,
    slug: string,
    image?: string
}

type CategoryItemResponse = {
    _id: string,
    name: string
}
export type { ProductResponse } from "@/modules/explore/types/api-response";

type SaleItems = {
    _id: string,
    percent: number,
    startDate: Date,
    endDate: Date
}

export type ShockDealProducts = {
    _id: string,
    categoryId: CategoryItemResponse,
    name: string,
    price: number,
    unit: string,
    images: string,
    region: string,
    salePercent: SaleItems
}
