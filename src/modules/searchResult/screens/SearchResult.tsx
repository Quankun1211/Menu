import FilterModal from "@/components/common/FilterModal";
import FloatingFilter from "@/components/common/FloatingFilter";
import useSearchProducts from "@/hooks/useSearchProducts";
import ExploreProductItems from "@/modules/explore/components/ExploreProductItems";
import { ExploreStyles } from "@/modules/explore/css/ExploreStyles";
import { ActivityIndicator, FlatList, View } from "react-native";
import { useMemo, useState } from "react";
import SearchBar from "@/components/ui/SearchBar";
interface SearchResultProps {
  searchQuery?: string;
}

export default function SearchResult({ searchQuery }: SearchResultProps) {
    const [sort, setSortBy] = useState("newest");
    const [filterVisible, setFilterVisible] = useState(false);

    const {
      data,
      isRefetching,
      refetch,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    } = useSearchProducts(
        searchQuery || "",
        sort
    );
    const products = useMemo(
      () => data?.pages.flatMap((page) => page.data) ?? [],
      [data]
    );

    return (
        <View style={ExploreStyles.container}>
            <View style={{ paddingHorizontal: 15 }}>
                <SearchBar />
            </View>

            <FlatList
                data={products}
                keyExtractor={(item) => item._id}
                numColumns={2}
                columnWrapperStyle={ExploreStyles.gridRow}
                showsVerticalScrollIndicator={false}
                refreshing={isRefetching && !isFetchingNextPage}
                onRefresh={refetch}
                onEndReached={() => {
                  if (hasNextPage && !isFetchingNextPage) fetchNextPage();
                }}
                onEndReachedThreshold={0.35}
                ListFooterComponent={isFetchingNextPage
                  ? <ActivityIndicator color="#D16D2F" style={{ marginVertical: 20 }} />
                  : <View style={{ height: 24 }} />
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
                onSelect={(val: string) => {
                    setSortBy(val);
                    setFilterVisible(false);
                }}
            />
        </View>
    );
}
