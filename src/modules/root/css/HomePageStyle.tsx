import { StyleSheet } from "react-native";
export const HomePageStyles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFDF9' },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 36 },
  mobileHeader: {
    height: 58,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FAECE1',
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  brandMark: { backgroundColor: '#D16D2F', borderRadius: 9, paddingHorizontal: 9, paddingVertical: 7 },
  brandMarkText: { color: '#fff', fontSize: 14, fontWeight: '900', letterSpacing: -0.5 },
  brandName: { color: '#5C4033', fontSize: 16, fontWeight: '900', letterSpacing: 2 },
  brandCaption: { color: '#8B6E5C', fontSize: 9, fontWeight: '600', marginTop: 1 },
  headerAction: {
    width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  searchArea: { paddingHorizontal: 16, paddingTop: 10, backgroundColor: '#FAECE1', zIndex: 20 },
  hero: { minHeight: 330, borderRadius: 28, padding: 22, overflow: 'hidden', marginBottom: 4 },
  heroGlow: {
    position: 'absolute', width: 220, height: 220, borderRadius: 110,
    right: -80, top: -70, backgroundColor: 'rgba(209,109,47,0.24)',
  },
  eyebrow: { flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 14 },
  eyebrowText: { color: '#F4C7A5', fontSize: 10, fontWeight: '900', letterSpacing: 1.6 },
  heroTitle: { color: '#fff', fontSize: 29, lineHeight: 36, fontWeight: '900', letterSpacing: -0.7 },
  heroDescription: { color: 'rgba(255,255,255,0.78)', fontSize: 14, lineHeight: 21, marginTop: 12, maxWidth: 310 },
  heroActions: { flexDirection: 'row', gap: 10, marginTop: 20 },
  primaryButton: {
    minHeight: 46, borderRadius: 23, paddingHorizontal: 18, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center', gap: 7, backgroundColor: '#D16D2F',
  },
  primaryButtonText: { color: '#fff', fontSize: 13, fontWeight: '800' },
  secondaryButton: {
    minHeight: 46, borderRadius: 23, paddingHorizontal: 16, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center', gap: 7, borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)', backgroundColor: 'rgba(255,255,255,0.08)',
  },
  secondaryButtonText: { color: '#fff', fontSize: 13, fontWeight: '800' },
  pressed: { opacity: 0.75, transform: [{ scale: 0.98 }] },
  trustRow: { flexDirection: 'row', gap: 16, marginTop: 20 },
  trustItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  trustText: { color: 'rgba(255,255,255,0.72)', fontSize: 10, fontWeight: '600' },
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
    borderRadius: 22,
    paddingHorizontal: 12,
    height: 46,
    borderWidth: 1,
    borderColor: "#E8C5A8"
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
  container: { flex: 1, paddingHorizontal: 0, paddingTop: 0 },
  
  bannerContainer: {
    height: 200, 
    marginTop: 0,
    borderRadius: 20,
    overflow: 'hidden',
  },
  bannerImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bannerOverlay: {
    padding: 20,
    height: '100%', 
    justifyContent: 'flex-end', 
  },
  bannerTag: {
    color: '#F26522',
    fontWeight: 'bold',
    fontSize: 12,
    textTransform: 'uppercase',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5
  },
  bannerSubTitle: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
    fontWeight: '500'
  },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 28, marginBottom: 14 },
  sectionTitle: { fontSize: 19, fontWeight: '900', color: '#5C4033', letterSpacing: -0.3 },
  seeAll: { color: '#D16D2F', fontWeight: '700', fontSize: 13 },
});
