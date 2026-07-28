import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    SafeAreaView, 
    StatusBar, 
    ScrollView,
    Image,
    Modal
} from 'react-native';
import { router } from "expo-router"
import { AccountStyles } from '../css/AccountStyles';
import useGetMe from '@/hooks/useGetMe';
import useLogout from '@/hooks/useLogOut';
import useGetShipperStats from '../hooks/useGetShipperStats';
import { formatVND } from '@/utils/helper';

export default function AccountScreen() {
    const [logoutModal, setLogoutModal] = useState(false);
    const { data: meData } = useGetMe();
    const { data: statsResponse } = useGetShipperStats();
    const { mutate: logoutMutation } = useLogout();

    const stats = statsResponse?.data ?? {
        total: 0, active: 0, delivered: 0, cancelled: 0,
        pendingCancel: 0, codCollected: 0, averageDeliveryMinutes: 0
    };
    const successRate = stats.total > 0
        ? Math.round((stats.delivered / stats.total) * 100)
        : 0;

    const handleConfirmLogout = () => {
        logoutMutation(undefined, {
            onSuccess: () => {
                setLogoutModal(false);
                router.replace('/(tabs)'); 
            }
        });
    };

    return (
        <SafeAreaView style={AccountStyles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFDF9" />
            <ScrollView contentContainerStyle={AccountStyles.scrollContent}>
                
                <View style={AccountStyles.profileHeader}>
                    <Image 
                        source={{ uri: meData?.data?.avatar || 'https://i.pravatar.cc/150?u=a' }} 
                        style={{width: 80, height: 80, borderRadius: 40, backgroundColor: '#333', marginBottom: 15}} 
                    />
                    <Text style={AccountStyles.userName}>{meData?.data.name}</Text>
                    <Text style={AccountStyles.userRole}>Đối tác giao hàng</Text>
                </View>

                <View style={AccountStyles.section}>
                    <Text style={AccountStyles.sectionTitle}>Hiệu suất làm việc</Text>
                    <View style={AccountStyles.kpiGrid}>
                        <View style={AccountStyles.kpiBox}>
                            <Text style={AccountStyles.kpiValue}>{successRate}%</Text>
                            <Text style={AccountStyles.kpiLabel}>Tỉ lệ giao</Text>
                        </View>
                        <View style={AccountStyles.kpiBox}>
                            <Text style={AccountStyles.kpiValue}>{stats.averageDeliveryMinutes}p</Text>
                            <Text style={AccountStyles.kpiLabel}>TB giao/đơn</Text>
                        </View>
                        <View style={AccountStyles.kpiBox}>
                            <Text style={AccountStyles.kpiValue}>{formatVND(stats.codCollected)}</Text>
                            <Text style={AccountStyles.kpiLabel}>COD đã thu</Text>
                        </View>
                    </View>
                </View>

                <View style={AccountStyles.statsGrid}>
                    <View style={AccountStyles.statCard}>
                        <Text style={AccountStyles.statValue}>{stats.total}</Text>
                        <Text style={AccountStyles.statLabel}>Tổng đơn</Text>
                    </View>
                    <View style={AccountStyles.statCard}>
                        <Text style={[AccountStyles.statValue, { color: '#2F8F5B' }]}>{stats.delivered}</Text>
                        <Text style={AccountStyles.statLabel}>Thành công</Text>
                    </View>
                    <View style={AccountStyles.statCard}>
                        <Text style={[AccountStyles.statValue, { color: '#C84B45' }]}>{stats.cancelled}</Text>
                        <Text style={AccountStyles.statLabel}>Đã hủy</Text>
                    </View>
                </View>

                <View style={AccountStyles.menuContainer}>
                    <TouchableOpacity style={AccountStyles.menuItem}>
                        <Text style={AccountStyles.menuText}>Thông tin cá nhân</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={AccountStyles.menuItem}>
                        <Text style={AccountStyles.menuText}>Cài đặt thông báo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={AccountStyles.menuItem}>
                        <Text style={AccountStyles.menuText}>Hỗ trợ & Phản hồi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[AccountStyles.menuItem, { borderBottomWidth: 0 }]}
                        onPress={() => setLogoutModal(true)}
                    >
                        <Text style={[AccountStyles.menuText, { color: '#ff4444' }]}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            <Modal
                visible={logoutModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setLogoutModal(false)}
            >
                <View style={AccountStyles.modalOverlay}>
                    <View style={AccountStyles.modalContent}>
                        <Text style={AccountStyles.modalTitle}>Xác nhận đăng xuất</Text>
                        <Text style={AccountStyles.modalText}>Bạn có chắc chắn muốn đăng xuất khỏi tài khoản?</Text>
                        <View style={AccountStyles.modalButtonRow}>
                            <TouchableOpacity 
                                style={[AccountStyles.modalButton, { backgroundColor: '#333' }]}
                                onPress={() => setLogoutModal(false)}
                            >
                                <Text style={{ color: '#fff' }}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[AccountStyles.modalButton, { backgroundColor: '#ff4444' }]}
                                onPress={handleConfirmLogout}
                            >
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Đăng xuất</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
