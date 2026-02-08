import { View, Text, ScrollView, TextInput, ImageBackground } from "react-native";
import { HomePageStyles } from "../css/HomePageStyle";
import DiscountProducts from "./DiscountProducts";
import { Ionicons } from "@expo/vector-icons";
import CategorySection from "./CategorySection";
import PopularSection from "./PopularSection";
import RegionSection from "./RegionSection";
import ProductSuggestion from "../components/ProductSuggestion";
import SearchBar from "@/components/ui/SearchBar";
export default function HomePage() {
  return (
    <View style={{ flex: 1, paddingTop: 10 }}>
      <View style={{paddingHorizontal: 15}}>
        <SearchBar />
      </View>

      <ScrollView
        style={HomePageStyles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={HomePageStyles.bannerContainer}>
          <ImageBackground
            source={require("../../../assets/test/banner_home_page.jpg")}
            style={HomePageStyles.bannerImage}
            imageStyle={{ borderRadius: 20 }}
          >
            <View style={HomePageStyles.bannerOverlay}>
              <Text style={HomePageStyles.bannerTag}>ĐANG VÀO MÙA</Text>
              <Text style={HomePageStyles.bannerTitle}>Mùa Vải Thiều</Text>
              <Text style={HomePageStyles.bannerSubTitle}>
                Đặc sản Bắc Giang, tươi ngon tận gốc
              </Text>
            </View>
          </ImageBackground>
        </View>

        <CategorySection />
        <RegionSection />
        <PopularSection />
        <DiscountProducts />
        <ProductSuggestion />

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}


