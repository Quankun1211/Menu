import { StyleSheet } from "react-native";

export const ProductItemStyles = StyleSheet.create({
  productScroll: { flexDirection: 'row' },
  productCard: { width: 160, backgroundColor: '#f9f9f9', borderRadius: 20, marginRight: 15, overflow: 'hidden', position: 'relative' },
  productImg: { width: '100%', height: 120 },
  productInfo: { padding: 12 },
  productCat: { fontSize: 12, color: '#888' },
  productName: { fontSize: 14, fontWeight: 'bold', marginVertical: 4 },
  productFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 },
  productPrice: { color: '#F26522', fontWeight: 'bold' },
  addButton: { backgroundColor: '#F26522', borderRadius: 50, padding: 4 },
  container: {
    marginVertical: 10,
  },
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 15 
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  seeAll: { color: '#F26522', fontWeight: '500' },
})