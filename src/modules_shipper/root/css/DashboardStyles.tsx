import { StyleSheet } from "react-native";

export const DashboardStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFDF9' },
  header: { paddingHorizontal: 18, paddingTop: 14, paddingBottom: 10, backgroundColor: '#5C4033', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  userText: { marginLeft: 15 },
  userName: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  userId: { color: '#32E021', fontSize: 12 },
  incomeCard: { backgroundColor: 'rgba(255,255,255,0.12)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16 },
  incomeValue: { color: '#32E021', fontSize: 24, fontWeight: 'bold' },
  orderCount: { color: '#fff', fontSize: 12, fontWeight: '700' },
  statusToggle: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 18, paddingVertical: 12, backgroundColor: '#FAECE1', alignItems: 'center' },
  statusTitle: { color: '#5C4033', fontSize: 15, fontWeight: '800' },
  mapContainer: { height: '34%' },
  bottomSheet: { 
    flex: 1,
    backgroundColor: '#FFFDF9',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#333',
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 10
  },
  sheetHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  sheetEyebrow: { color: '#D16D2F', fontSize: 10, fontWeight: '900', letterSpacing: 1.4 },
  sheetTitle: { color: '#5C4033', fontSize: 20, fontWeight: '900', marginTop: 2 },
  activeCountBadge: { minWidth: 36, height: 36, borderRadius: 18, backgroundColor: '#FAECE1', alignItems: 'center', justifyContent: 'center' },
  activeCountText: { color: '#D16D2F', fontWeight: '900' },
  orderCard: { 
    backgroundColor: '#fff',
    borderRadius: 20, 
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEDCCF',
  },
  orderRow: { flexDirection: 'row', justifyContent: 'space-between' },
  serviceType: { color: '#FF4500', fontSize: 12, fontWeight: 'bold' },
  priceText: { color: '#D16D2F', fontSize: 18, fontWeight: 'bold' },
  addressContainer: { marginVertical: 10 },
  addressLabel: { color: '#D16D2F', fontSize: 10, fontWeight: 'bold' },
  addressValue: { color: '#5C4033', fontSize: 14 },
  statusRow: { marginBottom: 10 },
  statusText: { color: '#ccc', fontSize: 12 },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10
  },
  acceptBtn: { 
    backgroundColor: '#D16D2F',
    padding: 12, 
    borderRadius: 12, 
    alignItems: 'center',
    flex: 2
  },
  acceptText: { color: '#000', fontWeight: 'bold' },
  cancelBtn: {
    backgroundColor: '#222',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
    borderColor: '#444'
  },
  cancelText: { color: '#ff4444', fontWeight: 'bold', fontSize: 12 },
  shipperMarker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(224, 33, 33, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shipperDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#e02121',
    borderWidth: 2,
    borderColor: '#fff',
  },
  customerMarker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(33, 224, 74, 0.39)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  customerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4cd964',
    borderWidth: 2,
    borderColor: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#333'
  },
  modalTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center'
  },
  textInput: {
    backgroundColor: '#000',
    color: '#FFF',
    borderRadius: 10,
    padding: 15,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 20
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modalBtn: {
    flex: 0.48,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  modalBtnText: {
    color: '#FFF',
    fontWeight: 'bold'
  },
  cancelInfoBox: {
    backgroundColor: 'rgba(224, 33, 33, 0.1)',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#E02121'
  },
  cancelInfoText: {
    color: '#E02121',
    fontSize: 13,
    fontStyle: 'italic'
  },
  addressLine: {
    borderLeftWidth: 2,
    borderLeftColor: '#E8C5A8',
    paddingLeft: 12,
    marginBottom: 8,
    marginLeft: 4
  },
  customerInfo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#5C4033',
    marginBottom: 2,
    paddingBottom: 5,
    paddingTop: 5,
  }
});
