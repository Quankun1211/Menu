import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import CategoryItem from '../components/CategoryItem';
import { ExploreStyles } from '../css/ExploreStyles';
import { ExploreMenuStyle } from '../css/ExploreMenuStyle';
import { useCallback, useRef, useState, useMemo } from 'react';
import ListMenuItem from '../components/ListMenuItem';
import useGetCategoryMenu from '../hooks/useGetCategoryMenu';
import useGetMenu from '../hooks/useGetMenu';

export default function MenuExploreTabs() {
  const [activeTab, setActiveTab] = useState("all");
  const horizontalFlatListRef = useRef<FlatList>(null);
  
  const { data: getCategoryMenu } = useGetCategoryMenu();
  const { data: menuResponse, isPending: pendingMenu, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetMenu(activeTab);

  const categoriesWithAll = useMemo(() => {
    const allTab = { 
      _id: 'all', 
      name: 'Tất cả',
      title: 'Tự nấu mâm cơm chuẩn vị',
      description: 'Nguyên liệu tươi sạch kèm công thức chuẩn đầu bếp'
    };
    if (!getCategoryMenu?.data) return [allTab];
    return [allTab, ...getCategoryMenu.data];
  }, [getCategoryMenu?.data]);

  const listMenus = useMemo(() => {
    return menuResponse?.pages.flatMap((page) => page.data) || [];
  }, [menuResponse]);

  const activeCategoryInfo = useMemo(() => {
    return categoriesWithAll.find(cat => cat._id === activeTab);
  }, [activeTab, categoriesWithAll]);

  const handleChangeCategory = (id: string) => {
    setActiveTab(id);
  };
  const renderMenu = useCallback(({ item }: { item: (typeof listMenus)[number] }) => <ListMenuItem item={item} />, []);
  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <FlatList
      data={listMenus}
      keyExtractor={(item) => item._id} 
      renderItem={renderMenu}
      contentContainerStyle={ExploreMenuStyle.listContent}
      showsVerticalScrollIndicator={false}
      initialNumToRender={4}
      maxToRenderPerBatch={5}
      windowSize={5}
      removeClippedSubviews
      onEndReached={loadMore}
      onEndReachedThreshold={0.35}
      ListFooterComponent={isFetchingNextPage ? <ActivityIndicator size="small" color="#E25822" style={{ marginVertical: 20 }} /> : null}
      ListEmptyComponent={() => (
        pendingMenu ? (
          <ActivityIndicator size="large" color="#FF6347" style={{ marginTop: 50 }} />
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 50, color: '#999' }}>
            Không có mâm cơm nào ở mục này
          </Text>
        )
      )}
      ListHeaderComponent={() => (
        <View>
          <View style={{ marginBottom: 15, marginTop: 15 }}>
            <View style={ExploreStyles.headerWrapper}>
              <FlatList
                ref={horizontalFlatListRef}
                horizontal
                data={categoriesWithAll}
                keyExtractor={(item) => item._id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={ExploreStyles.chipList}
                renderItem={({ item }) => (
                  <CategoryItem
                    item={item}
                    isActive={activeTab === item._id}
                    onPress={() => handleChangeCategory(item._id)}
                  />
                )}
              />
            </View>
          </View>

          <View style={ExploreMenuStyle.listHeader}>
            <Text style={ExploreMenuStyle.sectionTitle}>
              {activeCategoryInfo?.title || activeCategoryInfo?.name}
            </Text>
            <Text style={ExploreMenuStyle.sectionSub}>
              {activeCategoryInfo?.description || "Khám phá các mâm cơm ngon"}
            </Text>
          </View>
        </View>
      )}
    />
  );
}
