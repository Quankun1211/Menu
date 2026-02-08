import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; 
import { OrderResponse } from '../types/api-response';
import { formatDate, formatVND } from '@/utils/helper';
import { router } from "expo-router"

interface Props {
  order: OrderResponse;
}

const ProcessingOrderItem = ({ order }: Props) => {
  return (
    <LinearGradient
      colors={['#C5DED3', '#f0f6fd']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.contentRow}>
        <View style={styles.infoCol}>
          <View style={styles.statusRow}>
            <View style={styles.dot} />
            <Text style={styles.statusText}>Đang xử lý</Text>
            {/* <View style={styles.pendingTag}>
              <Text style={styles.pendingTagText}>Đang xử lý</Text>
            </View> */}
          </View>

          <Text style={styles.orderCode}>Đơn hàng #XYZ</Text>
          <Text style={styles.subInfo}>{formatDate(order.createdAt)} • {formatVND(order.totalPrice)}</Text>

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.supportBtn}>
              <Ionicons name="headset-outline" size={18} color="#F26522" />
              <Text style={styles.supportBtnText}>Hỗ trợ</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => 
                router.push(
                {
                  pathname: "/(details)/orderTabs/OrderTabs",
                  params: {orderId: order._id}
                }
                )}
              style={styles.detailBtn}>
              <Text style={styles.detailBtnText}>Chi tiết</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Image source={{uri: order.thumbnail}} style={styles.productImage} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoCol: {
    flex: 1,
    paddingRight: 10,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F26522',
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#F26522',
    marginRight: 8,
  },
  pendingTag: {
    backgroundColor: '#FFF4E5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFE0B2',
  },
  pendingTagText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#F26522',
  },
  orderCode: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subInfo: {
    fontSize: 13,
    color: '#666',
    marginBottom: 15,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  supportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(242, 101, 34, 0.1)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(242, 101, 34, 0.2)',
  },
  supportBtnText: {
    color: '#F26522',
    fontWeight: 'bold',
    marginLeft: 4,
    fontSize: 13,
  },
  detailBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  detailBtnText: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  productImage: {
    width: 95,
    height: 95,
    borderRadius: 16,
  },
});

export default ProcessingOrderItem;