import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import SearchResult from "@/modules/searchResult/screens/SearchResult";

export default function SearchTabs() {
    const { q } = useLocalSearchParams<{ q: string }>();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: q ? `Kết quả: ${q}` : "Kết quả tìm kiếm",
        });
    }, [q, navigation]);

    return (
        <SearchResult searchQuery={q} />
    );
}