import React from 'react'
import { View, Modal, Text, TouchableOpacity, TextInput } from 'react-native'
import { DashboardStyles } from '../css/DashboardStyles'
const CancelModal = ({ isModalVisible, setIsModalVisible, reason, setReason, submitCancelRequest }: 
    { isModalVisible: boolean; setIsModalVisible: (visible: boolean) => void; reason: string; setReason: (reason: string) => void; submitCancelRequest: () => void }) => {
  return (
    <Modal visible={isModalVisible} transparent animationType="fade">
        <View style={DashboardStyles.modalOverlay}>
            <View style={DashboardStyles.modalContent}>
            <Text style={DashboardStyles.modalTitle}>Lý do hủy đơn</Text>
            <TextInput
                style={DashboardStyles.textInput}
                placeholder="Nhập lý do tại đây..."
                placeholderTextColor="#999"
                multiline
                value={reason}
                onChangeText={setReason}
            />
            <View style={DashboardStyles.modalButtons}>
                <TouchableOpacity 
                style={[DashboardStyles.modalBtn, { backgroundColor: '#333' }]} 
                onPress={() => setIsModalVisible(false)}
                >
                <Text style={DashboardStyles.modalBtnText}>QUAY LẠI</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={[DashboardStyles.modalBtn, { backgroundColor: '#E02121' }]} 
                onPress={submitCancelRequest}
                >
                <Text style={DashboardStyles.modalBtnText}>GỬI YÊU CẦU</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
        </Modal>
  )
}

export default CancelModal