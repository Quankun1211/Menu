import { View, Text, Button } from "react-native";
import { router } from "expo-router";

export default function LoginScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>Login Page</Text>

      {/* Test chuyển sang Home */}
      <Button
        title="Go to Home"
        onPress={() => router.replace("/(tabs)/index")}
      />
    </View>
  );
}
