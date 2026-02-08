import { View, FlatList, Text, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native';
import { useState } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { SpecialStyles } from '../css/SpecialStyles';
import useGetProductSpecial from '@/modules/region/hooks/useGetProductSpectial';
import { formatVND } from '@/utils/helper';
import {router} from "expo-router"

const REGIONS = [
  { id: 'all', name: 'Tất cả' },
  { id: 'bac', name: 'Miền Bắc' },
  { id: 'trung', name: 'Miền Trung' },
  { id: 'nam', name: 'Miền Nam' },
];

export default function SpecialProduct() {
  const [selectedRegion, setSelectedRegion] = useState('all');

  const { data: productsData, isPending, refetch } = useGetProductSpecial({
    region: selectedRegion,
    sort: 'newest'
  });

  const renderProductItem = ({ item }: { item: any }) => (
    <View style={SpecialStyles.productCard}>
      <View style={SpecialStyles.imageWrapper}>
        <TouchableOpacity
            onPress={() => router.push({
                pathname: "/(details)/exploreItemTabs/SpecialDetail",
                params: { id: item._id }
            })}
        >
            <Image source={{ uri: item.images }} style={SpecialStyles.productImage} />
        </TouchableOpacity>
        {item.salePercent && (
          <View style={SpecialStyles.tagBadge}>
            <Text style={SpecialStyles.tagBadgeText}>GIẢM {item.salePercent.percent}%</Text>
          </View>
        )}
      </View>
      
      <View style={SpecialStyles.productContent}>
        <View style={SpecialStyles.subTagRow}>
          <Ionicons name="restaurant" size={12} color="#D16D2F" />
          <Text style={SpecialStyles.subTagText}>{item.origin || 'ĐẶC SẢN'}</Text>
        </View>
        <Text style={SpecialStyles.productTitleItalic} numberOfLines={1}>
          {item.story ? `${item.story.split('.')[0]}...` : ''}
        </Text>
        <Text style={SpecialStyles.productName}>{item.name}</Text>
        <Text style={SpecialStyles.productDesc} numberOfLines={2}>{item.description}</Text>
        
        <View style={SpecialStyles.priceRow}>
          <View>
            {item.salePercent && (
              <Text style={SpecialStyles.oldPriceText}>{formatVND(item.price)}</Text>
            )}
            <Text style={SpecialStyles.currentPriceText}>{formatVND(item.finalPrice)} / {item.unit}</Text>
          </View>
          <TouchableOpacity style={SpecialStyles.addCartBtn}>
            <Ionicons name="bag-handle" size={18} color="#fff" />
            <Text style={SpecialStyles.addCartText}>Thêm vào giỏ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={SpecialStyles.container}>
      <FlatList
        data={productsData?.data}
        keyExtractor={(item) => item._id}
        renderItem={renderProductItem}
        showsVerticalScrollIndicator={false}
        refreshing={isPending}
        onRefresh={refetch}
        ListHeaderComponent={
          <View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              style={SpecialStyles.filterScroll}
              contentContainerStyle={{ paddingRight: 20 }}
            >
              {REGIONS.map((item) => {
                const isActive = selectedRegion === item.id;
                return (
                  <TouchableOpacity 
                    key={item.id} 
                    onPress={() => setSelectedRegion(item.id)}
                    style={[
                      SpecialStyles.filterBtn, 
                      isActive && SpecialStyles.filterBtnActive
                    ]}
                  >
                    <Text style={[
                      SpecialStyles.filterText, 
                      isActive && SpecialStyles.filterTextActive
                    ]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <View style={SpecialStyles.sectionHeader}>
              <Text style={SpecialStyles.sectionTitle}>
                Sản vật {selectedRegion === 'all' ? 'nổi bật' : REGIONS.find(r => r.id === selectedRegion)?.name}
              </Text>
              <TouchableOpacity>
                <Text style={SpecialStyles.seeMore}>Xem thêm</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        ListEmptyComponent={
          !isPending ? (
            <View style={{ alignItems: 'center', marginTop: 50 }}>
              <Text style={{ color: '#999' }}>Không có sản phẩm nào ở khu vực này.</Text>
            </View>
          ) : <ActivityIndicator color="#D16D2F" style={{ marginTop: 20 }} />
        }
        ListFooterComponent={<View style={{ height: 100 }} />}
      />
    </View>
  );
}