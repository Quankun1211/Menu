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
export type ProductResponse = {
    _id: string,
    name: string,
    categoryId: CategoryItemResponse,
    price: number,
    unit: string,
    description: string,
    images: string,
    stock: string,
    soldCount: number,
    region: string
}

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