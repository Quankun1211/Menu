import FilterModal from "@/components/common/FilterModal";
import FloatingFilter from "@/components/common/FloatingFilter";
import useSearchProducts from "@/hooks/useSearchProducts";
import ExploreProductItems from "@/modules/explore/components/ExploreProductItems";
import { ExploreStyles } from "@/modules/explore/css/ExploreStyles";
import { FlatList, Text, View } from "react-native";
import { useState } from "react";
import SearchBar from "@/components/ui/SearchBar";
interface SearchResultProps {
  searchQuery?: string;
}

export default function SearchResult({ searchQuery }: SearchResultProps) {
    const [sort, setSortBy] = useState("newest");
    const [filterVisible, setFilterVisible] = useState(false);

    const { data, isPending } = useSearchProducts(
        searchQuery || "",
        sort
    );
    const products = data?.data || [];

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
                refreshing={isPending}
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
