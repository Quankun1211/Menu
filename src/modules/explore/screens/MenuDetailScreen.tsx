import { useState, useEffect, useMemo } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
  const { data: menuDetail } = useGetMenuDetail(menuId);

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const getSafeProductId = (ing: any) => {
    if (ing.itemType === 'Product') return ing.ingredientId?._id;
    return ing.ingredientId?.productId;
  };

  const purchasableIngredients = useMemo(() => {
    if (!menuDetail?.data?.recipes) return [];
    return menuDetail.data.recipes.flatMap(recipe => 
      recipe.ingredients.filter(ing => getSafeProductId(ing))
    );
  }, [menuDetail]);

  useEffect(() => {
    if (purchasableIngredients.length > 0) {
      const allIds = Array.from(new Set(purchasableIngredients.map(ing => getSafeProductId(ing))));
      setSelectedItems(allIds);
    }
  }, [purchasableIngredients]);

  const toggleItem = (productId: string) => {
    setSelectedItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const currentTotalPrice = useMemo(() => {
    return purchasableIngredients.reduce((total, ing) => {
      const pId = getSafeProductId(ing);
      if (selectedItems.includes(pId)) {
        const price = ing.itemType === 'Product' 
          ? (ing.ingredientId?.price || 0) 
          : (ing.ingredientId?.price || 0);
        return total + (price * (Number(ing.quantity) || 1));
      }
      return total;
    }, 0);
  }, [selectedItems, purchasableIngredients]);

  const handleCheckout = () => {
    if (!isLoggedIn) {
      setModalVisible(true);
      return;
    }

    // Logic gộp sản phẩm trùng nhau
    const groupedItems = purchasableIngredients
      .filter(ing => selectedItems.includes(getSafeProductId(ing)))
      .reduce((acc: any[], ing) => {
        const pId = getSafeProductId(ing);
        const qty = Number(ing.quantity) || 1;
        
        const existingItem = acc.find(item => item.productId === pId);
        if (existingItem) {
          existingItem.quantity += qty;
        } else {
          acc.push({ productId: pId, quantity: qty });
        }
        return acc;
      }, []);

    if (groupedItems.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm.");
      return;
    }

    router.push({
      pathname: "/(details)/checkoutTabs/CheckOutTabs",
      params: {
        source: "cart",
        items: JSON.stringify(groupedItems),
      },
    });
  };

  return (
    <View style={MenuDetailStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={MenuDetailStyles.imageHeader}>
          <Image source={{ uri: menuDetail?.data.image }} style={MenuDetailStyles.mainImage} />
        </View>

        <View style={MenuDetailStyles.infoCard}>
          <View style={MenuDetailStyles.rowBetween}>
            <Text style={MenuDetailStyles.title}>{menuDetail?.data.title}</Text>
            <View style={MenuDetailStyles.priceTag}>
              <Text style={MenuDetailStyles.priceText}>{formatVND(menuDetail?.data.totalPrice ?? 0)}</Text>
            </View>
          </View>
          <Text style={MenuDetailStyles.description}>{menuDetail?.data.description}</Text>
        </View>

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

              {recipe.ingredients.map((ingredient) => {
                const productId = getSafeProductId(ingredient);
                
                return (
                  <View key={ingredient._id} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {productId ? (
                      <TouchableOpacity 
                        onPress={() => toggleItem(productId)}
                        style={{ paddingLeft: 15 }}
                      >
                        <Ionicons 
                          name={selectedItems.includes(productId) ? "checkbox" : "square-outline"} 
                          size={22} 
                          color={selectedItems.includes(productId) ? "#E25822" : "#CCC"} 
                        />
                      </TouchableOpacity>
                    ) : (
                      <View style={{ width: 37 }} /> 
                    )}
                    <View style={{ flex: 1 }}>
                      <MenuItems item={ingredient} />
                    </View>
                  </View>
                );
              })}

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

      <View style={MenuDetailStyles.bottomBar}>
        <View>
          <Text style={MenuDetailStyles.totalLabel}>TỔNG TIỀN CHỌN ({selectedItems.length})</Text>
          <Text style={MenuDetailStyles.totalPrice}>{formatVND(currentTotalPrice)}</Text>
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