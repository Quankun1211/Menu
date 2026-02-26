import { View, Text, ScrollView, ImageBackground } from "react-native";
import { HomePageStyles } from "../css/HomePageStyle";
import DiscountProducts from "./DiscountProducts";
import CategorySection from "./CategorySection";
import PopularSection from "./PopularSection";
import RegionSection from "./RegionSection";
import ProductSuggestion from "../components/ProductSuggestion";
import SearchBar from "@/components/ui/SearchBar";
import ChatBotModal from "./Chatbot";
import { useState } from "react";
import FloatingChatbot from "@/components/common/FloatingModal";
import LatestProduct from "../components/LatestProduct";
export default function HomePage() {
  const [chatVisible, setChatVisible] = useState(false);
  return (
    <View style={{ flex: 1, paddingTop: 10 }}>
      <View style={{paddingHorizontal: 15}}>
        <SearchBar />
      </View>

      <ScrollView
        style={HomePageStyles.container}
        showsVerticalScrollIndicator={false}
      >
        <LatestProduct/>
        <CategorySection />
        <RegionSection />
        <PopularSection />
        <DiscountProducts />
        <ProductSuggestion />

        <View style={{ height: 20 }} />
      </ScrollView>

      <FloatingChatbot onPress={() => setChatVisible(true)} />

      <ChatBotModal 
        visible={chatVisible} 
        onClose={() => setChatVisible(false)} 
      />
    </View>
  );
}
