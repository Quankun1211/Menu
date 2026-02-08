import { TouchableOpacity, View, Image, Text } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { ExploreStyles } from "../css/ExploreStyles"
import { ProductResponse } from "../types/api-response"
import { formatVND } from "@/utils/helper"
import { useRouter } from "expo-router"
import useAddToCart from "@/modules/cart/hooks/useAddToCart"
import Toast from "react-native-toast-message"
import { useState, useEffect } from "react"
import useAddToWishList from "@/modules/wishlist/hooks/useAddToWishList"

type ProductProps = {
    product: ProductResponse
}

export default function ExploreProductItems({ product }: ProductProps) {
    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState("");

    const hasSale = product.salePercent && product.salePercent.percent > 0;
    const discountedPrice = hasSale 
        ? product.price * (1 - product.salePercent.percent / 100) 
        : product.price;

    useEffect(() => {
        if (!hasSale || !product.salePercent.endDate) return;

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const end = new Date(product.salePercent.endDate).getTime();
            const distance = end - now;

            const TWO_DAYS_IN_MS = 2 * 24 * 60 * 60 * 1000;

            if (distance < 0 || distance >= TWO_DAYS_IN_MS) {
                setTimeLeft(""); 
                if (distance < 0) clearInterval(timer);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const timeString = days > 0 
                ? `${days} ngày ${hours}:${minutes < 10 ? '0' : ''}${minutes}`
                : `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            
            setTimeLeft(timeString);
        }, 1000);

        return () => clearInterval(timer);
    }, [product.salePercent]);

    const { mutate: addToCart } = useAddToCart();
    const { mutate: addWishList, isPending: wishLishPending } = useAddToWishList()

    const handleAddCard = () => {
        addToCart({
            productId: product._id,
            quantity: 1
        }, {
            onSuccess: () => {
                Toast.show({
                    type: 'success',
                    text1: 'Đã thêm sản phẩm vào giỏ hàng 🛒'
                });
            },
            onError: () => {
                Toast.show({
                    type: 'error',
                    text1: 'Thất bại',
                    text2: 'Có lỗi xảy ra, vui lòng thử lại sau'
                });
            }
        })
    }

    const handleToggleFavorite = () => {
        addWishList({
            productId: product._id
        }, {
            onSuccess: () => {
                Toast.show({
                    type: 'success',
                    text1: 'Đã thêm sản phẩm vào yêu thích 🛒'
                });
            },
            onError: () => {
                Toast.show({
                    type: 'error',
                    text1: 'Thất bại',
                    text2: 'Có lỗi xảy ra, vui lòng thử lại sau'
                });
            }
        })
    }

    return (
        <TouchableOpacity 
            style={ExploreStyles.productCard} 
            activeOpacity={0.9}
            onPress={() => router.push({
                pathname: "/(details)/productDetailTabs/ProductDetailTabs",
                params: { id: product._id }
            })}
        >
            <View style={ExploreStyles.imageContainer}>
                <Image 
                    source={{ uri: product.images }} 
                    style={ExploreStyles.productImage} 
                    resizeMode="cover"
                />
                
                {hasSale && (
                    <View style={ExploreStyles.saleBadge}>
                        <Text style={ExploreStyles.saleText}>
                            -{product.salePercent.percent}%
                        </Text>
                    </View>
                )}

                <TouchableOpacity 
                    onPress={handleToggleFavorite}
                    style={[ExploreStyles.addButton, { left: 8, right: 'auto', backgroundColor: 'rgba(255,255,255,0.8)' }]} 
                    activeOpacity={0.8}
                >
                    <Ionicons name="heart" size={18} color="#FF4D4F" />
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={handleAddCard} 
                    style={ExploreStyles.addButton} 
                    activeOpacity={0.8}
                >
                    <Ionicons name="basket" size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={ExploreStyles.infoContainer}>
                <Text style={ExploreStyles.productName} numberOfLines={1} ellipsizeMode="tail">
                    {product.name}
                </Text>
                
                {hasSale && timeLeft !== "" && (
                    <View style={{ 
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        marginTop: 4,
                        marginBottom: 2 
                    }}>
                        <Ionicons name="flash" size={12} color="#FF4D4F" style={{ marginRight: 2 }} />
                        <Text style={{ 
                            fontSize: 11, 
                            color: '#FF4D4F', 
                            fontWeight: 'bold' 
                        }}>
                            Flash sale: {timeLeft}
                        </Text>
                    </View>
                )}
                
                <View style={[ExploreStyles.priceRow, { flexWrap: 'wrap', alignItems: 'baseline' }]}>
                    <Text style={ExploreStyles.productPrice}>
                        {formatVND(hasSale ? discountedPrice : product.price)}
                    </Text>
                    
                    {hasSale && (
                        <Text style={[
                            ExploreStyles.originalPrice, 
                            { marginLeft: 4, fontSize: 10, textDecorationLine: 'line-through' }
                        ]}>
                            {formatVND(product.price)}
                        </Text>
                    )}
                    
                    <Text style={ExploreStyles.productUnit}> / {product.unit}</Text>
                </View>

                <Text style={ExploreStyles.soldStyle}>Đã bán | {product.soldCount}</Text>
            </View>
        </TouchableOpacity>
    );
}