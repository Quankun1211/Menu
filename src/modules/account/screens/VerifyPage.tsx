import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import useVerify from '../hooks/useVerify'; 
import useResendOTP from '../hooks/useResendOTP'; 
import { VerifyStyles } from '../css/VerifyStyles';
import { SignUpStyle } from '../css/SignUpStyles';

export default function VerifyPage() {
  const { email, type } = useLocalSearchParams<{ email: string, type: string }>();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30); 
  const [canResend, setCanResend] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const inputs = useRef<TextInput[]>([]);
  const { mutate: verify, isPending } = useVerify();
  const { mutate: resendOTP } = useResendOTP();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const onVerify = () => {
    const otpString = otp.join('');
    if (otpString.length < 6) return;

    verify(
      { email, otp: otpString, type: type }, // Đã thêm type vào payload gửi lên server
      {
        onSuccess: () => {
          if (type === 'reset') {
            router.push({
              pathname: "/(auth)/reset-password",
              params: { email, otp: otpString }
            });
          } else {
            setShowSuccessModal(true);
          }
        },
        onError: (error: any) => {
          alert(error?.response?.data?.error || error?.response?.data?.message || "Mã OTP không chính xác");
        }
      }
    );
  };

  const handleResend = () => {
    if (!canResend) return;
    
    resendOTP({ email }, {
      onSuccess: () => {
        setTimer(60);
        setCanResend(false);
        setOtp(['', '', '', '', '', '']);
        inputs.current[0].focus();
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={VerifyStyles.container}
      >
        <View style={VerifyStyles.content}>
          <Text style={VerifyStyles.title}>Xác thực Email</Text>
          <Text style={VerifyStyles.subtitle}>
            Chúng tôi đã gửi mã OTP gồm 6 chữ số đến email:{"\n"}
            <Text style={VerifyStyles.emailText}>{email}</Text>
          </Text>

          <View style={VerifyStyles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={VerifyStyles.otpInput}
                keyboardType="number-pad"
                maxLength={1}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                value={digit}
                ref={(el) => {
                  if (el) inputs.current[index] = el;
                }}
              />
            ))}
          </View>

          <TouchableOpacity 
            style={[VerifyStyles.button, (isPending || otp.join('').length < 6) && { opacity: 0.7 }]} 
            onPress={onVerify}
            disabled={isPending || otp.join('').length < 6}
          >
            <Text style={VerifyStyles.buttonText}>{isPending ? "Đang xác thực..." : "Xác nhận"}</Text>
          </TouchableOpacity>

          <View style={VerifyStyles.resendContainer}>
            <Text style={VerifyStyles.resendText}>Không nhận được mã? </Text>
            <TouchableOpacity onPress={handleResend} disabled={!canResend}>
              <Text style={[VerifyStyles.resendLink, !canResend && { color: '#999' }]}>
                {canResend ? "Gửi lại" : `Gửi lại sau (${timer}s)`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal visible={showSuccessModal} transparent animationType="fade">
          <View style={SignUpStyle.modalOverlay}>
            <View style={SignUpStyle.modalContent}>
              <View style={[SignUpStyle.iconContainer, { backgroundColor: '#E8F5E9' }]}>
                <Ionicons name="checkmark-circle" size={50} color="#2E7D32" />
              </View>
              <Text style={SignUpStyle.modalTitle}>Xác thực thành công!</Text>
              <Text style={{ textAlign: 'center', color: '#666', marginBottom: 20 }}>
                Tài khoản của bạn đã sẵn sàng để khám phá ẩm thực Việt.
              </Text>
              <TouchableOpacity 
                style={[SignUpStyle.confirmButton, { backgroundColor: '#2E7D32', width: '100%' }]} 
                onPress={() => {
                  setShowSuccessModal(false);
                  router.replace("/(auth)/login");
                }}
              >
                <Text style={SignUpStyle.confirmButtonText}>Đăng nhập ngay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}