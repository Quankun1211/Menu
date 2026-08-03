import React from 'react'
import { View, Modal, Text, TouchableOpacity, TextInput } from 'react-native'
import { DashboardStyles } from '../css/DashboardStyles'
const ConfirmModal = (
    { isConfirmModalVisible, setIsConfirmModalVisible, confirmData, onConfirmUpdate, deliveryCode, setDeliveryCode }:
    { isConfirmModalVisible: boolean; setIsConfirmModalVisible: (visible: boolean) => void; confirmData?: { text: string; nextStatus?: string }; onConfirmUpdate: () => void; deliveryCode: string; setDeliveryCode: (value: string) => void }) => {
  return (
    <Modal visible={isConfirmModalVisible} transparent animationType="fade">
        <View style={DashboardStyles.modalOverlay}>
            <View style={DashboardStyles.modalContent}>
            <Text style={DashboardStyles.modalTitle}>Xác nhận hành động</Text>
            <Text style={[DashboardStyles.addressValue, { textAlign: 'center', marginBottom: 20, fontSize: 16 }]}>
                Bạn có chắc chắn muốn {confirmData?.text}?
            </Text>
            {confirmData?.nextStatus === "delivered" && (
              <TextInput
                value={deliveryCode}
                onChangeText={(value) => setDeliveryCode(value.replace(/\D/g, "").slice(0, 6))}
                placeholder="Nhập mã nhận hàng 6 số"
                placeholderTextColor="#806A5C"
                selectionColor="#D16D2F"
                keyboardType="number-pad"
                maxLength={6}
                style={{ backgroundColor: '#FFF', color: '#2C1810', borderWidth: 1, borderColor: "#CFA98B", borderRadius: 12, padding: 14, marginBottom: 20, textAlign: "center", fontSize: 20, letterSpacing: 6 }}
              />
            )}
            
            <View style={DashboardStyles.modalButtons}>
                <TouchableOpacity 
                style={[DashboardStyles.modalBtn, { backgroundColor: '#333' }]} 
                onPress={() => setIsConfirmModalVisible(false)}
                >
                <Text style={DashboardStyles.modalBtnText}>HỦY BỎ</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={[DashboardStyles.modalBtn, { backgroundColor: '#4cd964' }]} 
                onPress={onConfirmUpdate}
                >
                <Text style={DashboardStyles.modalBtnText}>ĐỒNG Ý</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
    </Modal>
  )
}

export default ConfirmModal
