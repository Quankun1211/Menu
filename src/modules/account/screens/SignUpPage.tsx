import React, { useEffect } from 'react';
import { View, Text, Pressable, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Platform, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SignUpStyle } from '../css/SignUpStyles';
import { router } from "expo-router";
import useRegister from '../hooks/useRegister';
import { RegisterRequest } from '../types/api-request';
import SignUpForm from '../components/SignUpForm';
export default function SignUpPage() {
  const { mutate: onRegister, isPending } = useRegister();
  const onFinish = (values: RegisterRequest) => {
    console.log("Register payload:", values);

    onRegister(
      {
        email: values.email,
        username: values.username,
        password: values.password,
        confirmPassword: values.confirmPassword,
        name: values.name,
      },
      {
        onSuccess: () => {
          console.log("Register successfully");
        },
        onError: (error: any) => {
          console.log(
            "Register failed:",
            error?.response?.data || error.message
          );
        },
      }
    );
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={SignUpStyle.container}>
          <View style={SignUpStyle.imageContainer}>
            <Image 
              source={require("../../../assets/images/banner.png")} 
              style={SignUpStyle.headerImage} 
              resizeMode="cover"
            />
          </View>

          <View style={SignUpStyle.content}>
            <Text style={SignUpStyle.title}>Bắt đầu hành trình ẩm thực</Text>
            <Text style={SignUpStyle.subtitle}>Đăng ký để khám phá hương vị truyền thống Việt Nam cùng chúng tôi.</Text>

            <SignUpForm
              onFinish={onFinish}
              isLoading={isPending}
            />

            <Text style={SignUpStyle.orText}>Hoặc đăng ký bằng</Text>
            <View style={SignUpStyle.socialRow}>
              <TouchableOpacity style={SignUpStyle.socialButton}><Text>Google</Text></TouchableOpacity>
              <TouchableOpacity style={SignUpStyle.socialButton}><Text>iOS</Text></TouchableOpacity>
            </View>

            <View style={SignUpStyle.loginContainer}>
              <Text style={SignUpStyle.loginText}>Bạn đã có tài khoản? </Text>

              <Pressable onPress={() => router.replace("/(auth)/login")}>
                <Text style={SignUpStyle.loginLink}>Đăng nhập</Text>
              </Pressable>
            </View>
          </View>
          <Text style={SignUpStyle.lastText}>Bằng cách đăng ký, bạn đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của chúng tôi</Text>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  );
}