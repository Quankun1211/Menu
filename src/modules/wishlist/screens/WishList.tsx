import { View, Text, Image, TouchableOpacity, ActivityIndicator, FlatList, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { formatVND } from "@/utils/helper"
import Toast from "react-native-toast-message"
import { WishlistStyles } from "../css/WishListStyles"
import { CartStyles } from "@/modules/cart/css/CartStyles"
import { ProductItemStyles } from "@/modules/root/css/ProductItemStyles"
import useGetWishList from "../hooks/useGetWishList"
import { WishListProduct, WishListItemResponse } from "../types/api-response"
import WishListItem from "../components/WishListItem"
import useRemoveWishList from "../hooks/useRemoveWishList"
import useAddToCart from "@/modules/cart/hooks/useAddToCart"
import useGetSuggestionProducts from "@/modules/root/hooks/useGetSuggestionProducts"
export default function Wishlist() {
    const { data: getWishList, isPending: wishListPending } = useGetWishList();
    const { data: suggestionData } = useGetSuggestionProducts();

    const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();
    const { mutate: removeWishList, isPending: removePending } = useRemoveWishList();
    // const suggestionData = [ { _id: "s1", name: "Mật ong nhãn", images: "https://api.foodapp.com/images/mat-ong.jpg", price: 150000, unit: "Chai", categoryId: { name: "Đặc sản" } }, { _id: "s2", name: "Hạt điều rang muối", images: "https://api.foodapp.com/images/hat-dieu.jpg", price: 210000, unit: "Hộp", categoryId: { name: "Hạt khô" } }, { _id: "s3", name: "Khô bò sợi lá chanh", images: "https://api.foodapp.com/images/kho-bo.jpg", price: 95000, unit: "Gói", categoryId: { name: "Ăn vặt" } }, { _id: "s4", name: "Bánh tráng phơi sương", images: "https://api.foodapp.com/images/banh-trang.jpg", price: 55000, unit: "Xấp", categoryId: { name: "Ăn vặt" } } ];
    const [isEditing, setIsEditing] = useState(false);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    
    const allIds = getWishList?.data?.map(item => item.product._id) ?? [];
    const isSelectAll = selectedItems.length === allIds.length && allIds.length > 0;

    const handleAddToCart = (id: string) => {
        addToCart({
            productId: id,
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
        });
    };

    const handleRemoveFavourite = () => {
        if (selectedItems.length === 0) return;

        removeWishList(
            { productIds: selectedItems },
            {
                onSuccess: () => {
                    Toast.show({
                        type: 'success',
                        text1: `Đã xóa ${selectedItems.length} mục khỏi Yêu thích`,
                    });
                    setSelectedItems([]);
                    setIsEditing(false);
                },
            }
        );
    };

    const toggleSelectAll = () => {
        if (isSelectAll) {
            setSelectedItems([]);
        } else {
            setSelectedItems(allIds);
        }
    };

    const toggleSelectItem = (id: string) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(itemId => itemId !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    if (wishListPending) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#F26522" />
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={WishlistStyles.headerAction}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="heart" size={18} color="#A08D85" />
                    <Text style={WishlistStyles.headerTitle}>
                        Đang có ({getWishList?.data?.length ?? 0}) sản phẩm
                    </Text>
                </View>
                
                <TouchableOpacity 
                    disabled={removePending} 
                    onPress={() => {
                        setIsEditing(!isEditing);
                        setSelectedItems([]);
                    }}
                >
                    <Text style={[WishlistStyles.editBtn, removePending && { opacity: 0.5 }]}>
                        {isEditing ? 'Hủy' : 'Chỉnh sửa'}
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={getWishList?.data ?? []}
                renderItem={({ item }) => (
                    <WishListItem
                        item={item}
                        isEditing={isEditing}
                        isSelected={selectedItems.includes(item.product._id)}
                        onToggleSelect={() => toggleSelectItem(item.product._id)}
                        onAddToCart={() => handleAddToCart(item.product._id)}
                    />
                )}
                keyExtractor={(item) => item._id}
                contentContainerStyle={[
                    WishlistStyles.listContainer,
                    { paddingBottom: isEditing ? 100 : 20 }
                ]}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={() => (
                    <View style={WishlistStyles.suggestionSection}>
                        <View style={WishlistStyles.suggestionHeader}>
                            <View style={WishlistStyles.activeIndicator} />
                            <Text style={WishlistStyles.suggestionTitle}>Gợi ý cho bạn</Text>
                        </View>
                        
                        <ScrollView 
                            horizontal 
                            showsHorizontalScrollIndicator={false} 
                            style={ProductItemStyles.productScroll}
                            contentContainerStyle={{ paddingRight: 20 }}
                        >
                            {suggestionData?.data.map((products) => (
                                <View key={products._id} style={ProductItemStyles.productCard}>
                                    <Image source={{ uri: products.images }} style={ProductItemStyles.productImg} />
                                    <View style={ProductItemStyles.productInfo}>
                                        <Text style={ProductItemStyles.productCat}>{products.categoryId.name}</Text>
                                        <Text style={ProductItemStyles.productName} numberOfLines={1}>{products.name}</Text>
                                        <View style={ProductItemStyles.productFooter}>
                                            <Text style={ProductItemStyles.productPrice}>{formatVND(products.price)} / {products.unit}</Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                )}
            />

            {isEditing && (
                <View style={CartStyles.deleteBar}>
                    <TouchableOpacity 
                        style={CartStyles.selectAll} 
                        onPress={toggleSelectAll}
                        disabled={removePending}
                    >
                        <Ionicons 
                            name={isSelectAll ? "checkbox" : "square-outline"} 
                            size={22} 
                            color="#F26522" 
                        />
                        <Text style={CartStyles.selectAllText}>Tất cả</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={[
                            CartStyles.deleteBtn, 
                            (selectedItems.length === 0 || removePending) && { opacity: 0.5 }
                        ]}
                        onPress={handleRemoveFavourite}
                        disabled={selectedItems.length === 0 || removePending}
                    >
                        {removePending ? (
                            <ActivityIndicator size="small" color="#FFF" />
                        ) : (
                            <Text style={CartStyles.deleteBtnText}>Xóa ({selectedItems.length})</Text>
                        )}
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}