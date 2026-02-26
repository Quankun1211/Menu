import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IngredientResponse } from '../types/api-response';
import { formatVND } from '@/utils/helper';
import { router } from 'expo-router';

type MenuIngredientProps = {
  item: IngredientResponse
}

const MenuItems = ({ item }: MenuIngredientProps) => {
  const details = item.ingredientId;

  if (!details) return null;

  const displayName = details.customName || details.name;
  const displayImage = details.image || details.images;
  const displayPrice = details.price || 0;
  
  const isInShop = item.itemType === 'Product' || !!details.productId;

  return (
    <View style={[
      styles.container, 
      !isInShop && styles.notInSystemContainer 
    ]}>
      <View style={styles.leftRow}>
        <Image 
          source={displayImage ? { uri: displayImage } : require("../../../assets/meat/lapxuong.jpg")} 
          style={styles.productAvatar} 
        />
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>{displayName}</Text>
          <Text style={styles.details}>
            {item.quantity} {details.unit} • {formatVND(displayPrice)}/{details.unit}
          </Text>
        </View>
      </View>
      
      {isInShop ? (
        <TouchableOpacity
         onPress={() => {
          const memoiData = [{
            productId: details._id,
            quantity: 1,
          }]
          
          router.push({
              pathname: "/(details)/checkoutTabs/CheckOutTabs",
              params: {
                source: "cart",
                items: JSON.stringify(memoiData),
              },
            });
         }}
         style={styles.cartButton}>
          <Ionicons name="cart-outline" size={18} color="#E25822" />
        </TouchableOpacity>
      ) : (
        <View style={styles.selfPrepareBadge}>
          <Ionicons name="hammer-outline" size={14} color="#888" />
          <Text style={styles.selfPrepareText}>Tự chuẩn bị</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 30,
    marginBottom: 10,
    marginLeft: 20, 
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  notInSystemContainer: {
    backgroundColor: '#FAFAFA',
    borderColor: '#F5F5F5',
    opacity: 0.8,
  },
  leftRow: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  productAvatar: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: '#F9F9F9' },
  info: { marginLeft: 12, flex: 1 },
  name: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  details: { fontSize: 12, color: '#888', marginTop: 2 },
  cartButton: { 
    backgroundColor: '#FFF5F0', 
    padding: 8, 
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFE4D5'
  },
  selfPrepareBadge: { 
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0', 
    paddingVertical: 6, 
    paddingHorizontal: 10, 
    borderRadius: 15 
  },
  selfPrepareText: {
    fontSize: 10,
    color: '#888',
    marginLeft: 4,
    fontWeight: '600'
  }
});

export default MenuItems;