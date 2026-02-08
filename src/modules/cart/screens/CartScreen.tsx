import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState, useMemo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import CartItems from '../components/CartItems';
import CartSummary from '../components/CartSummary';
import useGetCart from '../hooks/useGetCart';
import useRemoveCartItems from '../hooks/useRemoveCartItems';
import { CartStyles } from '../css/CartStyles';
import { router } from "expo-router"
import Toast from "react-native-toast-message";
import useGetMe from '@/hooks/useGetMe';
export default function CartScreen() {
  const { data: meData, isPending: mePending } = useGetMe();
  const isLoggedIn = !!meData?.data;
  
  const { data: cartData, isPending } = useGetCart(isLoggedIn);
  
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  const { removeCartItems, isPending: removeCartPending } = useRemoveCartItems();

  const items = cartData?.data.items ?? [];

  const selectedTotalAmount = useMemo(() => {
    return items
      .filter(item => selectedItems.includes(item.productId))
      .reduce((sum, item) => sum + (item.finalPrice * item.quantity), 0);
  }, [items, selectedItems]);

  const toggleSelect = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  if (!isLoggedIn) {
    return (
      <View style={{ flex: 1, backgroundColor: '#F8F9FA', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Ionicons name="cart-outline" size={100} color="#CCC" />
        <Text style={{ fontSize: 18, color: '#666', marginTop: 20, textAlign: 'center' }}>
          Vui lòng đăng nhập để xem giỏ hàng của bạn
        </Text>
        <TouchableOpacity 
          onPress={() => router.push('/(auth)/login')}
          style={{ backgroundColor: '#F26522', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 25, marginTop: 20 }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Đăng nhập ngay</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleSelectAll = () => {
    if (selectedItems.length === items.length && items.length > 0) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map(item => item.productId));
    }
  };

  const handleDeleteSelected = () => {
    removeCartItems(
      { productIds: selectedItems },
      {
        onSuccess: () => {
          Toast.show({
            type: 'success',
            text1: `Đã xóa ${selectedItems.length} sản phẩm khỏi giỏ hàng 🛒`
          });
          setIsEditing(false);
          setSelectedItems([]);
        },
      }
    );
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'Vui lòng chọn sản phẩm để thanh toán'
      });
      return;
    }
  
    const itemsToCheckout = items
      .filter(i => selectedItems.includes(i.productId))
      .map(i => ({
        productId: i.productId,
        quantity: i.quantity,
      }));

    router.push({
      pathname: "/(details)/checkoutTabs/CheckOutTabs",
      params: {
        source: "cart",
        items: JSON.stringify(itemsToCheckout),
      },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
      <View style={CartStyles.headerAction}>
        <Text style={CartStyles.headerTitle}>Giỏ hàng ({items.length})</Text>
        <TouchableOpacity 
          disabled={isPending}
          onPress={() => {
            setIsEditing(!isEditing);
          }}
        >
          <Text style={[CartStyles.editBtn, isPending && { opacity: 0.5 }]}>
            {isEditing ? 'Xong' : 'Chỉnh sửa'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
      >
        {isPending ? (
          <View style={{ marginTop: 50 }}>
            <ActivityIndicator size="large" color="#F26522" />
          </View>
        ) : items.length === 0 ? (
          <Text style={CartStyles.textNone}>Chưa có sản phẩm nào!</Text>
        ) : (
          items.map((cart) => (
            <CartItems 
              key={cart.productId} 
              item={cart} 
              isEditing={true} 
              isSelected={selectedItems.includes(cart.productId)}
              onSelect={() => toggleSelect(cart.productId)}
            />
          ))
        )}
      </ScrollView>
      
      {!isPending && items.length > 0 && (
        isEditing ? (
          <View style={CartStyles.deleteBar}>
            <TouchableOpacity 
              style={CartStyles.selectAll} 
              onPress={handleSelectAll}
              disabled={removeCartPending}
            >
              <Ionicons 
                name={selectedItems.length === items.length ? "checkbox" : "square-outline"} 
                size={22} 
                color="#F26522" 
              />
              <Text style={CartStyles.selectAllText}>Tất cả</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                CartStyles.deleteBtn, 
                (selectedItems.length === 0 || removeCartPending) && { opacity: 0.5 }
              ]}
              onPress={handleDeleteSelected}
              disabled={selectedItems.length === 0 || removeCartPending}
            >
              {removeCartPending ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <Text style={CartStyles.deleteBtnText}>Xóa ({selectedItems.length})</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <CartSummary 
            // Truyền tổng tiền của những món được CHỌN
            totalAmount={selectedTotalAmount} 
            onCheckout={handleCheckout}
            // Có thể thêm prop disabled nếu không chọn gì
          />
        )
      )}
    </View>
  );
}