type CategoryItemResponse = {
    _id: string,
    name: string
}
type SaleItems = {
    _id: string,
    percent: number,
    startDate: Date,
    endDate: Date
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
    region: string,
    salePercent: SaleItems
}