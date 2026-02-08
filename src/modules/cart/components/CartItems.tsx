import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { CartStyles } from '../css/CartStyles';
import { Ionicons } from '@expo/vector-icons';
import { CartItemResponse } from '../types/api-response';
import { formatVND } from '@/utils/helper';
import useRemoveCartItems from '../hooks/useRemoveCartItems';
import useUpdateCartQuantity from '../hooks/useUpdateCartQuantity';
import Toast from 'react-native-toast-message';

interface CartItemsProps {
  item: CartItemResponse;
  isEditing?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
}

const CartItems = ({ item, isEditing, isSelected, onSelect }: CartItemsProps) => {
  const { removeCartItems, isPending: removeCartPending } = useRemoveCartItems();
  const { mutate: updateQuantity, isPending: updatePending } = useUpdateCartQuantity();

  const [localQuantity, setLocalQuantity] = useState(item.quantity);

  useEffect(() => {
    setLocalQuantity(item.quantity);
  }, [item.quantity]);

  const discountPercent = item.sale?.percent;
  const hasDiscount = discountPercent && discountPercent > 0;

  const handleDeleteSingle = () => {
    removeCartItems(
      { productIds: [item.productId] },
      {
        onSuccess: () => {
          Toast.show({
            type: 'success',
            text1: `Đã xóa ${item.product.name} khỏi giỏ hàng 🛒`,
          });
        },
      }
    );
  };

  const handleIncrease = () => {
    const next = localQuantity + 1;
    setLocalQuantity(next); // 🔥 update UI ngay

    updateQuantity(
      { productId: item.productId, quantity: next },
      {
        onError: () => {
          // rollback nếu lỗi
          setLocalQuantity(item.quantity);
          Toast.show({
            type: 'error',
            text1: 'Cập nhật số lượng thất bại',
          });
        },
      }
    );
  };

  const handleDecrease = () => {
    if (localQuantity <= 1) return;

    const next = localQuantity - 1;
    setLocalQuantity(next);

    updateQuantity(
      { productId: item.productId, quantity: next },
      {
        onError: () => {
          setLocalQuantity(item.quantity);
          Toast.show({
            type: 'error',
            text1: 'Cập nhật số lượng thất bại',
          });
        },
      }
    );
  };

  const totalItemPrice = item.finalPrice * localQuantity;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
      {isEditing && (
        <TouchableOpacity onPress={onSelect} style={{ marginRight: 12, paddingVertical: 20 }}>
          <Ionicons
            name={isSelected ? 'checkbox' : 'square-outline'}
            size={24}
            color="#F26522"
          />
        </TouchableOpacity>
      )}

      <View style={[CartStyles.card, { flex: 1, marginBottom: 0 }]}>
        <View> 
          <Image source={{ uri: item.product.images }} style={CartStyles.image} /> 
          {hasDiscount && ( 
            <View style={CartStyles.badge}> 
              <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>
                {`-${discountPercent}%`}
              </Text>
            </View> )} 
        </View>

        <View style={CartStyles.info}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={CartStyles.name} numberOfLines={1}>
              {item.product.name}
            </Text>

            {!isEditing && (
              <TouchableOpacity onPress={handleDeleteSingle} disabled={removeCartPending}>
                <Ionicons
                  name="trash-outline"
                  size={20}
                  color={removeCartPending ? '#ccc' : '#ff8330'}
                />
              </TouchableOpacity>
            )}
          </View>

          <Text style={CartStyles.oldPrice}>
            Giá gốc: {formatVND(item.product.price)}
          </Text>

          <View style={CartStyles.priceRow}>
            <Text style={CartStyles.currentPrice}>
              {formatVND(totalItemPrice)}
            </Text>

            <View style={CartStyles.quantityControl}>
              <TouchableOpacity
                style={CartStyles.btnAction}
                onPress={handleDecrease}
                disabled={updatePending || localQuantity <= 1}
              >
                <Ionicons name="remove" size={16} color="#F26522" />
              </TouchableOpacity>

              <Text style={CartStyles.quantityText}>{localQuantity}</Text>

              <TouchableOpacity
                style={[CartStyles.btnAction, CartStyles.btnPlus]}
                onPress={handleIncrease}
                disabled={updatePending}
              >
                <Ionicons name="add" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItems;
