import { StyleSheet } from 'react-native';

export const AccountStyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFDF9' },
    scrollContent: { padding: 20 },
    profileHeader: { alignItems: 'center', marginBottom: 30, marginTop: 20 },
    avatarPlaceholder: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#333', marginBottom: 15 },
    userName: { color: '#5C4033', fontSize: 22, fontWeight: 'bold' },
    userRole: { color: '#D16D2F', fontSize: 14, marginTop: 5, fontWeight: '700' },
    statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
    statCard: { backgroundColor: '#fff', padding: 15, borderRadius: 16, alignItems: 'center', width: '30%', borderWidth: 1, borderColor: '#EEDCCF' },
    statValue: { color: '#5C4033', fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
    statLabel: { color: '#888', fontSize: 11 },
    section: { marginBottom: 25 },
    sectionTitle: { color: '#5C4033', fontSize: 17, fontWeight: '800', marginBottom: 15 },
    earningBox: { backgroundColor: '#1a1a1a', padding: 20, borderRadius: 12 },
    earningLabel: { color: '#888', fontSize: 14, marginBottom: 5 },
    earningValue: { color: '#4cd964', fontSize: 24, fontWeight: 'bold' },
    menuContainer: { backgroundColor: '#fff', borderRadius: 16, paddingHorizontal: 15, borderWidth: 1, borderColor: '#EEDCCF' },
    menuItem: { paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#F2E8E0' },
    menuText: { color: '#5C4033', fontSize: 16 },
    kpiGrid: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        backgroundColor: '#FAECE1',
        padding: 15, 
        borderRadius: 12 
    },
    kpiBox: { 
        alignItems: 'center', 
        width: '30%' 
    },
    kpiValue: { 
        color: '#D16D2F',
        fontSize: 18, 
        fontWeight: 'bold', 
        marginBottom: 5 
    },
    kpiLabel: { 
        color: '#888', 
        fontSize: 10, 
        textAlign: 'center' 
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    modalContent: {
        backgroundColor: '#FFFDF9',
        borderRadius: 15,
        padding: 25,
        width: '100%',
        alignItems: 'center'
    },
    modalTitle: {
        color: '#5C4033',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    modalText: {
        color: '#74645C',
        textAlign: 'center',
        marginBottom: 25
    },
    modalButtonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    modalButton: {
        paddingVertical: 12,
        // paddingHorizontal: 30,
        borderRadius: 8,
        width: '48%',
        alignItems: 'center'
    }
});
