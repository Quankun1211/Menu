import { Alert, Modal, View, Text, Pressable, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Platform, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SignUpStyle } from '../css/SignUpStyles';
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import useRegister from '../hooks/useRegister';
import { RegisterRequest } from '../types/api-request';
import SignUpForm from '../components/SignUpForm';
import { useState } from 'react';
export default function SignUpPage() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const { mutate: onRegister, isPending } = useRegister();
  const onFinish = (values: RegisterRequest) => {
    onRegister(
      {
        email: values.email,
        username: values.username,
        password: values.password,
        confirmPassword: values.confirmPassword,
        name: values.name,
      },
      {
        onSuccess: (response) => {
          setRegisteredEmail(values.email);
          setShowSuccessModal(true);
        },
        onError: (error: any) => {
          const errorMsg = error?.response?.data?.error || "Đăng ký thất bại";
          Alert.alert("Lỗi", errorMsg);
        },
      }
    );
  };
  const handleGoToVerify = () => {
    setShowSuccessModal(false);
    router.push({
      pathname: "/(auth)/verify",
      params: { email: registeredEmail }
    });
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

      <Modal visible={showSuccessModal} transparent animationType="fade">
        <View style={SignUpStyle.modalOverlay}>
          <View style={SignUpStyle.modalContent}>
            <View style={[SignUpStyle.iconContainer, { backgroundColor: '#E8F5E9' }]}>
              <Ionicons name="mail-open" size={40} color="#2E7D32" />
            </View>
            
            <Text style={SignUpStyle.modalTitle}>Kiểm tra Email</Text>
            <Text style={{ textAlign: 'center', color: '#666', marginBottom: 20 }}>
              Mã xác thực đã được gửi đến:{"\n"}
              <Text style={{ fontWeight: 'bold', color: '#1A1A1A' }}>{registeredEmail}</Text>
            </Text>

            <TouchableOpacity 
              style={[SignUpStyle.confirmButton, { backgroundColor: '#2E7D32', width: '100%' }]} 
              onPress={handleGoToVerify}
            >
              <Text style={SignUpStyle.confirmButtonText}>Nhập mã ngay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>

  );
}