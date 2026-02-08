import { StyleSheet } from "react-native";
export const HomePageStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    zIndex: 999, 
    paddingBottom: 5
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: "#ffa85c90"
  },
  searchDropdown: {
    position: "absolute",
    top: 48, 
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 12,
    maxHeight: 280,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8, 
    zIndex: 1000,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  dropdownText: {
    fontSize: 14,
    color: "#444",
  },

  image: {
    width: 42,
    height: 42,
    borderRadius: 8,
    marginRight: 10,
  },

  price: {
    fontSize: 12,
    color: "#F26522",
    marginTop: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  iconButton: {
    width: 48,
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    elevation: 2,
  },
  notifBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    backgroundColor: '#FF4D4F',
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  //dac san vung mien
  // Header & Search
  headerWrapper: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginBottom: 15 },
  addressContainer: { flexDirection: 'row', alignItems: 'center' },
  addressIconBox: { width: 40, height: 40, backgroundColor: '#FFF0E8', borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  addressLabel: { fontSize: 10, color: '#888', fontWeight: 'bold' },
  addressText: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  
  searchContainer: { marginBottom: 20 },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', borderRadius: 25, paddingHorizontal: 15, height: 45 },

  // Region Grid
  regionGrid: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 15 },
  regionCard: { alignItems: 'center', width: '30%' },
  iconCircle: { width: 60, height: 60, borderRadius: 15, borderWidth: 1, borderStyle: 'dashed', borderColor: '#F26522', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  regionTitle: { fontSize: 11, fontWeight: 'bold', color: '#F26522' },
  regionSub: { fontSize: 10, color: '#888', marginTop: 4 },

  // Recipe Banner
  recipeBanner: { height: 200, marginBottom: 20, justifyContent: 'flex-end' },
  recipeOverlay: { padding: 15, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 20 },
  recipeTag: { backgroundColor: '#F26522', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10, marginBottom: 5 },
  recipeTagText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  recipeTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  recipeSub: { color: '#eee', fontSize: 12, marginTop: 4 },
// Header
  container: { flex: 1, paddingHorizontal: 15, paddingTop: 0 },
  
  bannerContainer: { height: 180, marginTop: 0 },
  bannerImage: { flex: 1, justifyContent: 'flex-end' },
  bannerOverlay: { padding: 20, backgroundColor: 'rgba(0, 0, 0, 0.01)', borderRadius: 20 },
  bannerTag: { color: '#F26522', fontWeight: 'bold', fontSize: 12 },
  bannerTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  bannerSubTitle: { color: '#fff', fontSize: 13, opacity: 0.9 },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 25, marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  seeAll: { color: '#F26522', fontWeight: '500' },
});