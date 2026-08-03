import { StyleSheet, Dimensions } from "react-native";

export const ChatbotStyles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: Dimensions.get("window").height * 0.95,
        backgroundColor: '#f8f3e7',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        elevation: 5,
    },
    innerContainer: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E8DFCA', 
        backgroundColor: '#FFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    avatarSmall: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        marginHorizontal: 8,
        backgroundColor: '#F0EAD6',
    },
    bubbleContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 15,
        width: '100%',
    },
    userAlign: {
        justifyContent: 'flex-end',
    },
    botAlign: {
        justifyContent: 'flex-start',
    },
    headerTitleRow: { flexDirection: 'row', alignItems: 'center' },
    statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4CAF50', marginRight: 8 },
    headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#4E342E' }, 
    headerSubtitle: { fontSize: 12, color: '#806A5C', marginTop: 2 },
    tabs: { flexDirection: 'row', backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#E8DFCA' },
    tab: { flex: 1, height: 48, flexDirection: 'row', gap: 7, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
    activeTab: { borderBottomColor: '#E25822' },
    tabText: { color: '#777', fontSize: 14, fontWeight: '600' },
    activeTabText: { color: '#E25822' },
    messageList: { padding: 15, paddingBottom: 20, flexGrow: 1 },
    emptySupport: { flex: 1, paddingHorizontal: 40, alignItems: 'center', justifyContent: 'center' },
    emptyTitle: { color: '#4E342E', fontSize: 17, fontWeight: '700', marginTop: 12 },
    emptyText: { color: '#806A5C', fontSize: 14, textAlign: 'center', lineHeight: 20, marginTop: 6 },
    pendingText: { color: '#806A5C', fontSize: 12, fontStyle: 'italic', paddingHorizontal: 18, paddingVertical: 4 },
    msgBubble: { maxWidth: '80%', padding: 12, borderRadius: 18 },
    userBubble: { 
        backgroundColor: '#A0522D', 
        borderBottomRightRadius: 2 
    },
    botBubble: { 
        backgroundColor: '#EFEBE9', 
        borderBottomLeftRadius: 2,
        borderWidth: 1,
        borderColor: '#D7CCC8'
    },
    userText: { color: '#FFF' },
    botText: { color: '#3E2723', lineHeight: 22 },
    recipeStepCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 15,
        marginBottom: 12,
        borderLeftWidth: 5,
        borderLeftColor: '#8D6E63', // Màu nâu gốm
        width: '100%',
        elevation: 2,
        shadowColor: '#5D4037',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    inputArea: { 
        flexDirection: 'row', 
        padding: 15, 
        alignItems: 'center', 
        borderTopWidth: 1, 
        borderTopColor: '#E8DFCA',
        backgroundColor: '#FFF'
    },
    inputAreaFocused: {
        borderTopColor: '#D16D2F',
    },
    textInput: { 
        flex: 1, 
        backgroundColor: '#FFFFFF',
        borderRadius: 20, 
        paddingHorizontal: 15, 
        paddingVertical: 8, 
        marginRight: 10, 
        maxHeight: 80,
        color: '#2C1810',
        borderWidth: 1,
        borderColor: '#CFA98B'
    },
    textInputFocused: {
        borderWidth: 2,
        borderColor: '#D16D2F',
    }
});
