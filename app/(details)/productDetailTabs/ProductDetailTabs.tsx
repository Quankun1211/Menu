import ProductDetailScreen from "@/modules/product/pages/ProductDetailScreen";
import { useLocalSearchParams } from "expo-router";

export default function ProductDetailTabs() {
    const { id } = useLocalSearchParams<{ id: string }>();

    return (
        <ProductDetailScreen id={Array.isArray(id) ? id[0] : id ?? ""}/>
    )
}