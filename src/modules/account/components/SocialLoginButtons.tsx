import { useEffect } from "react";
import { ActivityIndicator, Alert, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import { ResponseType } from "expo-auth-session";
import { LoginStyle } from "../css/LoginStyles";
import useSocialLogin from "../hooks/useSocialLogin";

WebBrowser.maybeCompleteAuthSession();

export default function SocialLoginButtons() {
  const socialLogin = useSocialLogin();
  const { mutate: loginWithProvider } = socialLogin;
  const googleClientId = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID;
  const facebookAppId = process.env.EXPO_PUBLIC_FACEBOOK_APP_ID;

  const [googleRequest, googleResponse, promptGoogle] = Google.useIdTokenAuthRequest({
    clientId: googleClientId,
    webClientId: googleClientId,
    selectAccount: true,
  }, { scheme: "frontend", path: "oauth" });
  const [facebookRequest, facebookResponse, promptFacebook] = Facebook.useAuthRequest({
    clientId: facebookAppId,
    responseType: ResponseType.Token,
    scopes: ["public_profile", "email"],
  }, { scheme: "frontend", path: "oauth" });

  useEffect(() => {
    if (googleResponse?.type !== "success") return;
    const idToken = googleResponse.params.id_token;
    if (idToken) loginWithProvider({ provider: "google", token: idToken });
    else Alert.alert("Đăng nhập Google", "Google không trả về mã xác thực.");
  }, [googleResponse, loginWithProvider]);

  useEffect(() => {
    if (facebookResponse?.type !== "success") return;
    const accessToken = facebookResponse.authentication?.accessToken || facebookResponse.params.access_token;
    if (accessToken) loginWithProvider({ provider: "facebook", token: accessToken });
    else Alert.alert("Đăng nhập Facebook", "Facebook không trả về mã xác thực.");
  }, [facebookResponse, loginWithProvider]);

  useEffect(() => {
    if (!socialLogin.error) return;
    const error: any = socialLogin.error;
    Alert.alert("Đăng nhập chưa thành công", error?.response?.data?.error || error.message);
  }, [socialLogin.error]);

  const busy = socialLogin.isPending;
  return (
    <View style={LoginStyle.socialIconsRow}>
      <TouchableOpacity accessibilityLabel="Đăng nhập bằng Google" style={[LoginStyle.socialCircle, (!googleRequest || !googleClientId || busy) && { opacity: 0.5 }]} disabled={!googleRequest || !googleClientId || busy} onPress={() => promptGoogle()}>
        {busy && socialLogin.variables?.provider === "google" ? <ActivityIndicator color="#DB4437" /> : <Ionicons name="logo-google" size={24} color="#DB4437" />}
      </TouchableOpacity>
      <TouchableOpacity accessibilityLabel="Đăng nhập bằng Facebook" style={[LoginStyle.socialCircle, (!facebookRequest || !facebookAppId || busy) && { opacity: 0.5 }]} disabled={!facebookRequest || !facebookAppId || busy} onPress={() => promptFacebook()}>
        {busy && socialLogin.variables?.provider === "facebook" ? <ActivityIndicator color="#1877F2" /> : <Ionicons name="logo-facebook" size={24} color="#1877F2" />}
      </TouchableOpacity>
    </View>
  );
}
