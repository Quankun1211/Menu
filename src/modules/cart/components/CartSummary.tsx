import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  interpolate,
  Extrapolation
} from 'react-native-reanimated';
import { formatVND } from '@/utils/helper';
import {router} from "expo-router"

const DETAIL_SECTION_HEIGHT = 100; 

export default function CartSummary({totalAmount, onCheckout}: {totalAmount: number, onCheckout:() => void}) {
  const translateY = useSharedValue(DETAIL_SECTION_HEIGHT);
  const context = useSharedValue({ y: DETAIL_SECTION_HEIGHT });

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      const nextY = event.translationY + context.value.y;
      translateY.value = Math.max(0, Math.min(nextY, DETAIL_SECTION_HEIGHT));
    })
    .onEnd(() => {
      if (translateY.value < DETAIL_SECTION_HEIGHT / 2) {
        translateY.value = withSpring(0, { damping: 20, stiffness: 90 });
      } else {
        translateY.value = withSpring(DETAIL_SECTION_HEIGHT, { damping: 20, stiffness: 90 });
      }
    });

  const detailStyle = useAnimatedStyle(() => ({
    height: interpolate(
      translateY.value,
      [0, DETAIL_SECTION_HEIGHT],
      [DETAIL_SECTION_HEIGHT, 0],
      Extrapolation.CLAMP
    ),
    opacity: interpolate(
      translateY.value,
      [0, DETAIL_SECTION_HEIGHT * 0.7],
      [1, 0],
      Extrapolation.CLAMP
    ),
  }));

  return (
    <View style={styles.outerWrapper} pointerEvents="box-none">
      <GestureDetector gesture={gesture}>
        <Animated.View style={styles.container}>
          <View style={styles.handleBar} />
          
          <Animated.View style={[styles.detailContent, detailStyle]}>
            <View style={styles.row}>
              <Text style={styles.label}>Tạm tính</Text>
              <Text style={styles.value}>{formatVND(totalAmount)}</Text>
            </View>
            <View style={styles.row}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.label}>Phí vận chuyển </Text>
                <Ionicons name="information-circle-outline" size={14} color="#999" />
              </View>
              <Text style={styles.value}>25.000đ</Text>
            </View>
            <View style={styles.divider} />
          </Animated.View>

          <View style={styles.visibleSection}>
            <View style={styles.row}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.totalLabel}>Tổng cộng</Text>
                <Ionicons name="chevron-up" size={16} color="#999" style={{ marginLeft: 4 }} />
              </View>
              <Text style={styles.totalValue}>{formatVND(totalAmount)}</Text>
            </View>

            <TouchableOpacity onPress={() => onCheckout()} style={styles.checkoutBtn} activeOpacity={0.8}>
              <Ionicons name="cart-outline" size={22} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.checkoutText}>Tiến hành thanh toán</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  outerWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 30, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 20,
  },
  handleBar: {
    width: 36,
    height: 4,
    backgroundColor: '#EAEAEA',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 8, 
  },
  detailContent: {
    overflow: 'hidden',
    justifyContent: 'flex-end', 
  },
  visibleSection: {
    marginTop: 0, 
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8, 
    alignItems: 'center',
  },
  label: { fontSize: 14, color: '#888' },
  value: { fontSize: 14, fontWeight: '600', color: '#333' },
  divider: {
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#F2F2F2',
    marginVertical: 6,
  },
  totalLabel: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  totalValue: { fontSize: 20, fontWeight: 'bold', color: '#F26522' },
  checkoutBtn: {
    backgroundColor: '#F26522',
    flexDirection: 'row',
    height: 52, 
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8, 
  },
  checkoutText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});