import ProductSpecialScreen from '@/modules/product/pages/ProductSpecialScreen'
import { useLocalSearchParams } from "expo-router";

const SpecialDetail = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    
  return (
    <ProductSpecialScreen id={Array.isArray(id) ? id[0] : id ?? ""}/>
  )
}

export default SpecialDetail