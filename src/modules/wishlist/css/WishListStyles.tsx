import { StyleSheet, Dimensions } from "react-native"
const { width } = Dimensions.get("window");
const columnWidth = (width - 44) / 2; 
export const WishlistStyles = StyleSheet.create({
    headerAction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
    },
    selectAllBox: {
        flexDirection: "row",
        alignItems: "center",
    },

        selectAllText: {
        marginLeft: 6,
        fontSize: 14,
        color: "#333",
    },
    headerTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 8,
    },
    editBtn: {
        fontSize: 16,
        color: '#F26522',
        fontWeight: '600',
    },
    listContainer: {
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 0, 
    },
   
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 12,
        marginBottom: 12,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 15,
        backgroundColor: '#F5F5F5',
    },
    itemInfo: {
        flex: 1,
        marginLeft: 12,
    },
    itemName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#333',
    },
    itemSpec: {
        fontSize: 12,
        color: '#999',
        marginVertical: 4,
    },
    itemPrice: {
        fontSize: 15,
        fontWeight: '700',
        color: '#FF6B35',
    },
    addToCartButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FF6B35',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
    },
    addToCartText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 4,
    },
    deleteBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
        backgroundColor: '#FFF',
    },

    deleteButton: {
        backgroundColor: '#FF4D4F',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
     suggestionSection: {
        marginTop: 20,
        marginBottom: 10,
    },
    suggestionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    activeIndicator: {
        width: 4,
        height: 18,
        backgroundColor: '#1A4D2E',
        borderRadius: 2,
        marginRight: 8,
    },
    suggestionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    suggestionGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    suggestionCard: {
        width: columnWidth,
        backgroundColor: '#FFF',
        borderRadius: 15,
        marginBottom: 12,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    suggestionImage: {
        width: '100%',
        height: columnWidth,
        backgroundColor: '#F9F9F9',
    },
    suggestionInfo: {
        padding: 10,
    },
    suggestionName: {
        fontSize: 14,
        color: '#333',
        height: 40,
        fontWeight: '500',
    },
    suggestionMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    suggestionPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FF6B35',
    },
    miniAddButton: {
        backgroundColor: '#1A4D2E', 
        borderRadius: 8,
        padding: 2,
    },
    productScroll: { 
        flexDirection: 'row',
    },
    suggestionCardHorizontal: {
        width: 160,
        backgroundColor: '#FFF',
        borderRadius: 15,
        marginRight: 12,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginBottom: 5, 
    },
    
})