import { StyleSheet, Dimensions } from "react-native";
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const DashboardStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050a05' },
  header: { padding: 20, paddingTop: 20 },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  userText: { marginLeft: 15 },
  userName: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  userId: { color: '#32E021', fontSize: 12 },
  incomeCard: { marginTop: 15 },
  incomeValue: { color: '#32E021', fontSize: 24, fontWeight: 'bold' },
  orderCount: { color: '#fff', marginTop: 5 },
  statusToggle: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, paddingTop: 0, paddingBottom: 0 },
  statusTitle: { color: '#fff', fontSize: 16 },
  mapContainer: { flex: 1 },
  bottomSheet: { 
    backgroundColor: '#101a10', 
    padding: 20, 
    position: 'absolute', 
    top: SCREEN_HEIGHT - 60, 
    width: '100%',
    height: SCREEN_HEIGHT, // Chiều cao full màn hình để khi kéo lên không bị hụt đáy
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#333',
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 10
  },
  sheetTitle: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 15 
  },
  orderCard: { 
    backgroundColor: '#162616', 
    borderRadius: 20, 
    padding: 15,
    marginBottom: 15
  },
  orderRow: { flexDirection: 'row', justifyContent: 'space-between' },
  serviceType: { color: '#FF4500', fontSize: 12, fontWeight: 'bold' },
  priceText: { color: '#32E021', fontSize: 18, fontWeight: 'bold' },
  addressContainer: { marginVertical: 10 },
  addressLabel: { color: '#32E021', fontSize: 10, fontWeight: 'bold' },
  addressValue: { color: '#fff', fontSize: 14 },
  statusRow: { marginBottom: 10 },
  statusText: { color: '#ccc', fontSize: 12 },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10
  },
  acceptBtn: { 
    backgroundColor: '#32E021', 
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
    borderLeftColor: '#444',
    paddingLeft: 12,
    marginBottom: 8,
    marginLeft: 4
  },
  customerInfo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
    paddingBottom: 5,
    paddingTop: 5,
  }
});