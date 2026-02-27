import { StyleSheet } from "react-native";

export const OrderHistoryStyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0f0f0f' },
    headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', margin: 20 },
    tabContainer: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20 },
    tab: { marginRight: 20, paddingBottom: 5 },
    activeTab: { borderBottomWidth: 2, borderBottomColor: '#4cd964' },
    tabText: { color: '#888', fontSize: 16 },
    activeTabText: { color: '#fff', fontWeight: '600' },
    statsContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 20 },
    statBox: { backgroundColor: '#1a1a1a', padding: 15, borderRadius: 12, width: '47%' },
    statLabel: { color: '#888', fontSize: 11, marginBottom: 5 },
    statValue: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
    listTitle: { color: '#fff', fontSize: 16, fontWeight: '600', marginLeft: 20, marginBottom: 15 },
    card: { backgroundColor: '#1a1a1a', padding: 15, borderRadius: 12, marginBottom: 15, marginHorizontal: 20 },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    orderId: { color: '#fff', fontSize: 14 },
    status: { fontSize: 12, fontWeight: '600' },
    timeText: { color: '#888', fontSize: 12 },
    priceText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    reasonText: { color: '#f39c12', fontSize: 12, fontStyle: 'italic', marginTop: 5 },
    detailBtn: { marginTop: 15, alignItems: 'flex-end' },
    detailText: { color: '#4cd964', fontWeight: '600' },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 20
    },
    modalContent: {
        backgroundColor: '#1a1a1a',
        borderRadius: 15,
        padding: 20
    },
    modalTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center'
    },
    modalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    modalLabel: {
        color: '#888',
        fontSize: 14
    },
    modalValue: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600'
    },
    closeButton: {
        backgroundColor: '#4cd964',
        padding: 12,
        borderRadius: 8,
        marginTop: 20
    },
    closeButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold'
    }
})