import { View, Image, Text, TouchableOpacity } from "react-native"
import { ExploreMenuStyle } from "../css/ExploreMenuStyle"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { MenuResponse } from "../types/api-response"
import { formatVND } from "@/utils/helper"

type MenuProps = {
  item: MenuResponse
}
const ListMenuItem = ({ item }: MenuProps) => (
    <View style={ExploreMenuStyle.card}>
      <View style={ExploreMenuStyle.imageContainer}>
        <Image source={require("../../../assets/banner/gao.png")} style={ExploreMenuStyle.mainImage} />
        {/* {item.isPopular && (
          <View style={ExploreMenuStyle.badge}>
            <Text style={ExploreMenuStyle.badgeText}>Phổ biến</Text>
          </View>
        )} */}
      </View>

      <View style={ExploreMenuStyle.infoContainer}>
        <View style={ExploreMenuStyle.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={ExploreMenuStyle.title}>{item.title}</Text>
            <Text style={ExploreMenuStyle.desc}>{item.titleBanner}</Text>
          </View>
          <Text style={ExploreMenuStyle.price}>{formatVND(item.totalPrice)}</Text>
        </View>

        <View style={ExploreMenuStyle.itemsPreview}>
          {item.recipes.map((food, index) => (
            <View key={index} style={ExploreMenuStyle.foodItem}>
              <Image source={{uri: food.image}} style={ExploreMenuStyle.foodCircle} />
              <Text style={ExploreMenuStyle.foodName}>{food.name}</Text>
            </View>
          ))}
        </View>

        <View style={ExploreMenuStyle.footerRow}>
          <View style={ExploreMenuStyle.metaInfo}>
            <Ionicons name="people-outline" size={16} color="#666" />
            <Text style={ExploreMenuStyle.metaText}>{item.meta.servings}</Text>
            <Text style={ExploreMenuStyle.dot}>•</Text>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={ExploreMenuStyle.metaText}>{item.cookTime}</Text>
          </View>
          
          <TouchableOpacity
            onPress={() => router.push({
              pathname: "/(details)/exploreItemTabs/ExploreMenuDetail",
              params: { id: item._id } 
            })}
            style={ExploreMenuStyle.buyButton}
          >
            <Text style={ExploreMenuStyle.buyButtonText}>Xem thực đơn</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
)

export default ListMenuItem