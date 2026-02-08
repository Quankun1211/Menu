import { StyleSheet } from "react-native";

export const ExploreMenuStyle = StyleSheet.create({
    listContent: {
    paddingHorizontal: 15, // Đưa padding ngang vào đây thay vì bọc View ngoài
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  listHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  sectionSub: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 30, // Chỉnh lại một chút cho cân đối hơn 40
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  imageContainer: {
    height: 180,
    width: '100%',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FFEBE6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#E25822',
    fontSize: 11,
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  desc: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E25822',
  },
  itemsPreview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    gap: 15,
  },
  foodItem: {
    alignItems: 'center',
  },
  foodCircle: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  foodName: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5',
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  dot: {
    marginHorizontal: 8,
    color: '#ccc',
  },
  buyButton: {
    backgroundColor: '#E25822',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
})