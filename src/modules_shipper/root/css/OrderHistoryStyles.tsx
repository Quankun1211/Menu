import { StyleSheet } from "react-native";

export const OrderHistoryStyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFDF9' },
    headerTitle: { color: '#5C4033', fontSize: 22, fontWeight: '900', margin: 20 },
    tabContainer: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20 },
    tab: { marginRight: 20, paddingBottom: 5 },
    activeTab: { borderBottomWidth: 2, borderBottomColor: '#D16D2F' },
    tabText: { color: '#888', fontSize: 16 },
    activeTabText: { color: '#D16D2F', fontWeight: '700' },
    statsContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 20 },
    statBox: { backgroundColor: '#FAECE1', padding: 15, borderRadius: 16, width: '47%' },
    statLabel: { color: '#888', fontSize: 11, marginBottom: 5 },
    statValue: { color: '#5C4033', fontSize: 22, fontWeight: 'bold' },
    listTitle: { color: '#5C4033', fontSize: 17, fontWeight: '800', marginLeft: 20, marginBottom: 15 },
    card: { backgroundColor: '#fff', padding: 15, borderRadius: 16, marginBottom: 15, borderWidth: 1, borderColor: '#EEDCCF' },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    orderId: { color: '#5C4033', fontSize: 14, fontWeight: '700' },
    status: { fontSize: 12, fontWeight: '600' },
    timeText: { color: '#888', fontSize: 12 },
    priceText: { color: '#D16D2F', fontSize: 16, fontWeight: 'bold' },
    reasonText: { color: '#f39c12', fontSize: 12, fontStyle: 'italic', marginTop: 5 },
    detailBtn: { marginTop: 15, alignItems: 'flex-end' },
    detailText: { color: '#D16D2F', fontWeight: '700' },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 20
    },
    modalContent: {
        backgroundColor: '#FFFDF9',
        borderRadius: 15,
        padding: 20
    },
    modalTitle: {
        color: '#5C4033',
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
        color: '#5C4033',
        fontSize: 14,
        fontWeight: '600'
    },
    closeButton: {
        backgroundColor: '#D16D2F',
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
