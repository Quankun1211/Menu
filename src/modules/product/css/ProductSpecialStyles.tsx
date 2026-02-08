import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const ProductSpecialStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageSection: {
    width: '100%',
    height: width * 0.85,
    backgroundColor: '#fff',
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  floatingTag: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#D16D2F',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  floatingTagText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 5,
  },

  contentPadding: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  // Tên và giá
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A2C2A',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D16D2F',
  },
  oldPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  saleBadge: {
    backgroundColor: '#FDECE3',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  saleText: {
    color: '#D16D2F',
    fontSize: 12,
    fontWeight: 'bold',
  },

  // Thẻ nguồn gốc
  sourceCard: {
    backgroundColor: '#FFF8F1',
    flexDirection: 'row',
    padding: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3E0D1',
    alignItems: 'center',
    marginBottom: 25,
  },
  mapIconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#E8C5A8',
  },
  sourceTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#4A2C2A',
  },
  sourceDesc: {
    fontSize: 12,
    color: '#7A665D',
    marginTop: 2,
    lineHeight: 18,
  },

  // Bộ chọn số lượng và nút Add Cart
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: '30%',
    justifyContent: 'space-between',
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  addToCartBtnMain: {
    backgroundColor: '#D16D2F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 12,
    width: '65%',
  },
  addToCartBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },

  // Trích dẫn mô tả
  quoteContainer: {
    borderLeftWidth: 3,
    borderLeftColor: '#D16D2F',
    paddingLeft: 15,
    marginVertical: 10,
    fontStyle: 'italic',
  },
  quoteText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    fontStyle: 'italic',
  },

  // Tiêu đề các mục nhỏ
  subSectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#A88E7A',
    letterSpacing: 1.2,
    marginTop: 30,
    marginBottom: 15,
    textAlign: 'center',
  },

  // Chứng nhận chất lượng
  certRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  certItem: {
    alignItems: 'center',
    width: width / 3.5,
  },
  certLabel: {
    fontSize: 11,
    color: '#666',
    marginTop: 6,
    fontWeight: '500',
  },

  // Hương vị đặc trưng
  tasteRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    backgroundColor: '#FFF1E8',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 5,
    marginTop: 10,
  },
  tasteItem: {
    flex: 1, 
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'center',
  },
  tasteLabel: {
    fontSize: 12,
    color: '#D16D2F',
    fontWeight: '600',
    marginTop: 8, 
    textAlign: 'center',
  },

  // Truy xuất nguồn gốc
  traceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginTop: 30,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#D16D2F',
  },
  traceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A2C2A',
  },
  traceInfo: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },

  // Gợi ý món ngon (Horizontal)
  recipesSection: {
    marginTop: 35,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A2C2A',
    marginLeft: 10,
  },
  recipeChip: {
    width: 140,
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 10,
  },
  recipeChipImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  recipeChipName: {
    padding: 10,
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },

  usageSection: {
    marginTop: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 15,
    padding: 15,
  },
  usageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  usageContent: {
    paddingLeft: 5,
  },
  usageItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  usageBullet: {
    backgroundColor: '#D16D2F',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  usageBulletText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  usageText: {
    flex: 1,
    fontSize: 14,
    color: '#4A2C2A',
    lineHeight: 20,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 25, marginBottom: 10 },
  buyBtn: {
        flexDirection: 'row',
        backgroundColor: '#F26522',
        borderRadius: 25,
        paddingHorizontal: 25,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowColor: '#F26522',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    addToCartText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});