import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { SignUpStyle } from '../css/SignUpStyles';
import useForgotPassword from '../hooks/useForgotPassword';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const { mutate: sendOTP, isPending } = useForgotPassword();

  const handleSendOTP = () => {
    if (!email) {
      Alert.alert("Lỗi", "Vui lòng nhập email");
      return;
    }

    sendOTP(
      { email },
      {
        onSuccess: () => {
          router.push({
            pathname: "/(auth)/verify", 
            params: { email: email, type: 'reset' } 
          });
        },
        onError: (error: any) => {
          Alert.alert("Lỗi", error?.response?.data?.error || "Không thể gửi mã OTP");
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={SignUpStyle.title}>Quên mật khẩu?</Text>
      <Text style={styles.desc}>Nhập email của bạn, chúng tôi sẽ gửi mã OTP để đặt lại mật khẩu.</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Email của bạn"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity 
        style={[styles.btn, isPending && { opacity: 0.7 }]} 
        onPress={handleSendOTP}
        disabled={isPending}
      >
        <Text style={styles.btnText}>{isPending ? "Đang gửi..." : "Gửi mã xác thực"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, justifyContent: 'center', backgroundColor: '#fff' },
  desc: { color: '#666', marginBottom: 30, textAlign: 'center', fontSize: 16 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 15, borderRadius: 12, marginBottom: 20 },
  btn: { backgroundColor: '#E25822', padding: 16, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});