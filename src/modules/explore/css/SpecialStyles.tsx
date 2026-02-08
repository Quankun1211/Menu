import { StyleSheet } from 'react-native';

export const SpecialStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8', paddingTop: 20 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 15, paddingVertical: 15, backgroundColor: '#FFF'
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  
  mapCard: {
    backgroundColor: '#FFF', margin: 15, borderRadius: 20, padding: 15,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3
  },
  mapLabel: { color: '#D16D2F', fontWeight: 'bold', fontSize: 14 },
  mapSubLabel: { color: '#999', fontSize: 12, marginBottom: 10 },
  mapImage: { width: '100%', height: 220 },

  filterScroll: { paddingLeft: 15, marginBottom: 20 },
  filterBtn: {
    paddingHorizontal: 25, paddingVertical: 8, borderRadius: 20,
    backgroundColor: '#FFF', marginRight: 10, borderWidth: 1, borderColor: '#EEE'
  },
  filterBtnActive: { backgroundColor: '#F26522', borderColor: '#F26522' },
  filterText: { color: '#666', fontWeight: '500' },
  filterTextActive: { color: '#FFF' },

  // Section Header
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, marginBottom: 15
  },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  seeMore: { color: '#D16D2F', fontSize: 12 },

  // Product Card
  productCard: {
    backgroundColor: '#FFF', marginHorizontal: 15, borderRadius: 25,
    marginBottom: 20, overflow: 'hidden', elevation: 2
  },
  imageWrapper: { width: '100%', height: 200, position: 'relative' },
  productImage: { width: '100%', height: '100%' },
  tagBadge: {
    position: 'absolute', top: 12, left: 12, backgroundColor: '#D16D2F',
    paddingHorizontal: 12, paddingVertical: 4, borderRadius: 10
  },
  tagBadgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  
  productContent: { padding: 15 },
  subTagRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  subTagText: { fontSize: 10, color: '#D16D2F', fontWeight: 'bold', marginLeft: 5 },
  productTitleItalic: { fontSize: 14, fontStyle: 'italic', color: '#333', marginBottom: 5 },
  productName: { fontSize: 20, fontWeight: 'bold', color: '#000', marginBottom: 5 },
  productDesc: { fontSize: 13, color: '#666', lineHeight: 18, marginBottom: 15 },

  // Price & Button
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  oldPriceText: { fontSize: 12, color: '#BBB', textDecorationLine: 'line-through' },
  currentPriceText: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  addCartBtn: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#F26522',
    paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20
  },
  addCartText: { color: '#FFF', fontWeight: 'bold', marginLeft: 8, fontSize: 14 }
});