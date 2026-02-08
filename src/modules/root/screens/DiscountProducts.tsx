import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DiscountProductStyles } from '../css/DiscountProductStyles';
import useGetShockDeals from '../hooks/useGetShockDeals';
import DiscountItems from '../components/DiscountItems';

const DiscountGrid = () => {
  const { data: getDiscountProducts, isPending } = useGetShockDeals()
  
  return (
    <View style={DiscountProductStyles.container}>
      {/* Header */}
      <View style={DiscountProductStyles.sectionHeader}>
        <Text style={DiscountProductStyles.sectionTitle}>Ưu Đãi Cực Sốc</Text>
        <TouchableOpacity>
          <Text style={DiscountProductStyles.seeAll}>Xem tất cả</Text>
        </TouchableOpacity>
      </View>

      {/* Grid 2x2 */}
      <View style={DiscountProductStyles.gridContainer}>
        {getDiscountProducts?.data && getDiscountProducts?.data.data.map((product) => (
          <DiscountItems key={product._id} product={product}/>
        ))}
      </View>
    </View>
  );
};

export default DiscountGrid;