import { Text, View, ScrollView, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { ProductDetailStyles } from "../css/ProductDetailStyles";
import useGetProductDetail from "../hooks/useGetProductDetail";
import { calcSalePrice, formatVND } from "@/utils/helper";
import useTrackView from "../hooks/useTrackView";
import useGetMe from "@/hooks/useGetMe";
import useAddToCart from "@/modules/cart/hooks/useAddToCart";
import Toast from "react-native-toast-message";
import { router } from "expo-router"
import ModalLogin from "../components/ModalLogin";
interface ProductDetailProps {
  id: string
}

export default function ProductDetailScreen({ id }: ProductDetailProps) {
  const { data: getProductDetail, isPending } = useGetProductDetail(id);
  const { data: meData } = useGetMe();
  const { mutate: trackView } = useTrackView();
  const { mutate: addToCart, isPending: cartPending } = useAddToCart();
  
  const [quantity, setQuantity] = useState(1);
  const isLoggedIn = meData !== undefined;

  const [isModalVisible, setModalVisible] = useState(false);
  
  const productData = getProductDetail?.data;
  const recipes = productData?.relatedRecipes || [];
  const nutrition = productData?.nutrition;
  const hasSale = productData?.salePercent && productData.salePercent.percent > 0;
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
      Toast.show({
        type: 'error',
        text1: 'Yêu cầu đăng nhập',
        text2: 'Vui lòng đăng nhập để thực hiện chức năng này'
      });
      return;
    }
    addToCart({
      productId: id,
      quantity: quantity,
    }, {
      onSuccess: () => {
        Toast.show({
          type: 'success',
          text1: 'Đã thêm sản phẩm vào giỏ hàng 🛒'
        });
      }
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
      colors={['#C9936E', '#E8C5A8', '#ffeddf', '#f2dbc9']}
      style={ProductDetailStyles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={ProductDetailStyles.contentPadding}>
          <Image
            source={{ uri: productData?.images }}
            style={ProductDetailStyles.mainImage}
          />

          <Text style={ProductDetailStyles.productName}>{productData?.name}</Text>
          <View style={ProductDetailStyles.priceRow}>
            <Text style={ProductDetailStyles.price}>
              {formatVND(productData?.finalPrice || 0)} / {productData?.unit}
            </Text>
          </View>
          {hasSale && (
            <Text style={ProductDetailStyles.oldPrice}>{formatVND(productData?.price)}</Text>
          )}

          <View style={ProductDetailStyles.tagRow}>
            <View style={[ProductDetailStyles.tag, ProductDetailStyles.brownTag]}>
              <Ionicons name="location" size={14} color="#F26522" />
              <Text style={ProductDetailStyles.tagText}>{productData?.origin}</Text>
            </View>
          </View>

          <Text style={ProductDetailStyles.sectionTitle}>Mô tả sản phẩm</Text>
          <Text style={ProductDetailStyles.description}>
            {productData?.description}
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={ProductDetailStyles.actionContainer}>
          <View style={ProductDetailStyles.quantityContainer}>
            <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
              <Ionicons name="remove" size={20} color="#333" />
            </TouchableOpacity>
            <Text style={ProductDetailStyles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
              <Ionicons name="add" size={20} color="#333" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[ProductDetailStyles.addToCartButton, cartPending && { opacity: 0.7 }]}
            onPress={handleAddCart}
            disabled={cartPending}
          >
            {cartPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="bag-handle" size={20} color="#fff" style={{ marginRight: 8 }} />
                <Text style={ProductDetailStyles.addToCartText}>Thêm vào giỏ</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Nutrition Section */}
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

        {/* Recipes Section */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
            <Ionicons name="restaurant" size={20} color="#D16D2F" />
            <Text style={[ProductDetailStyles.sectionTitle, { marginTop: 0, marginLeft: 8 }]}>Gợi ý công thức</Text>
          </View>

          {recipes.length > 0 ? (
            recipes.map((item: any) => (
              <View key={item._id} style={ProductDetailStyles.recipeCard}>
                <Image source={{ uri: item.image }} style={ProductDetailStyles.recipeImage} />
                <View style={ProductDetailStyles.recipeInfo}>
                  <Text style={ProductDetailStyles.recipeName} numberOfLines={1}>{item.name}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                    <Ionicons name="time-outline" size={14} color="#666" />
                    <Text style={ProductDetailStyles.recipeMetaText}>{item.cookTime} min</Text>
                    <Ionicons name="stats-chart-outline" size={14} color="#666" style={{ marginLeft: 10 }} />
                    <Text style={ProductDetailStyles.recipeMetaText}>{item.difficulty}</Text>
                  </View>
                  <TouchableOpacity 
                    style={ProductDetailStyles.viewRecipeBtn}
                    onPress={() => router.push({
                      pathname: "/(details)/exploreItemTabs/ExploreRecipeDetail",
                      params: { id: item._id }
                    })}
                  >
                    <Text style={ProductDetailStyles.viewRecipeBtnText}>Xem công thức</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View style={ProductDetailStyles.emptyRecipeCard}>
              <Ionicons name="cloud-offline-outline" size={30} color="#A88E7A" />
              <Text style={ProductDetailStyles.emptyRecipeText}>Chưa có công thức cho sản phẩm này</Text>
            </View>
          )}
        </View>

        {/* Thêm phần này sau phần Description và trước Action Buttons */}
        {productData?.usage_instruction && productData.usage_instruction.length > 0 && (
          <View style={ProductDetailStyles.usageSection}>
            <View style={ProductDetailStyles.usageHeader}>
              <Ionicons name="bulb-outline" size={20} color="#D16D2F" />
              <Text style={[ProductDetailStyles.sectionTitle, { marginTop: 0, marginLeft: 8 }]}>
                Hướng dẫn sử dụng
              </Text>
            </View>
            <View style={ProductDetailStyles.usageContent}>
              {productData.usage_instruction.map((step: string, index: number) => (
                <View key={index} style={ProductDetailStyles.usageItem}>
                  <View style={ProductDetailStyles.usageBullet}>
                    <Text style={ProductDetailStyles.usageBulletText}>{index + 1}</Text>
                  </View>
                  <Text style={ProductDetailStyles.usageText}>{step}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Origin Map */}
        <View style={ProductDetailStyles.mapContainer}>
          <Image source={require("../../../assets/test/origin.jpg")} style={ProductDetailStyles.mapImage} />
          <View style={ProductDetailStyles.mapOverlay}>
            <Ionicons name="location" size={16} color="#333" />
            <Text style={ProductDetailStyles.mapText}>{productData?.origin}</Text>
          </View>
        </View>

        {/* Buy Now Button */}
        <View style={{paddingHorizontal: 20, marginTop: 20}}>
          <TouchableOpacity 
            style={ProductDetailStyles.buyBtn} 
            onPress={handleCheckout}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="flash" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={ProductDetailStyles.addToCartText}>Mua ngay</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
      <ModalLogin
        visible={isModalVisible} 
        onClose={() => setModalVisible(false)} 
      />
    </LinearGradient>
  );
}