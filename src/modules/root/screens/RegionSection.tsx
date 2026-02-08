import { View, Text, TouchableOpacity, ImageBackground } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import RegionItem from "../components/RegionItem"
import { HomePageStyles } from "../css/HomePageStyle"
import useGetLastestRecipe from "../hooks/useGetLastest"
import { router } from "expo-router"
const RecipeSection = () => {
    const REGIONS = [
        { key: "bac", title: "MIỀN BẮC", label: "Đặc sản miền Bắc", sub: "Cốm, Chè...", icon: "home" },
        { key: "trung", title: "MIỀN TRUNG",  label: "Đặc sản miền Trung", sub: "Mắm, Nem...", icon: "home"  },
        { key: "nam", title: "MIỀN NAM", label: "Đặc sản miền Nam", sub: "Trái cây, Cá...", icon: "home"  }
    ];
    const { data, isPending } = useGetLastestRecipe()
    

    return (
        <View>
            <View style={HomePageStyles.sectionHeader}>
                <Text style={HomePageStyles.sectionTitle}>
                <Ionicons name="restaurant" size={18} color="#F26522" /> ĐẶC SẢN VÙNG MIỀN
                </Text>
            </View>
            <View style={HomePageStyles.regionGrid}>
                {REGIONS.map((region, index) => (
                    <RegionItem key={index} regionKey={region.key} title={region.title} sub={region.sub} icon={region.icon} />
                ))}
            </View>

            <View style={HomePageStyles.sectionHeader}>
                <Text style={HomePageStyles.sectionTitle}>🍴 Công Thức Từ Đầu Bếp</Text>
                <TouchableOpacity
                    onPress={() => {
                        router.push("/(details)/exploreItemTabs/ExploreRecipe")
                    }}
                >
                    <Text style={HomePageStyles.seeAll}>Khám phá {'>'}</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={() => router.push({
                    pathname: "/(details)/exploreItemTabs/ExploreRecipeDetail",
                    params: { id: data?.data._id }
                })}
            >
                <ImageBackground
                    source={{ uri: data?.data.image }}
                    style={HomePageStyles.recipeBanner}
                    imageStyle={{ borderRadius: 20 }}
                >
                    <View style={HomePageStyles.recipeOverlay}>
                    <View style={HomePageStyles.recipeTag}><Text style={HomePageStyles.recipeTagText}>MÓN MỚI</Text></View>
                    <Text style={HomePageStyles.recipeTitle}>{data?.data.name}</Text>
                    <Text style={HomePageStyles.recipeSub} numberOfLines={3}>{data?.data.description}</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    )
}

export default RecipeSection