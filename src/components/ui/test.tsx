import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Test() {

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Home / Index
      </Text>
    </View>
  );
}
