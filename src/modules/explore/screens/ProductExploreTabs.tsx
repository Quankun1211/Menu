// import { View, FlatList, Text, TouchableOpacity } from 'react-native';
// import { useState, useMemo, useRef, useEffect } from 'react';
// import { useLocalSearchParams } from 'expo-router';
// import SearchBar from '@/components/ui/SearchBar';
// import CategoryItem from '../components/CategoryItem';
// import ExploreProductItems from '../components/ExploreProductItems';
// import FloatingFilter from '@/components/common/FloatingFilter';
// import FilterModal from '@/components/common/FilterModal';
// import useGetCategory from '@/modules/root/hooks/useGetCategory';
// import useGetProductByRegion from '@/modules/region/hooks/useGetProductByRegion';
// import { ExploreStyles } from '../css/ExploreStyles';
// import { RegionStyles } from '@/modules/region/css/RegionStyles';

// const REGIONS = [
//   { id: 'bac', name: 'Miền Bắc' },
//   { id: 'trung', name: 'Miền Trung' },
//   { id: 'nam', name: 'Miền Nam' },
// ];


// export default function ProductExploreTabs() {
//   const { categoryId, regionId, sortInit } = useLocalSearchParams<{ categoryId: string, regionId: string, sortInit: string }>();
  
//   const [selectedRegion, setSelectedRegion] = useState(regionId || 'bac');
//   const [activeTab, setActiveTab] = useState(categoryId || 'all');
  
//   const [filterVisible, setFilterVisible] = useState(false);
//   const [sort, setSortBy] = useState(sortInit || 'newest');
  
//   const flatListRef = useRef<FlatList>(null);

//   const { data: getAllCategory } = useGetCategory();

//   useEffect(() => {
//     if (regionId) {
//       setSelectedRegion(regionId);
//     }
//   }, [regionId]);

//   useEffect(() => {
//     if (categoryId) {
//       setActiveTab(categoryId);
//     }
//   }, [categoryId]);

//   const { data: productsData, isPending } = useGetProductByRegion({
//     region: selectedRegion,
//     categoryId: activeTab === 'all' ? undefined : activeTab,
//     sort
//   });

//   const categoriesWithAll = useMemo(() => {
//     const allTab = { _id: 'all', name: 'Tất cả' };
//     if (!getAllCategory?.data) return [allTab];
//     return [allTab, ...getAllCategory.data];
//   }, [getAllCategory]);

//   useEffect(() => {
//     if (regionId) setSelectedRegion(regionId);
//     if (categoryId) setActiveTab(categoryId);
//   }, [regionId, categoryId]);

//   useEffect(() => {
//     if (activeTab !== 'all' && categoriesWithAll.length > 1) {
//       const index = categoriesWithAll.findIndex(item => item._id === activeTab);
//       if (index !== -1) {
//         setTimeout(() => {
//           flatListRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0.5 });
//         }, 300);
//       }
//     }
//   }, [activeTab, categoriesWithAll]);
//     return (
//         <View>
//             <FlatList
//                 data={productsData?.data}
//                 keyExtractor={(item) => item._id}
//                 numColumns={2}
//                 columnWrapperStyle={ExploreStyles.gridRow}
//                 showsVerticalScrollIndicator={false}
//                 refreshing={isPending}
//                 onRefresh={() => {}}
                
//                 ListHeaderComponent={
//                     <View>
        
//                     <View style={RegionStyles.tabWrapper}>
//                         <View style={RegionStyles.tabContainer}>
//                         {REGIONS.map((region) => {
//                             const isActive = selectedRegion === region.id;
//                             return (
//                             <TouchableOpacity
//                                 key={region.id}
//                                 onPress={() => setSelectedRegion(region.id)}
//                                 style={[RegionStyles.tabItem, isActive && RegionStyles.activeTabItem]}
//                                 activeOpacity={0.8}
//                             >
//                                 <Text style={[RegionStyles.tabText, isActive && RegionStyles.activeTabText]}>
//                                 {region.name}
//                                 </Text>
//                             </TouchableOpacity>
//                             );
//                         })}
//                         </View>
//                     </View>
        
//                     <View style={ExploreStyles.headerWrapper}>
//                         <FlatList
//                         ref={flatListRef}
//                         horizontal
//                         data={categoriesWithAll}
//                         keyExtractor={(item) => item._id}
//                         showsHorizontalScrollIndicator={false}
//                         contentContainerStyle={ExploreStyles.chipList}
//                         renderItem={({ item }) => (
//                             <CategoryItem
//                             item={item}
//                             isActive={activeTab === item._id}
//                             onPress={(id) => setActiveTab(id)}
//                             />
//                         )}
//                         />
//                     </View>
//                     </View>
//                 }
                
//                 contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 20 }}
//                 renderItem={({ item }) => (
//                     <ExploreProductItems product={item} />
//                 )}
//             />
        
//             <FloatingFilter onPress={() => setFilterVisible(true)} />
                
//             <FilterModal 
//                 visible ={filterVisible} 
//                 onClose={() => setFilterVisible(false)} 
//                 currentSort={sort}
//                 onSelect={(val: string) => setSortBy(val)}
//             />
//         </View>
//     )
// }