import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const columnWidth = (width - 45) / 2; 

export const ExploreStyles = StyleSheet.create({
  container: {
    paddingTop: 15,
    flex: 1,
    backgroundColor: '#fff',
  },
  favouriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 20,
    padding: 6,
    zIndex: 10,
  },
  headerWrapper: {
    marginBottom: 20,
    marginTop: 5,
  },
  chipList: {
    paddingBottom: 5,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginRight: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  activeChip: {
    backgroundColor: '#F26522',
  },
  inactiveChip: {
    backgroundColor: '#fff',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  activeChipText: {
    color: '#fff',
  },
  inactiveChipText: {
    color: '#666',
  },
  // Grid & Card Styles
  gridRow: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: columnWidth,
    marginBottom: 20,
    backgroundColor: '#fffefd',
    borderRadius: 20,
    boxShadow: '4px 8px 5px 0px rgba(0, 0, 0, 0.12)',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 28,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  addButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#F26522',
    borderRadius: 100,
    padding: 6,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  infoContainer: {
    marginTop: 8,
    paddingHorizontal: 2,
    paddingBottom: 8,
    paddingLeft: 8
  },
  productName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
    lineHeight: 20,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#F26522',
  },
  productUnit: {
    fontSize: 13,
    color: '#888',
  },
  soldStyle: {
    fontSize: 12,
    color: '#898989'
  },
  saleBadge: {
      position: 'absolute',
      top: 13,
      left: 13,
      backgroundColor: '#FF4D4F', 
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
      zIndex: 1,
  },
  saleText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: 'bold',
  },
  originalPrice: {
      fontSize: 12,
      color: '#999',
      textDecorationLine: 'line-through',
      marginTop: 2,
  },
});