import { View, ImageBackground, Text, TouchableOpacity } from "react-native"
import { HomePageStyles } from "../css/HomePageStyle"
import useGetLatestProduct from "../hooks/useGetLatestProduct"
import { LinearGradient } from 'expo-linear-gradient';
import { router } from "expo-router"
export default function LatestProduct() {
    const { data: latestProduct, isPending } = useGetLatestProduct()
    return (
        <TouchableOpacity
            onPress={() => router.push({
                pathname: "/(details)/exploreItemTabs/SpecialDetail",
                params: { id: latestProduct?.data._id }
            })}
        >
            <View style={HomePageStyles.bannerContainer}>

                <ImageBackground
                    source={{ uri: latestProduct?.data.images }}
                    style={HomePageStyles.bannerImage}
                    imageStyle={{ borderRadius: 20 }}
                >
                    <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={[HomePageStyles.bannerOverlay, { borderRadius: 20 }]}
                    >
                    <Text style={HomePageStyles.bannerTag}>đặc sản mới nhất</Text>
                    <Text style={HomePageStyles.bannerTitle}>{latestProduct?.data.name}</Text>
                    <Text style={HomePageStyles.bannerSubTitle}>
                        Đặc sản miền {latestProduct?.data.region}
                    </Text>
                    </LinearGradient>
                </ImageBackground>
            </View>
        </TouchableOpacity>

    )
}