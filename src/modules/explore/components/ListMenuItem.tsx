import React, { memo } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Image } from "expo-image"
import { ExploreMenuStyle } from "../css/ExploreMenuStyle"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { MenuResponse } from "../types/api-response"
import { formatVND } from "@/utils/helper"

type MenuProps = {
  item: MenuResponse
}
const FALLBACK_IMAGE = require("../../../assets/banner/gao-card.jpg");

const ListMenuItem = ({ item }: MenuProps) => (
    <View style={ExploreMenuStyle.card}>
      <View style={ExploreMenuStyle.imageContainer}>
        <Image
          source={item.image ? { uri: item.image } : FALLBACK_IMAGE}
          placeholder={FALLBACK_IMAGE}
          style={ExploreMenuStyle.mainImage}
          contentFit="cover"
          cachePolicy="memory-disk"
          recyclingKey={item._id}
          transition={180}
        />
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
          {item.recipes.slice(0, 4).map((food) => (
            <View key={food._id} style={ExploreMenuStyle.foodItem}>
              <Image source={food.image ? { uri: food.image } : FALLBACK_IMAGE} style={ExploreMenuStyle.foodCircle} contentFit="cover" cachePolicy="memory-disk" recyclingKey={food._id} />
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

export default memo(ListMenuItem)
