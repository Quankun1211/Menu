import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useState } from "react";
import { ResetPasswordStyles } from "../css/RestPasswordStyles";
import { SignUpStyle } from "../css/SignUpStyles";
import useResetPassword from "../hooks/useResetPassword";
import { Ionicons } from '@expo/vector-icons';

export default function ResetPasswordPage() {
  const { email, otp } = useLocalSearchParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState<{ newPassword?: string; confirmPassword?: string }>({});

  const { mutate: resetPassword, isPending } = useResetPassword();

  const handleUpdatePassword = () => {
    let currentErrors: { newPassword?: string; confirmPassword?: string } = {};

    if (!newPassword) {
      currentErrors.newPassword = "Vui lòng nhập mật khẩu mới";
    } else if (newPassword.length < 8) {
      currentErrors.newPassword = "Mật khẩu phải có tối thiểu 8 ký tự";
    }

    if (newPassword !== confirmPassword) {
      currentErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }

    setErrors({});
    resetPassword(
      { email: email as string, otp: otp as string, newPassword },
      {
        onSuccess: () => {
          setShowSuccessModal(true);
        },
        onError: (error: any) => {
          const serverMessage = error?.response?.data?.error || error?.response?.data?.message || "Đổi mật khẩu thất bại";
          alert(serverMessage);
        }
      }
    );
  };

  return (
    <View style={ResetPasswordStyles.container}>
      <Text style={ResetPasswordStyles.title}>Mật khẩu mới</Text>
      <Text style={ResetPasswordStyles.subtitle}>Vui lòng nhập mật khẩu mới để tiếp tục trải nghiệm ứng dụng.</Text>
      
      <Text style={[SignUpStyle.label, { marginTop: 20 }]}>Mật khẩu mới</Text>
      <View style={[SignUpStyle.inputContainer, errors.newPassword && { borderColor: 'red' }]}>
        <Ionicons name="lock-closed" size={20} color="#f49d71" style={SignUpStyle.icon} />
        <TextInput 
          secureTextEntry 
          style={SignUpStyle.inputField} 
          placeholder="Tối thiểu 8 ký tự"
          placeholderTextColor="#999"
          value={newPassword}
          onChangeText={(v) => {
            setNewPassword(v);
            if (errors.newPassword) setErrors(prev => ({ ...prev, newPassword: undefined }));
          }}
        />
      </View>
      {errors.newPassword && <Text style={SignUpStyle.errorText}>{errors.newPassword}</Text>}

      <Text style={[SignUpStyle.label, { marginTop: 15 }]}>Xác nhận mật khẩu</Text>
      <View style={[SignUpStyle.inputContainer, errors.confirmPassword && { borderColor: 'red' }]}>
        <Ionicons name="lock-closed" size={20} color="#f49d71" style={SignUpStyle.icon} />
        <TextInput 
          secureTextEntry 
          style={SignUpStyle.inputField} 
          placeholder="Nhập lại mật khẩu mới"
          placeholderTextColor="#999"
          value={confirmPassword}
          onChangeText={(v) => {
            setConfirmPassword(v);
            if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: undefined }));
          }}
        />
      </View>
      {errors.confirmPassword && <Text style={SignUpStyle.errorText}>{errors.confirmPassword}</Text>}
      
      <TouchableOpacity 
        style={[SignUpStyle.button, { marginTop: 30 }, isPending && { opacity: 0.7 }]} 
        onPress={handleUpdatePassword}
        disabled={isPending}
      >
        <Text style={SignUpStyle.buttonText}>
          {isPending ? "Đang xử lý..." : "Cập nhật mật khẩu →"}
        </Text>
      </TouchableOpacity>

      <Modal visible={showSuccessModal} transparent animationType="fade">
        <View style={SignUpStyle.modalOverlay}>
          <View style={SignUpStyle.modalContent}>
            <View style={[SignUpStyle.iconContainer, { backgroundColor: '#E8F5E9' }]}>
              <Ionicons name="shield-checkmark" size={50} color="#2E7D32" />
            </View>
            <Text style={SignUpStyle.modalTitle}>Thành công!</Text>
            <Text style={{ textAlign: 'center', color: '#666', marginBottom: 20 }}>
              Mật khẩu của bạn đã được thay đổi thành công. Vui lòng đăng nhập lại.
            </Text>
            <TouchableOpacity 
              style={[SignUpStyle.confirmButton, { backgroundColor: '#E25822', width: '100%' }]} 
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
    </View>
  );
}