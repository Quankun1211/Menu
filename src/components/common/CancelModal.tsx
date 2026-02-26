import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CancelOrderModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export const CancelOrderModal = ({ isVisible, onClose, onConfirm }: CancelOrderModalProps) => {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    if (reason.trim()) {
      onConfirm(reason);
      setReason('');
    }
  };

  const handleClose = () => {
    setReason('');
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <View style={styles.modalContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name="alert-circle" size={40} color="#FF4D4F" />
          </View>

          <Text style={styles.title}>Lý do hủy đơn</Text>
          <Text style={styles.message}>
            Vui lòng cho chúng tôi biết lý do bạn muốn hủy đơn hàng này.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Nhập lý do hủy (ví dụ: Thay đổi địa chỉ, đổi ý...)"
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            value={reason}
            onChangeText={setReason}
            textAlignVertical="top"
          />

          <View style={styles.buttonGroup}>
            <TouchableOpacity 
              style={[styles.button, styles.secondaryButton]} 
              onPress={handleClose}
              activeOpacity={0.7}
            >
              <Text style={styles.secondaryButtonText}>Quay lại</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.button, 
                styles.primaryButton,
                !reason.trim() && { backgroundColor: '#FFA39E' }
              ]} 
              onPress={handleConfirm}
              activeOpacity={0.8}
              disabled={!reason.trim()}
            >
              <Text style={styles.primaryButtonText}>Xác nhận hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF2F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F1F1F',
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
    height: 100,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    color: '#333',
    marginBottom: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#FF4D4F',
  },
  secondaryButton: {
    backgroundColor: '#F5F5F5',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButtonText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 16,
  },
});