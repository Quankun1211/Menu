import React from 'react'
import { View, Modal, Text, TouchableOpacity } from 'react-native'
import { DashboardStyles } from '../css/DashboardStyles'
const ConfirmModal = (
    { isConfirmModalVisible, setIsConfirmModalVisible, confirmData, onConfirmUpdate }: 
    { isConfirmModalVisible: boolean; setIsConfirmModalVisible: (visible: boolean) => void; confirmData?: { text: string }; onConfirmUpdate: () => void }) => {
  return (
    <Modal visible={isConfirmModalVisible} transparent animationType="fade">
        <View style={DashboardStyles.modalOverlay}>
            <View style={DashboardStyles.modalContent}>
            <Text style={DashboardStyles.modalTitle}>Xác nhận hành động</Text>
            <Text style={[DashboardStyles.addressValue, { textAlign: 'center', marginBottom: 20, fontSize: 16 }]}>
                Bạn có chắc chắn muốn {confirmData?.text}?
            </Text>
            
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