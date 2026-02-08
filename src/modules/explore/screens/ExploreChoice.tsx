import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ImageBackground, 
  StyleSheet, 
  Dimensions, 
  ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const EXPLORE_DATA = [
  {
    id: 'dish',
    subTitle: 'SẴN SÀNG PHỤC VỤ',
    title: 'THỰC PHẨM',
    desc: 'Thưởng thức ngay hương vị truyền thống',
    image: 'https://example.com/pho.jpg', 
    targetTab: 'ExploreFood',
  },
  {
    id: 'special',
    subTitle: 'ĐẶC TRƯNG VĂN HÓA',
    title: 'ĐẶC SẢN VÙNG MIỀN',
    desc: 'Khám phá nét văn hóa của từng vùng miền',
    image: 'https://example.com/pho.jpg', 
    targetTab: 'ExploreSpecial',
  },
  {
    id: 'menu',
    subTitle: 'MÂM CƠM GIA ĐÌNH',
    title: 'THỰC ĐƠN',
    desc: 'Gắn kết yêu thương qua từng bữa cơm',
    image: 'https://example.com/mam-com.jpg',
    targetTab: 'ExploreMenu',
  },
  {
    id: 'recipe',
    subTitle: 'TỰ TAY CHẾ BIẾN',
    title: 'CÔNG THỨC',
    desc: 'Khám phá bí quyết nấu ăn ngon',
    image: 'https://example.com/cong-thuc.jpg',
    targetTab: 'ExploreRecipe', 
  },
];

export default function ExploreContent() {
    const handleNavigation = (tab: string) => {
        if(tab === "ExploreFood") {
            router.push("/(details)/exploreItemTabs/ExploreFood")
        } else if (tab === "ExploreMenu") {
            router.push({
              pathname: "/(details)/exploreItemTabs/ExploreMenu",
              params: {from: "exploreChoice"}
            })
        } else if (tab === "ExploreSpecial") {
            router.push("/(details)/exploreItemTabs/ExploreSpecial")
        } else {
            router.push("/(details)/exploreItemTabs/ExploreRecipe")
        }
    }
  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.headerTextContainer}>
        <Text style={styles.mainTitle}>Hành trình ẩm thực</Text>
        <Text style={styles.subTitle}>
          Khám phá tinh hoa ẩm thực Việt qua từng lựa chọn độc đáo của chúng tôi
        </Text>
      </View>

      {EXPLORE_DATA.map((item) => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.9}
          style={styles.cardContainer}
          onPress={() => handleNavigation(item.targetTab)}
        >
          <ImageBackground
            source={require("../../../assets/banner/gao.png")}
            style={styles.imageBg}
            imageStyle={styles.imageStyle}
          >
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles.gradient}
            >
              <View style={styles.contentWrapper}>
                <View style={styles.textWrapper}>
                  <Text style={styles.itemSub}>{item.subTitle}</Text>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemDesc}>{item.desc}</Text>
                </View>
                
                <View style={styles.arrowButton}>
                  <Ionicons name="arrow-forward" size={24} color="#000" />
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
  headerTextContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ff6200',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 16,
    color: '#953d06af',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
  },
  cardContainer: {
    height: 200,
    width: '100%',
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  imageBg: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 20,
  },
  gradient: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    padding: 20,
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  textWrapper: {
    flex: 1,
    marginRight: 10,
  },
  itemSub: {
    color: '#FFB039',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  itemTitle: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  itemDesc: {
    color: '#DDD',
    fontSize: 14,
  },
  arrowButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#FFB039',
    justifyContent: 'center',
    alignItems: 'center',
  },
});