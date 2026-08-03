import React from 'react';
import { View, Text, Pressable, Image, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { LoginStyle } from '../css/LoginStyles';
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient"
import LoginForm from '../components/LoginForm';
import useLogin from '../hooks/useLogin';
import { LogInRequest } from '../types/api-request';
import AuthHomeButton from '../components/AuthHomeButton';
import Toast from 'react-native-toast-message';
import SocialLoginButtons from '../components/SocialLoginButtons';

export default function LoginPage() {
  const { mutate: onLogin, isPending } = useLogin()
  
  const onFinish = (values: LogInRequest) => {
    onLogin(
      {
        username: values.username,
        password: values.password
      },
      {
        onSuccess: () => {
          console.log("Login successfully");
        },
        onError: (error: any) => {
          Toast.show({
            type: 'error',
            text1: 'Đăng nhập chưa thành công',
            text2: error?.response?.data?.error || 'Vui lòng kiểm tra lại thông tin đăng nhập.',
          });
        },
      }
    )
  }

  return (
    <LinearGradient
      colors={['#91a5ac', '#cbdcd4', '#f8a078']}
      start={{ x: 1, y: 0 }} 
      end={{ x: 0, y: 1 }}
      locations={[0.1, 0.3, 0.7]} 
      style={{ flex: 1 }}
    >
      <AuthHomeButton />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={LoginStyle.container} showsVerticalScrollIndicator={false}>
            <View style={LoginStyle.logoWrapper}>
              <View style={LoginStyle.logoWrapperChild}>
                <Image source={require('../../../assets/images/logo.png')} style={LoginStyle.logoImage} />
              </View>
            </View>

            <View style={LoginStyle.content}>
              <Text style={LoginStyle.welcomeText}>Chào Bạn!</Text>
              <Text style={LoginStyle.subText}>Chào mừng bạn quay lại với Bếp Việt</Text>

              <LoginForm
                onFinish={onFinish}
                isLoading={isPending}
              />

              <View style={LoginStyle.socialSection}>
                <View style={LoginStyle.dividerRow}>
                  <View style={LoginStyle.line} />
                  <Text style={LoginStyle.orText}>HOẶC ĐĂNG NHẬP VỚI</Text>
                  <View style={LoginStyle.line} />
                </View>
                
                <SocialLoginButtons />
              </View>

              <View style={LoginStyle.signUpContainer}>
                <Text style={LoginStyle.signUpText}>Chưa có tài khoản? </Text>
                <Pressable onPress={() => router.replace("/(auth)/register")}>
                  <Text style={LoginStyle.signUpLink}>Đăng ký ngay</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
