import { StyleSheet } from 'react-native';

export const AccountStyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0f0f0f' },
    scrollContent: { padding: 20 },
    profileHeader: { alignItems: 'center', marginBottom: 30, marginTop: 20 },
    avatarPlaceholder: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#333', marginBottom: 15 },
    userName: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
    userRole: { color: '#888', fontSize: 14, marginTop: 5 },
    statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
    statCard: { backgroundColor: '#1a1a1a', padding: 15, borderRadius: 12, alignItems: 'center', width: '30%' },
    statValue: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
    statLabel: { color: '#888', fontSize: 11 },
    section: { marginBottom: 25 },
    sectionTitle: { color: '#fff', fontSize: 16, fontWeight: '600', marginBottom: 15 },
    earningBox: { backgroundColor: '#1a1a1a', padding: 20, borderRadius: 12 },
    earningLabel: { color: '#888', fontSize: 14, marginBottom: 5 },
    earningValue: { color: '#4cd964', fontSize: 24, fontWeight: 'bold' },
    menuContainer: { backgroundColor: '#1a1a1a', borderRadius: 12, paddingHorizontal: 15 },
    menuItem: { paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#333' },
    menuText: { color: '#fff', fontSize: 16 },
    kpiGrid: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        backgroundColor: '#1a1a1a', 
        padding: 15, 
        borderRadius: 12 
    },
    kpiBox: { 
        alignItems: 'center', 
        width: '30%' 
    },
    kpiValue: { 
        color: '#4cd964', 
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
        backgroundColor: '#1a1a1a',
        borderRadius: 15,
        padding: 25,
        width: '100%',
        alignItems: 'center'
    },
    modalTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    modalText: {
        color: '#ccc',
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