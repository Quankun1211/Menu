import { Pressable, ScrollView, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { HomePageStyles as styles } from '../css/HomePageStyle';
import DiscountProducts from './DiscountProducts';
import CategorySection from './CategorySection';
import PopularSection from './PopularSection';
import RegionSection from './RegionSection';
import ProductSuggestion from '../components/ProductSuggestion';
import SearchBar from '@/components/ui/SearchBar';
import ChatBotModal from './Chatbot';
import FloatingChatbot from '@/components/common/FloatingModal';
import LatestProduct from '../components/LatestProduct';

export default function HomePage() {
  const [chatVisible, setChatVisible] = useState(false);

  return (
    <View style={styles.screen}>
      <View style={styles.mobileHeader}>
        <View style={styles.brandRow}>
          <View style={styles.brandMark}>
            <Text style={styles.brandMarkText}>BẾP</Text>
          </View>
          <View>
            <Text style={styles.brandName}>VIỆT</Text>
            <Text style={styles.brandCaption}>Gian bếp trong mỗi gia đình</Text>
          </View>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Mở giỏ hàng"
          style={({ pressed }) => [styles.headerAction, pressed && styles.pressed]}
          onPress={() => router.push('/(tabs)/cart')}
        >
          <Ionicons name="basket-outline" size={22} color="#5C4033" />
        </Pressable>
      </View>

      <View style={styles.searchArea}>
        <SearchBar />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <LinearGradient
          colors={['#5C4033', '#76503B', '#9A572F']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.heroGlow} />
          <View style={styles.eyebrow}>
            <Ionicons name="sparkles" size={14} color="#F4C7A5" />
            <Text style={styles.eyebrowText}>HƯƠNG VỊ VIỆT MỖI NGÀY</Text>
          </View>
          <Text style={styles.heroTitle}>Nguyên liệu Việt,{'\n'}trọn vị bữa cơm nhà</Text>
          <Text style={styles.heroDescription}>
            Đặc sản ba miền, thực phẩm rõ nguồn gốc và công thức dễ nấu.
          </Text>
          <View style={styles.heroActions}>
            <Pressable
              style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
              onPress={() => router.push({
                pathname: '/(details)/exploreItemTabs/ExploreFood',
                params: { categoryId: 'all' },
              })}
            >
              <Text style={styles.primaryButtonText}>Mua thực phẩm</Text>
              <Ionicons name="arrow-forward" size={17} color="#fff" />
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}
              onPress={() => router.push('/(details)/exploreItemTabs/ExploreRecipe')}
            >
              <Ionicons name="book-outline" size={17} color="#fff" />
              <Text style={styles.secondaryButtonText}>Công thức</Text>
            </Pressable>
          </View>
          <View style={styles.trustRow}>
            <TrustItem icon="shield-checkmark-outline" label="Nguồn gốc rõ ràng" />
            <TrustItem icon="location-outline" label="Đặc sản 3 miền" />
          </View>
        </LinearGradient>

        <CategorySection />
        <LatestProduct />
        <RegionSection />
        <PopularSection />
        <DiscountProducts />
        <ProductSuggestion />
      </ScrollView>

      <FloatingChatbot onPress={() => setChatVisible(true)} />
      <ChatBotModal visible={chatVisible} onClose={() => setChatVisible(false)} />
    </View>
  );
}

function TrustItem({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) {
  return (
    <View style={styles.trustItem}>
      <Ionicons name={icon} size={15} color="#F4C7A5" />
      <Text style={styles.trustText}>{label}</Text>
    </View>
  );
}
