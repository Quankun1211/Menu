import { StyleSheet } from "react-native";

export const ProductItemStyles = StyleSheet.create({
  productScroll: { flexDirection: 'row' },
  productCard: {
    width: 160, backgroundColor: '#fff', borderRadius: 20, marginRight: 15,
    overflow: 'hidden', position: 'relative', borderWidth: 1, borderColor: '#EEDCCF',
    shadowColor: '#5C4033', shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08, shadowRadius: 10, elevation: 3,
  },
  productImg: { width: '100%', height: 120 },
  productInfo: { padding: 12 },
  productCat: { fontSize: 12, color: '#888' },
  productName: { fontSize: 14, fontWeight: 'bold', marginVertical: 4, color: '#5C4033' },
  productFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 },
  productPrice: { color: '#D16D2F', fontWeight: 'bold' },
  addButton: { backgroundColor: '#D16D2F', borderRadius: 50, padding: 6 },
  container: {
    marginVertical: 10,
  },
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 15 
  },
  sectionTitle: { fontSize: 19, fontWeight: '900', color: '#5C4033' },
  seeAll: { color: '#D16D2F', fontWeight: '700' },
})
