import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useApplyCoupon } from "../hooks/useApplyCoupon";
import { formatVND } from "@/utils/helper";

interface PromoModalProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: (discount: number, code: string) => void;
  totalAmount: number;
  items: {
    productId: string;
    quantity: number;
  }[];
  userCoupons?: any[];
}

export const PromoModal = ({
  isVisible,
  onClose,
  onApply,
  totalAmount,
  items,
  userCoupons = [],
}: PromoModalProps) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const { mutate: applyCoupon, isPending } = useApplyCoupon();

  const processApply = (couponCode: string) => {
    const cleanCode = couponCode.trim().toUpperCase();
    if (!cleanCode) {
      setError("Vui lòng nhập mã giảm giá");
      return;
    }

    applyCoupon(
      {
        code: cleanCode,
        totalAmount,
        items,
      },
      {
        onSuccess: (res) => {
          onApply(res.data.discountAmount, res.data.code);
          handleClose();
        },
        onError: (err: any) => {
          setError(
            err?.response?.data?.message ||
              "Mã giảm giá không hợp lệ hoặc đã hết hạn"
          );
        },
      }
    );
  };

  const handleClose = () => {
    setCode("");
    setError("");
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.modalContent}
            >
              <View style={styles.header}>
                <Text style={styles.title}>Mã giảm giá</Text>
                <TouchableOpacity onPress={handleClose}>
                  <Ionicons name="close" size={24} color="#333" />
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, error && styles.inputError]}
                  placeholder="Nhập mã của bạn..."
                  value={code}
                  onChangeText={(text) => {
                    setCode(text);
                    setError("");
                  }}
                  autoCapitalize="characters"
                />
                <TouchableOpacity
                  style={styles.applyBtn}
                  onPress={() => processApply(code)}
                  disabled={isPending}
                >
                  {isPending ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.applyBtnText}>Áp dụng</Text>
                  )}
                </TouchableOpacity>
              </View>

              {!!error && <Text style={styles.errorText}>{error}</Text>}

              <Text style={styles.sectionTitle}>Voucher của bạn</Text>
              
              <ScrollView 
                style={styles.couponList} 
                showsVerticalScrollIndicator={false}
              >
                {userCoupons.length > 0 ? (
                  userCoupons.map((item, index) => {
                    const couponInfo = item.couponId;
                    const isMinAmountMet = totalAmount >= (couponInfo?.minOrderValue || 0);

                    return (
                      <TouchableOpacity
                        key={item._id || index}
                        style={[
                          styles.couponCard,
                          !isMinAmountMet && styles.couponCardDisabled
                        ]}
                        onPress={() => processApply(couponInfo?.code)}
                        disabled={isPending}
                      >
                        <View style={styles.couponIconBox}>
                          <Ionicons name="ticket" size={24} color={isMinAmountMet ? "#F26522" : "#999"} />
                        </View>
                        
                        <View style={styles.couponMainInfo}>
                          <Text style={styles.couponCodeText}>{couponInfo?.code}</Text>
                          <Text style={styles.couponDescText}>
                            Giảm {formatVND(couponInfo?.value)} cho đơn từ {formatVND(couponInfo?.minOrderValue || 0)}
                          </Text>
                          {!isMinAmountMet && (
                            <Text style={styles.warningText}>Chưa đủ điều kiện (Thiếu {formatVND(couponInfo?.minOrderValue - totalAmount)})</Text>
                          )}
                        </View>

                        <View style={styles.useBtn}>
                          <Text style={[styles.useBtnText, !isMinAmountMet && { color: '#999' }]}>Dùng</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })
                ) : (
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Bạn chưa có mã giảm giá nào trong ví</Text>
                  </View>
                )}
              </ScrollView>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    height: '75%',
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 5,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: '#F9F9F9',
    fontSize: 15,
  },
  inputError: {
    borderColor: '#FF4D4F',
  },
  applyBtn: {
    backgroundColor: '#F26522',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 12,
    minWidth: 100,
  },
  applyBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF4D4F',
    marginTop: 8,
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginTop: 25,
    marginBottom: 15,
  },
  couponList: {
    flex: 1,
  },
  couponCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  couponCardDisabled: {
    backgroundColor: '#FCFCFC',
    opacity: 0.7,
  },
  couponIconBox: {
    width: 44,
    height: 44,
    backgroundColor: '#FFF2EC',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  couponMainInfo: {
    flex: 1,
    marginLeft: 15,
  },
  couponCodeText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  couponDescText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  useBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FDF7F2',
    borderRadius: 8,
  },
  useBtnText: {
    color: '#F26522',
    fontWeight: '700',
    fontSize: 13,
  },
  warningText: {
    fontSize: 11,
    color: '#FF4D4F',
    marginTop: 4,
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    color: '#999',
    fontSize: 14,
  }
});