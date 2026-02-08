import { StyleSheet } from "react-native";
export const MenuDetailStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  imageHeader: { height: 300, width: '100%' },
  mainImage: { width: '100%', height: '100%' },
  backButton: { position: 'absolute', top: 50, left: 20, backgroundColor: '#FFF', padding: 8, borderRadius: 20 },
  shareButton: { position: 'absolute', top: 50, right: 20, backgroundColor: '#FFF', padding: 8, borderRadius: 20 },
  infoCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginTop: -50,
    borderRadius: 24,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1A1A1A', flex: 1 },
  priceTag: { backgroundColor: '#FFF5F0', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  priceText: { color: '#E25822', fontWeight: 'bold', fontSize: 14 },
  description: { fontSize: 14, color: '#666', lineHeight: 20, marginTop: 12 },
  metaRow: { flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' },
  metaItem: { flexDirection: 'row', alignItems: 'center' },
  metaText: { fontSize: 12, color: '#666', marginLeft: 5, fontWeight: '500' },
  
  listContainer: { padding: 20 },
  recipeGroup: { marginBottom: 20 },
  
  // Bố cục mới cho Header từng món
  recipeHeader: { 
    flexDirection: 'row', 
    alignItems: 'flex-start', // Căn đỉnh để text dài tự xuống dòng
    marginBottom: 15,
  },
  recipeIcon: { 
    width: 50, 
    height: 50, 
    borderRadius: 12, // Đổi bo góc cho hiện đại
    backgroundColor: '#EEE', 
    borderWidth: 1, 
    borderColor: '#F0F0F0' 
  },
  recipeInfoContent: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  recipeName: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#1A1A1A',
    marginBottom: 4,
    lineHeight: 24,
  },
  viewRecipeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start', // Chỉ chiếm diện tích vừa đủ content
  },
  viewRecipeText: { 
    fontSize: 13, 
    color: '#E25822', 
    fontWeight: '600' 
  },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#FFF',
    flexDirection: 'row',
    padding: 15,
    paddingBottom: 35,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    elevation: 10,
  },
  totalLabel: { fontSize: 10, color: '#888', fontWeight: 'bold' },
  totalPrice: { fontSize: 20, fontWeight: 'bold', color: '#E25822' },
  buyButton: {
    backgroundColor: '#E25822',
    flexDirection: 'row',
    paddingHorizontal: 15,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  extraItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    paddingLeft: 10
  },
  extraText: {
    fontSize: 13,
    color: '#888',
    fontStyle: 'italic'
  }
});