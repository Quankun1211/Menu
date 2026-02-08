import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RegionStyles } from '../css/RegionStyles';
import { ExploreStyles } from '@/modules/explore/css/ExploreStyles';
import useGetProductByRegion from '../hooks/useGetProductByRegion';
import { useRef, useState, useMemo, useEffect } from 'react';
import useGetCategory from '@/modules/root/hooks/useGetCategory';
import CategoryItem from '@/modules/explore/components/CategoryItem';
import ExploreProductItems from '@/modules/explore/components/ExploreProductItems';
import SearchBar from '@/components/ui/SearchBar';
import FloatingFilter from '@/components/common/FloatingFilter';
import FilterModal from '@/components/common/FilterModal';
import useGetProductByFilter from '@/hooks/useGetProductByFilter';
interface RegionScreenProps {
  id: string;
}

const REGIONS = [
  { id: 'bac', name: 'Miền Bắc' },
  { id: 'trung', name: 'Miền Trung' },
  { id: 'nam', name: 'Miền Nam' },
];

export default function RegionScreen({ id }: RegionScreenProps) {
  const [selectedId, setSelectedId] = useState(id);
  const [activeTab, setActiveTab] = useState('all');
  const flatListRef = useRef<FlatList>(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [sort, setSortBy] = useState('newest');
  const { data: getAllCategory } = useGetCategory();
  const { data: getProductByRegion, isPending } = useGetProductByRegion({
      region: selectedId,
      categoryId: activeTab === 'all' ? undefined : activeTab,
      sort
  });
  const categoriesWithAll = useMemo(() => {
    const allTab = { _id: 'all', name: 'Tất cả' };
    if (!getAllCategory?.data) return [allTab];
    return [allTab, ...getAllCategory.data];
  }, [getAllCategory]);

  useEffect(() => {
    setSelectedId(id);
  }, [id]);

  useEffect(() => {
    if (categoriesWithAll.length > 0) {
      setActiveTab('all');
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: 0,
          animated: true,
          viewPosition: 0.5,
        });
      }, 300);
    }
  }, [categoriesWithAll]);

  return (
  <View style={RegionStyles.container}>
    <FlatList
      data={getProductByRegion?.data}
      keyExtractor={(item) => item._id}
      numColumns={2}
      columnWrapperStyle={ExploreStyles.gridRow}
      showsVerticalScrollIndicator={false}
      
      refreshing={isPending}
      onRefresh={() => {}} 

      ListHeaderComponent={
        <View>
          <SearchBar/>

          <View style={RegionStyles.tabWrapper}>
            <View style={RegionStyles.tabContainer}>
              {REGIONS.map((region) => {
                const isActive = selectedId === region.id;
                return (
                  <TouchableOpacity
                    key={region.id}
                    onPress={() => setSelectedId(region.id)}
                    style={[RegionStyles.tabItem, isActive && RegionStyles.activeTabItem]}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[RegionStyles.tabText, isActive && RegionStyles.activeTabText]}
                      numberOfLines={1}
                      adjustsFontSizeToFit={true}
                      minimumFontScale={0.5}
                    >
                      {region.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={ExploreStyles.headerWrapper}>
            <FlatList
              ref={flatListRef}
              horizontal
              data={categoriesWithAll}
              keyExtractor={(item) => item._id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={ExploreStyles.chipList}
              getItemLayout={(_, index) => ({
                length: 100,
                offset: 100 * index,
                index,
              })}
              onScrollToIndexFailed={(info) => {
                flatListRef.current?.scrollToOffset({
                  offset: info.averageItemLength * info.index,
                  animated: true
                });
              }}
              renderItem={({ item }) => (
                <CategoryItem
                  item={item}
                  isActive={activeTab === item._id}
                  onPress={(id) => {
                    setActiveTab(id);
                    const index = categoriesWithAll.findIndex(c => c._id === id);
                    if (index !== -1) {
                      flatListRef.current?.scrollToIndex({
                        index,
                        animated: true,
                        viewPosition: 0.5
                      });
                    }
                  }}
                />
              )}
            />
          </View>
        </View>
      }

      contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 20 }}
      renderItem={({ item }) => (
        <ExploreProductItems product={item} />
      )}
    />

    <FloatingFilter onPress={() => setFilterVisible(true)} />
    <FilterModal 
      visible={filterVisible} 
      onClose={() => setFilterVisible(false)} 
      currentSort={sort}
      onSelect={(val: string) => setSortBy(val)}
    />
  </View>
);
}