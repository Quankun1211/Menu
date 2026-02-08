import { Text, View, ScrollView, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { ProductSpecialStyles } from "../css/ProductSpecialStyles";
import useGetProductDetail from "../hooks/useGetProductDetail";
import { formatVND } from "@/utils/helper";
import useTrackView from "../hooks/useTrackView";
import useGetMe from "@/hooks/useGetMe";
import useAddToCart from "@/modules/cart/hooks/useAddToCart";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import ModalLogin from "../components/ModalLogin";
import { ProductDetailStyles } from "../css/ProductDetailStyles";
interface ProductDetailProps {
  id: string;
}

export default function ProductSpecialScreen({ id }: ProductDetailProps) {
  const { data: getProductDetail, isPending } = useGetProductDetail(id);
  const { data: meData } = useGetMe();
  const { mutate: trackView } = useTrackView();
  const { mutate: addToCart, isPending: cartPending } = useAddToCart();

  const [quantity, setQuantity] = useState(1);
  const isLoggedIn = meData !== undefined;
  const [isModalVisible, setModalVisible] = useState(false);

  const productData = getProductDetail?.data;
  const recipes = productData?.relatedRecipes || [];
  const hasSale = productData?.salePercent && productData.salePercent.percent > 0;
  const nutrition = productData?.nutrition;
  console.log(nutrition);

  useEffect(() => {
    if (isLoggedIn && productData?.categoryId?._id) {
      trackView(productData.categoryId._id);
    }
  }, [isLoggedIn, productData?._id]);

  if (isPending) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#faece1' }}>
        <ActivityIndicator size="large" color="#D16D2F" />
      </View>
    );
  }

  const handleAddCart = () => {
    if (!isLoggedIn) {
      Toast.show({ type: 'error', text1: 'Yêu cầu đăng nhập', text2: 'Vui lòng đăng nhập' });
      return;
    }
    addToCart({ productId: id, quantity }, {
      onSuccess: () => Toast.show({ type: 'success', text1: 'Đã thêm vào giỏ hàng 🛒' })
    });
  };
  const handleCheckout = () => {
    if (!isLoggedIn) {
      setModalVisible(true);
      return;
    }
    const itemsToCheckout = [{
      productId: id,
      quantity: quantity,
    }];
    
    router.push({
      pathname: "/(details)/checkoutTabs/CheckOutTabs",
      params: {
        source: "cart",
        items: JSON.stringify(itemsToCheckout),
      },
    });
  };

  return (
    <LinearGradient
      colors={['#C9936E', '#E8C5A8', '#faece1', '#faece1']}
      style={ProductSpecialStyles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Main Image with Tag */}
        <View style={ProductSpecialStyles.imageSection}>
          <Image source={{ uri: productData?.images }} style={ProductSpecialStyles.mainImage} />
          <View style={ProductSpecialStyles.floatingTag}>
            <Ionicons name="ribbon" size={14} color="#fff" />
            <Text style={ProductSpecialStyles.floatingTagText}>{productData?.description}</Text>
          </View>
        </View>

        <View style={ProductSpecialStyles.contentPadding}>
          {/* Header Info */}
          <Text style={ProductSpecialStyles.productName}>{productData?.name}</Text>
          <View style={ProductSpecialStyles.priceRow}>
            <Text style={ProductSpecialStyles.price}>{formatVND(productData?.finalPrice || 0)}</Text>
            {hasSale && (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                <Text style={ProductSpecialStyles.oldPrice}>{formatVND(productData?.price)}</Text>
                <View style={ProductSpecialStyles.saleBadge}>
                  <Text style={ProductSpecialStyles.saleText}>-{productData.salePercent.percent}%</Text>
                </View>
              </View>
            )}
          </View>

          {/* Source Card */}
          <View style={ProductSpecialStyles.sourceCard}>
            <View style={ProductSpecialStyles.mapIconWrapper}>
               <Image source={require("../../../assets/fish/cabong.jpg")} style={{width: 40, height: 40}} />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={ProductSpecialStyles.sourceTitle}>Nguồn gốc: {productData?.origin}</Text>
              <Text style={ProductSpecialStyles.sourceDesc}>{productData?.originDescription}</Text>
            </View>
          </View>

          {/* Action Row */}
          <View style={ProductSpecialStyles.actionRow}>
            <View style={ProductSpecialStyles.quantitySelector}>
              <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}><Ionicons name="remove" size={18} /></TouchableOpacity>
              <Text style={ProductSpecialStyles.quantityValue}>{quantity}</Text>
              <TouchableOpacity onPress={() => setQuantity(quantity + 1)}><Ionicons name="add" size={18} /></TouchableOpacity>
            </View>
            <TouchableOpacity 
              style={ProductSpecialStyles.addToCartBtnMain} 
              onPress={handleAddCart}
              disabled={cartPending}
            >
              <Ionicons name="bag-handle" size={20} color="#fff" />
              <Text style={ProductSpecialStyles.addToCartBtnText}>Thêm vào giỏ</Text>
            </TouchableOpacity>
          </View>

          <View style={ProductSpecialStyles.quoteContainer}>
            <Text style={ProductSpecialStyles.quoteText}>
              {productData?.story}
            </Text>
          </View>

          <Text style={ProductSpecialStyles.subSectionTitle}>CHỨNG NHẬN CHẤT LƯỢNG</Text>
          <View style={ProductSpecialStyles.certRow}>
            <CertItem icon="check-decagram" label="VietGAP" color="#28a745" />
            <CertItem icon="leaf" label="Organic" color="#218838" />
            <CertItem icon="star-circle" label="OCOP 4-star" color="#ffc107" />
          </View>

          <Text style={ProductSpecialStyles.subSectionTitle}>HƯƠNG VỊ ĐẶC TRƯNG</Text>
          <View style={ProductSpecialStyles.tasteRow}>
            <TasteItem icon="cart" label="Mùi thơm nồng" />
            <TasteItem icon="restaurant" label="Vị đậm đà" />
            <TasteItem icon="color-palette" label="Sắc tím hồng" />
          </View>

          {nutrition && Object.values(nutrition).some(v => Number(v) > 0) && (
            <View style={ProductDetailStyles.nutritionCard}>
              {['calories', 'protein', 'fat', 'carbs'].map((key) => {
                const val = nutrition[key as keyof typeof nutrition];
                
                if (val === undefined || val === null || Number(val) <= 0) return null;
                
                return (
                  <View key={key} style={ProductDetailStyles.nutritionItem}>
                    <Text style={ProductDetailStyles.nutritionLabel}>{key.toUpperCase()}</Text>
                    <Text style={ProductDetailStyles.nutritionValue}>{val}</Text>
                  </View>
                );
              })}
            </View>
          )}

          {productData?.usage_instruction && productData.usage_instruction.length > 0 && (
            <View style={ProductSpecialStyles.usageSection}>
              <View style={ProductSpecialStyles.usageHeader}>
                <Ionicons name="bulb-outline" size={20} color="#D16D2F" />
                <Text style={[ProductSpecialStyles.sectionTitle, { marginTop: 0, marginLeft: 8 }]}>
                  Hướng dẫn sử dụng
                </Text>
              </View>
              <View style={ProductSpecialStyles.usageContent}>
                {productData.usage_instruction.map((step: string, index: number) => (
                  <View key={index} style={ProductSpecialStyles.usageItem}>
                    <View style={ProductSpecialStyles.usageBullet}>
                      <Text style={ProductSpecialStyles.usageBulletText}>{index + 1}</Text>
                    </View>
                    <Text style={ProductSpecialStyles.usageText}>{step}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <View style={ProductSpecialStyles.traceCard}>
            <Ionicons name="qr-code" size={30} color="#D16D2F" />
            <View style={{ marginLeft: 15, flex: 1 }}>
              <Text style={ProductSpecialStyles.traceTitle}>Truy xuất nguồn gốc</Text>
              <Text style={ProductSpecialStyles.traceInfo}>{productData?.originFound}</Text>
            </View>
          </View>

          <View style={ProductSpecialStyles.recipesSection}>
            <View style={ProductSpecialStyles.headerRow}>
              <Ionicons name="restaurant" size={20} color="#D16D2F" />
              <Text style={ProductSpecialStyles.headerTitle}>Gợi ý món ngon</Text>
            </View>

            {recipes && recipes.length > 0 ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {recipes.map((item: any) => (
                  <TouchableOpacity 
                    key={item._id} 
                    style={ProductSpecialStyles.recipeChip}
                    onPress={() => router.push({ pathname: "/(details)/exploreItemTabs/ExploreRecipeDetail", params: { id: item._id } })}
                  >
                    <Image source={{ uri: item.image }} style={ProductSpecialStyles.recipeChipImage} />
                    <Text style={ProductSpecialStyles.recipeChipName} numberOfLines={1}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              <View style={{ paddingVertical: 20, alignItems: 'center', opacity: 0.6 }}>
                <Ionicons name="receipt-outline" size={32} color="#ccc" />
                <Text style={{ fontSize: 13, color: '#666', marginTop: 8 }}>
                  Chưa có gợi ý món ngon cho sản phẩm này
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={{paddingHorizontal: 20, marginTop: 20}}>
          <TouchableOpacity 
            style={ProductSpecialStyles.buyBtn} 
            onPress={handleCheckout}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="flash" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={ProductSpecialStyles.addToCartText}>Mua ngay</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ height: 60 }} />
      </ScrollView>
      <ModalLogin
        visible={isModalVisible} 
        onClose={() => setModalVisible(false)} 
      />
    </LinearGradient>
  );
}

const CertItem = ({ icon, label, color }: any) => (
  <View style={ProductSpecialStyles.certItem}>
    <MaterialCommunityIcons name={icon} size={28} color={color} />
    <Text style={ProductSpecialStyles.certLabel}>{label}</Text>
  </View>
);

const TasteItem = ({ icon, label }: { icon: any; label: string }) => (
  <View style={ProductSpecialStyles.tasteItem}>
    <Ionicons name={icon} size={24} color="#D16D2F" />
    <Text style={ProductSpecialStyles.tasteLabel}>{label}</Text>
  </View>
);