import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert, Modal } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { PromoModal } from '../components/PromoModal';
import { CheckoutStyles } from '../css/CheckOutStyles';
import { AddressModel } from '../types/api-response';
import useGetAddress from '../hooks/useGetAddress';
import { useCheckoutStore } from '@/store/useCheckoutStore';
import { usePreviewCheckout } from '../hooks/usePreviewCheckout';
import { formatVND } from '@/utils/helper';
import PaymentOption from '../components/PaymentOption';
import useCheckout from '../hooks/useCheckout';
import Toast from 'react-native-toast-message';
import useGetMyCoupons from "../../profile/hooks/useGetMyCoupons";

type CheckoutScreenProps = {
  source?: "cart" | "buy_now";
  items: {
    productId: string;
    quantity: number;
  }[];
};

export default function CheckoutScreen({
  source = "cart",
  items,
}: CheckoutScreenProps) {
  const memoizedItems = useMemo(() => items.map(i => ({
    productId: i.productId,
    quantity: i.quantity
  })), [items]);

  const scrollRef = useRef<ScrollView>(null)

  const { data: previewRes, isPending: previewPending } = usePreviewCheckout(memoizedItems);
  const { data: couponsData } = useGetMyCoupons();
  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);
  const checkoutItems = previewRes?.data?.items ?? [];
  const totalAmount = previewRes?.data?.totalAmount ?? 0;
  const userCoupons = Array.isArray(couponsData?.data) ? couponsData.data : [];

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const { data: getAddress, isPending } = useGetAddress();
  const addresses: AddressModel[] = getAddress?.data ?? [];

  const { selectedAddress, setSelectedAddress } = useCheckoutStore();

  const displayAddress =
    selectedAddress ||
    addresses.find((a) => a.isDefault) ||
    addresses[0] ||
    null;

  const [isModalVisible, setModalVisible] = useState(false);
  const [discountValue, setDiscountValue] = useState(0);
  const [appliedCode, setAppliedCode] = useState("");

  useFocusEffect(
    useCallback(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: false })
      return () => {
        setDiscountValue(0)
        setAppliedCode("")
      }
    }, [])
  )

  const onApplyPromo = (discount: number, code: string) => {
    setDiscountValue(discount);
    setAppliedCode(code);
  };

  const shippingFee = 25000;
  const subTotal = totalAmount;
  const finalTotal = Math.max(subTotal + shippingFee - Math.abs(discountValue), 0);

  useEffect(() => {
    if (!selectedAddress && displayAddress) {
      setSelectedAddress(displayAddress);
    }
  }, [addresses]);

  const { mutate: checkoutApply, isPending: checkoutPending } = useCheckout()
  
  const handlePlaceOrder = () => {
    if (!displayAddress) {
      Alert.alert("Thông báo", "Vui lòng thêm địa chỉ nhận hàng");
      return;
    }

    checkoutApply({
      items: memoizedItems,
      address: displayAddress._id,
      couponCode: appliedCode,
      source: "cart",
      paymentMethod: paymentMethod,
      shippingFee: shippingFee
    }, {
      onSuccess: (response) => {
        const paymentUrl = response?.data?.paymentUrl;

        if (paymentUrl) {
          router.push({
            pathname: "/(details)/checkoutTabs/PaymentWebView",
            params: { url: paymentUrl }
          });
        } else {
          Toast.show({ type: 'success', text1: 'Đặt hàng thành công' });
          router.replace("/(tabs)/order");
        }
      },
      onError: (error: any) => {
        Toast.show({ type: 'error', text1: 'Lỗi', text2: error.message });
      }
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 15 }}>

        <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 16 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Địa chỉ nhận hàng
          </Text>

          {displayAddress && (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/(details)/addressTabs/ListAddressTabs",
                  params: {
                    source: source,
                    items: JSON.stringify(items)
                  }
                })
              }
            >
              <Text style={{ color: "#F26522", fontWeight: "bold" }}>
                Thay đổi
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {displayAddress ? (
          <TouchableOpacity
            style={CheckoutStyles.addressCard}
            onPress={() =>
              router.push({
                pathname: "/(details)/addressTabs/ListAddressTabs",
                params: {
                  source: source,
                  items: JSON.stringify(items)
                }
              })
            }
          >
            <Ionicons name="location" size={20} color="#F26522" />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={CheckoutStyles.userName}>
                {displayAddress.name} | {displayAddress.phone}
              </Text>
              <Text style={CheckoutStyles.addressText}>
                {displayAddress.address}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#CCC" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={CheckoutStyles.emptyAddressCard}
            onPress={() =>
              router.push("/(details)/addressTabs/AddressTabs")
            }
          >
            <Ionicons name="add-circle" size={28} color="#F26522" />
            <Text>Thêm địa chỉ nhận hàng</Text>
          </TouchableOpacity>
        )}

        <Text style={CheckoutStyles.sectionTitle}>Phương thức thanh toán</Text>
        <PaymentOption
          id="vnpay"
          title="VNPay"
          sub="Ưu đãi giảm 10k khi dùng VNPay"
          icon="https://vnpay.vn/s1/statics.vnpay.vn/2023/9/09n8zf9sh8v11695442541348.png"
          selected={paymentMethod === 'vnpay'}
          onPress={() => setPaymentMethod('vnpay')}
        />

        <PaymentOption
          id="cod"
          title="Tiền mặt (COD)"
          sub="Thanh toán khi nhận hàng"
          isIconComponent={<MaterialCommunityIcons name="cash-register" size={24} color="#555" />}
          selected={paymentMethod === 'cod'}
          onPress={() => setPaymentMethod('cod')}
        />

        <TouchableOpacity
          style={CheckoutStyles.promoCard}
          onPress={() => setModalVisible(true)}
        >
          <MaterialCommunityIcons name="ticket-percent" size={24} color="#F26522" />
          <Text style={CheckoutStyles.promoText}>
            {appliedCode ? `Đã áp dụng mã: ${appliedCode}` : "Sử dụng mã giảm giá"}
          </Text>
          <Ionicons name="chevron-forward" size={18} color="#F26522" />
        </TouchableOpacity>

        <View style={CheckoutStyles.summarySection}>
          <Text style={CheckoutStyles.sectionTitle}>Chi tiết đơn hàng</Text>

          <View style={CheckoutStyles.summaryRow}>
            <Text style={CheckoutStyles.summaryLabel}>Tạm tính</Text>
            <Text style={CheckoutStyles.summaryValue}>{formatVND(totalAmount)}</Text>
          </View>

          <View style={CheckoutStyles.summaryRow}>
            <Text style={CheckoutStyles.summaryLabel}>Phí vận chuyển</Text>
            <Text style={CheckoutStyles.summaryValue}>{formatVND(shippingFee)}</Text>
          </View>

          <View style={CheckoutStyles.summaryRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[CheckoutStyles.summaryLabel, { color: '#4CAF50' }]}>Giảm giá</Text>
              <Ionicons name="information-circle" size={14} color="#4CAF50" style={{ marginLeft: 4 }} />
            </View>
            <Text style={[CheckoutStyles.summaryValue, { color: '#4CAF50' }]}>-{formatVND(Math.abs(discountValue))}</Text>
          </View>

          <View style={[CheckoutStyles.summaryRow, { marginTop: 15 }]}>
            <Text style={CheckoutStyles.totalLabel}>Tổng cộng</Text>
            <Text style={CheckoutStyles.totalValue}>{formatVND(finalTotal)}</Text>
          </View>

          <View style={CheckoutStyles.deliveryNote}>
            <MaterialCommunityIcons name="truck-delivery-outline" size={16} color="#888" />
            <Text style={CheckoutStyles.deliveryNoteText}>Dự kiến giao hàng trong 30-45 phút</Text>
          </View>
        </View>
      </ScrollView>

      <View style={CheckoutStyles.footer}>
        <TouchableOpacity
          style={[CheckoutStyles.submitBtn, checkoutPending && { opacity: 0.7 }]}
          onPress={() => setConfirmModalVisible(true)}
          disabled={checkoutPending}
        >
          {checkoutPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={CheckoutStyles.submitBtnText}>
              Đặt hàng ngay • {formatVND(finalTotal)}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <Modal visible={isConfirmModalVisible} transparent animationType="fade">
        <View style={CheckoutStyles.modalOverlay}>
          <View style={CheckoutStyles.modalContent}>
            <Text style={CheckoutStyles.modalTitle}>Xác nhận đặt hàng</Text>
            <Text style={CheckoutStyles.modalText}>Bạn có chắc chắn muốn đặt đơn hàng này với tổng giá trị <Text style={{fontWeight: 'bold'}}>{formatVND(finalTotal)}</Text> không?</Text>
            <View style={CheckoutStyles.modalButtons}>
              <TouchableOpacity style={[CheckoutStyles.btn, CheckoutStyles.cancelBtn]} onPress={() => setConfirmModalVisible(false)}>
                <Text style={CheckoutStyles.cancelText}>Quay lại</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[CheckoutStyles.btn, CheckoutStyles.confirmBtn]} onPress={handlePlaceOrder}>
                <Text style={CheckoutStyles.confirmText}>Xác nhận</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      <PromoModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onApply={onApplyPromo}
        totalAmount={subTotal}
        items={memoizedItems}
        userCoupons={userCoupons}
      />
    </View>
  );
}