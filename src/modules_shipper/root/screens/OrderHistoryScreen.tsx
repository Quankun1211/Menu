import React, { useState, useMemo } from 'react';
import { 
    View, 
    Text, 
    FlatList, 
    TouchableOpacity, 
    SafeAreaView,
    StatusBar,
    ActivityIndicator,
    Modal
} from 'react-native';
import useGetAllOrderShipper from '../hooks/useGetAllOrderShipper';
import { formatVND } from '@/utils/helper';
import { OrderHistoryStyles } from '../css/OrderHistoryStyles';
import { OrderResponse } from '@/modules/order/types/api-response';

export default function OrderHistoryScreen() {
    const [activeTab, setActiveTab] = useState('all');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(null);
    const { data: orderShipper, isPending } = useGetAllOrderShipper();

    const actualData = orderShipper?.data || [];

    const filteredData = useMemo(() => {
        if (activeTab === 'success') return actualData.filter(o => o.status === 'delivered');
        if (activeTab === 'pending_cancel') return actualData.filter(o => o.status === 'pending_cancel');
        if (activeTab === 'failed') return actualData.filter(o => o.status === 'cancelled');
        return actualData;
    }, [activeTab, actualData]);

    const totalOrders = actualData.length;
    const failedOrders = actualData.filter(o => o.status === 'cancelled').length;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')} • ${date.getDate()}/${date.getMonth() + 1}`;
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered': return '#4cd964';
            case 'cancelled': return '#ff4444';
            case 'pending_cancel': return '#f39c12';
            default: return '#fff';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'delivered': return 'Giao thành công';
            case 'cancelled': return 'Đã hủy';
            case 'pending_cancel': return 'Chờ xác nhận hủy';
            default: return 'Đang xử lý';
        }
    };

    const handleOpenModal = (item: OrderResponse) => {
        setSelectedOrder(item);
        setModalVisible(true);
    };

    const renderItem = ({ item }: { item: any }) => (
        <View style={OrderHistoryStyles.card}>
            <View style={OrderHistoryStyles.row}>
                <Text style={OrderHistoryStyles.orderId}>#VN-{item._id.slice(-5).toUpperCase()}</Text>
                <Text style={[OrderHistoryStyles.status, { color: getStatusColor(item.status) }]}>
                    {getStatusText(item.status)}
                </Text>
            </View>
            
            <View style={[OrderHistoryStyles.row, { marginTop: 8 }]}>
                <Text style={OrderHistoryStyles.timeText}>{formatDate(item.createdAt)}</Text>
                <Text style={OrderHistoryStyles.priceText}>
                    {formatVND(item.totalPrice)}
                </Text>
            </View>

            {item.status === 'cancelled' && item.reason && (
                <Text style={OrderHistoryStyles.reasonText}>{item.reason}</Text>
            )}

            <TouchableOpacity 
                style={OrderHistoryStyles.detailBtn} 
                onPress={() => handleOpenModal(item)}
            >
                <Text style={OrderHistoryStyles.detailText}>
                    {item.status === 'cancelled' || item.status === 'pending_cancel' ? 'Xem lý do' : 'Chi tiết'}
                </Text>
            </TouchableOpacity>
        </View>
    );

    if (isPending) {
        return (
            <View style={[OrderHistoryStyles.container, { justifyContent: 'center' }]}>
                <ActivityIndicator size="large" color="#4cd964" />
            </View>
        );
    }

    return (
        <SafeAreaView style={OrderHistoryStyles.container}>
            <StatusBar barStyle="light-content" />
            
            <Text style={OrderHistoryStyles.headerTitle}>Lịch sử giao hàng</Text>
            
            <View style={OrderHistoryStyles.tabContainer}>
                {['all', 'success', 'pending_cancel', 'failed'].map((tab) => (
                    <TouchableOpacity 
                        key={tab} 
                        onPress={() => setActiveTab(tab)}
                        style={[OrderHistoryStyles.tab, activeTab === tab && OrderHistoryStyles.activeTab]}
                    >
                        <Text style={[OrderHistoryStyles.tabText, activeTab === tab && OrderHistoryStyles.activeTabText]}>
                            {tab === 'all' ? 'Tất cả' : tab === 'success' ? 'Thành công' : tab === 'pending_cancel' ? 'Chờ hủy' : 'Thất bại'}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={OrderHistoryStyles.statsContainer}>
                <View style={OrderHistoryStyles.statBox}>
                    <Text style={OrderHistoryStyles.statLabel}>TỔNG ĐƠN HÀNG</Text>
                    <Text style={OrderHistoryStyles.statValue}>{totalOrders}</Text>
                </View>
                <View style={OrderHistoryStyles.statBox}>
                    <Text style={OrderHistoryStyles.statLabel}>TỔNG ĐƠN HỦY</Text>
                    <Text style={[OrderHistoryStyles.statValue, { color: '#ff4444' }]}>{failedOrders}</Text>
                </View>
            </View>

            <Text style={OrderHistoryStyles.listTitle}>Danh sách gần đây</Text>

            <FlatList 
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
                ListEmptyComponent={
                    <Text style={{ color: '#888', textAlign: 'center', marginTop: 20 }}>
                        Không có đơn hàng nào
                    </Text>
                }
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={OrderHistoryStyles.modalOverlay}>
                    <View style={OrderHistoryStyles.modalContent}>
                        <Text style={OrderHistoryStyles.modalTitle}>Chi tiết đơn hàng</Text>
                        
                        <View style={OrderHistoryStyles.modalRow}>
                            <Text style={OrderHistoryStyles.modalLabel}>Mã đơn:</Text>
                            <Text style={OrderHistoryStyles.modalValue}>#VN-{selectedOrder?._id.slice(-5).toUpperCase()}</Text>
                        </View>
                        
                        <View style={OrderHistoryStyles.modalRow}>
                            <Text style={OrderHistoryStyles.modalLabel}>Khách hàng:</Text>
                            <Text style={OrderHistoryStyles.modalValue}>{selectedOrder?.customer?.name || 'N/A'}</Text>
                        </View>

                        <View style={OrderHistoryStyles.modalRow}>
                            <Text style={OrderHistoryStyles.modalLabel}>Số điện thoại:</Text>
                            <Text style={OrderHistoryStyles.modalValue}>{selectedOrder?.address.phone || 'N/A'}</Text>
                        </View>

                        <View style={OrderHistoryStyles.modalRow}>
                            <Text style={OrderHistoryStyles.modalLabel}>Địa chỉ:</Text>
                            <Text style={[OrderHistoryStyles.modalValue, { flex: 1, textAlign: 'right' }]}>{selectedOrder?.address?.address || 'N/A'}</Text>
                        </View>

                        {(selectedOrder?.status === 'cancelled' || selectedOrder?.status === 'pending_cancel') && (
                            <View style={OrderHistoryStyles.modalRow}>
                                <Text style={[OrderHistoryStyles.modalLabel, { color: '#ff4444' }]}>Lý do:</Text>
                                <Text style={OrderHistoryStyles.modalValue}>{selectedOrder?.cancelRequest?.reason || 'Không có lý do'}</Text>
                            </View>
                        )}

                        <TouchableOpacity 
                            style={OrderHistoryStyles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={OrderHistoryStyles.closeButtonText}>Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}