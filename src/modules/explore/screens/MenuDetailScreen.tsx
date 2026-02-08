import {useState} from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import MenuItems from '../components/MenuItems';
import { MenuDetailStyles } from '../css/MenuDetailStyles';
import { router, useLocalSearchParams } from "expo-router"
import useGetMenuDetail from '../hooks/useGetMenuDetail';
import { formatVND } from '@/utils/helper';
import useGetMe from '@/hooks/useGetMe';
import ModalLogin from '@/modules/product/components/ModalLogin';

export default function MenuDetailScreen() {
  const { data: meData } = useGetMe();
  const isLoggedIn = meData !== undefined;

  const { id } = useLocalSearchParams();
  const menuId = Array.isArray(id) ? id[0] : id;
  const { data: menuDetail, isPending } = useGetMenuDetail(menuId);
  
  const [isModalVisible, setModalVisible] = useState(false);

  const handleCheckout = () => {
    if (!isLoggedIn) {
      setModalVisible(true);
      return;
    }
    if (!menuDetail?.data?.recipes) return;

    const itemsToCheckout = menuDetail.data.recipes
      .flatMap(recipe => recipe.ingredients)
      .filter(ing => {
        const isProductType = ing.itemType === 'Product';
        const hasShopLink = ing.ingredientId?.productId; 
        return isProductType || hasShopLink;
      }) 
      .map(ing => ({
        productId: ing.itemType === 'Product' ? ing.ingredientId._id : ing.ingredientId.productId,
        quantity: Number(ing.quantity) || 1,
      }));

    if (itemsToCheckout.length === 0) {
      alert("Mâm cơm này chưa có nguyên liệu nào hỗ trợ mua trực tiếp.");
      return;
    }

    router.push({
      pathname: "/(details)/checkoutTabs/CheckOutTabs",
      params: {
        source: "menu",
        items: JSON.stringify(itemsToCheckout),
      },
    });
  };
  return (
    <View style={MenuDetailStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={MenuDetailStyles.imageHeader}>
          <Image source={{ uri: menuDetail?.data.image }} style={MenuDetailStyles.mainImage} />
        </View>

        {/* Info Card */}
        <View style={MenuDetailStyles.infoCard}>
          <View style={MenuDetailStyles.rowBetween}>
            <Text style={MenuDetailStyles.title}>{menuDetail?.data.title}</Text>
            <View style={MenuDetailStyles.priceTag}>
              {/* Hiển thị tổng giá trị thực tế của mâm cơm */}
              <Text style={MenuDetailStyles.priceText}>{formatVND(menuDetail?.data.totalPrice ?? 0)}</Text>
            </View>
          </View>
          <Text style={MenuDetailStyles.description}>{menuDetail?.data.description}</Text>
        </View>

        {/* Recipes List */}
        <View style={MenuDetailStyles.listContainer}>
          {menuDetail?.data.recipes.map((recipe, index) => (
            <View key={recipe._id} style={MenuDetailStyles.recipeGroup}>
              <View style={MenuDetailStyles.recipeHeader}>
                <Image source={{ uri: recipe.image }} style={MenuDetailStyles.recipeIcon} />
                <View style={MenuDetailStyles.recipeInfoContent}>
                  <Text style={MenuDetailStyles.recipeName}>
                    {index + 1}. {recipe.name}
                  </Text>
                  <TouchableOpacity
                    onPress={() => router.push({
                      pathname: "/(details)/exploreItemTabs/ExploreRecipeDetail",
                      params: { id: recipe._id }
                    })}
                    style={MenuDetailStyles.viewRecipeButton}>
                    <Ionicons name="book-outline" size={14} color="#E25822" />
                    <Text style={MenuDetailStyles.viewRecipeText}> Xem công thức</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {recipe.ingredients.map((ingredient) => (
                <MenuItems key={ingredient._id} item={ingredient} />
              ))}

              {recipe.additionalIngredients && recipe.additionalIngredients.length > 0 && (
                <View style={{ marginTop: 10, marginLeft: 20 }}>
                  <Text style={{ fontSize: 13, fontWeight: '700', color: '#666', marginBottom: 8 }}>
                    Gia vị & Nguyên liệu phụ:
                  </Text>
                  {recipe.additionalIngredients.map((extra, idx) => (
                    <View key={`extra-${idx}`} style={MenuDetailStyles.extraItem}>
                      <Ionicons name="ellipse" size={6} color="#DDD" style={{ marginRight: 8 }} />
                      <Text style={MenuDetailStyles.extraText}>
                        {extra.name} {extra.quantity ? `(${extra.quantity} ${extra.unit || ''})` : ''}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Bar: Hiển thị giá những thứ có thể mua ngay */}
      <View style={MenuDetailStyles.bottomBar}>
        <View>
          <Text style={MenuDetailStyles.totalLabel}>CÓ THỂ MUA TẠI SHOP</Text>
          <Text style={MenuDetailStyles.totalPrice}>{formatVND(menuDetail?.data.totalPriceInDB ?? 0)}</Text>
        </View>
        <TouchableOpacity onPress={handleCheckout} style={MenuDetailStyles.buyButton}>
          <Ionicons name="basket" size={20} color="#FFF" />
          <Text style={MenuDetailStyles.buyButtonText}> Mua ngay</Text>
        </TouchableOpacity>
      </View>
      
      <ModalLogin
        visible={isModalVisible} 
        onClose={() => setModalVisible(false)} 
      />
    </View>
  );
}