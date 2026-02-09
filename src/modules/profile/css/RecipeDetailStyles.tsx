import { StyleSheet } from "react-native";

export const RecipeDetailStyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9F5' },
  imageContainer: { height: 350, position: 'relative' },
  mainImage: { width: '100%', height: '100%' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)' },
  backButton: { position: 'absolute', top: 20, left: 20 },
  moreButton: { position: 'absolute', top: 20, right: 20 },
  editIconButton: { 
    position: 'absolute', top: 40, right: 20, 
    backgroundColor: 'rgba(255,255,255,0.3)', 
    padding: 8, borderRadius: 20 
  },
  headerInfo: { position: 'absolute', bottom: 30, left: 20 },
  recipeName: { color: 'white', fontSize: 28, fontWeight: 'bold' },
  recipeSub: { color: 'rgba(255,255,255,0.8)', fontSize: 14, marginTop: 5 },
  contentBody: { padding: 20, marginTop: -20, backgroundColor: '#F8F9F5', borderTopLeftRadius: 30, borderTopRightRadius: 30 },
  statsRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 25 },
  statCard: { 
    backgroundColor: 'white', padding: 15, borderRadius: 15, 
    alignItems: 'center', width: '30%', 
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1 
  },
  statValue: { fontSize: 16, fontWeight: 'bold', marginVertical: 5 },
  statLabel: { fontSize: 10, color: '#999' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#2C3E50' },
  ingredientRow: { 
    flexDirection: 'row', justifyContent: 'space-between', 
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#ECECEC' 
  },
  ingredientName: { fontSize: 15, color: '#444' },
  ingredientQty: { fontSize: 15, fontWeight: 'bold', color: '#D35400' },
  stepRow: { flexDirection: 'row', marginBottom: 20 },
  stepNumberContainer: { alignItems: 'center', marginRight: 15 },
  stepCircle: { 
    width: 30, height: 30, borderRadius: 15, 
    backgroundColor: '#E67E22', justifyContent: 'center', alignItems: 'center' 
  },
  stepText: { color: 'white', fontWeight: 'bold' },
  stepLine: { width: 1, flex: 1, backgroundColor: '#E67E22', marginTop: 5, borderStyle: 'dashed' },
  stepContent: { flex: 1 },
  stepTitleText: { fontSize: 17, fontWeight: 'bold', marginBottom: 5 },
  stepDescription: { fontSize: 14, color: '#666', lineHeight: 20 },
  noteBox: { 
    backgroundColor: '#EFEBE2', padding: 20, borderRadius: 15, 
    marginTop: 20, marginBottom: 100 
  },
  noteHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  noteTitle: { color: '#D35400', fontWeight: 'bold', marginLeft: 8 },
  noteBody: { fontStyle: 'italic', color: '#555', lineHeight: 22 },
  bottomActions: { 
    flexDirection: 'row', padding: 20, backgroundColor: 'white', 
    position: 'absolute', bottom: 0, width: '100%', 
    justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#EEE' 
  },
  editBtn: { 
    flexDirection: 'row', backgroundColor: '#D35400', 
    padding: 15, borderRadius: 15, width: '65%', 
    justifyContent: 'center', alignItems: 'center' 
  },
  shareBtn: { 
    flexDirection: 'row', backgroundColor: '#EEE', 
    padding: 15, borderRadius: 15, width: '30%', 
    justifyContent: 'center', alignItems: 'center' 
  },
  btnText: { color: 'white', fontWeight: 'bold', marginLeft: 10 },
  shareBtnText: { color: '#333', fontWeight: 'bold', marginLeft: 5 }
})