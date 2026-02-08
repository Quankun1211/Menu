import { StyleSheet } from "react-native";
export const DiscountProductStyles = StyleSheet.create({
  container: {
    marginTop: 10, 
    marginBottom: 10,
  },
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 25, 
    marginBottom: 15 
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  seeAll: { color: '#F26522', fontWeight: '500' },

  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%', 
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    marginBottom: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  productImg: { width: '100%', height: 120 },
  productInfo: { padding: 12 },
  productCat: { fontSize: 12, color: '#888' },
  productName: { fontSize: 14, fontWeight: 'bold', marginVertical: 4 },
  productFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 },
  productPrice: { color: '#F26522', fontWeight: 'bold', fontSize: 15 },
  oldPrice: { fontSize: 11, color: '#bbb', textDecorationLine: 'line-through' },
  addButton: { backgroundColor: '#F26522', borderRadius: 50, padding: 4 },
  
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FF4D4F',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    zIndex: 10,
  },
  discountText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
});