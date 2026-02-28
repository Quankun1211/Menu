import { StyleSheet } from 'react-native';

export const CheckoutStyles = StyleSheet.create({
  container: { padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16, marginTop: 10 },
  
  // Address Card
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 20,
    borderRadius: 24,
    marginBottom: 24,
  },
  addressIconBg: { backgroundColor: '#fff', padding: 10, borderRadius: 15 },
  userName: { fontSize: 15, fontWeight: 'bold', marginBottom: 4 },
  addressText: { fontSize: 13, color: '#777', lineHeight: 18 },

  // Payment Option Card
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EEE',
    marginBottom: 12,
  },
  paymentCardSelected: { borderColor: '#F26522', backgroundColor: '#FFF9F6' },
  paymentIconContainer: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  paymentIcon: { width: 32, height: 32, borderRadius: 8 },
  paymentTitle: { fontSize: 15, fontWeight: 'bold' },
  paymentSub: { fontSize: 12, color: '#888', marginTop: 2 },

  // Promo Card
  promoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9F6',
    padding: 16,
    borderRadius: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#FFEFE6',
  },
  promoText: { flex: 1, marginLeft: 12, fontSize: 14, fontWeight: '500' },

  // Summary Section
  summarySection: { marginTop: 20, marginBottom: 40 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  summaryLabel: { color: '#777', fontSize: 15 },
  summaryValue: { fontSize: 15, fontWeight: '500' },
  totalLabel: { fontSize: 18, fontWeight: 'bold' },
  totalValue: { fontSize: 22, fontWeight: 'bold', color: '#F26522' },
  
  deliveryNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    gap: 6,
  },
  deliveryNoteText: { fontSize: 12, color: '#888' },

  // Footer Button
  footer: { padding: 16, borderTopWidth: 1, borderTopColor: '#EEE', paddingBottom: 40 },
  submitBtn: {
    backgroundColor: '#F26522',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#F26522',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  submitBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  emptyAddressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9F6',
    padding: 20,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#F26522',
    borderStyle: 'dashed', // Tạo đường viền nét đứt
    marginBottom: 24,
  },
  addressIconBgEmpty: { 
    backgroundColor: '#fff', 
    padding: 12, 
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addAddressTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#F26522' 
  },
  addAddressSub: { 
    fontSize: 12, 
    color: '#D3764C', 
    marginTop: 4 
  },
  submitBtnDisabled: {
    backgroundColor: '#FFA375', // Màu nhạt khi chưa đủ điều kiện đặt hàng
  },


  formContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  inputWrapper: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    marginLeft: 4,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: '#000',
  },
  textArea: {
    height: 100,
    alignItems: 'flex-start',
    paddingTop: 16,
  },
  defaultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 16,
    marginTop: 10,
  },
  defaultTextTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  defaultTextSub: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  saveBtn: {
    backgroundColor: '#F26522',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    elevation: 4,
    shadowColor: '#F26522',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveBtnDisabled: {
    backgroundColor: '#FFD5C2', // Màu cam nhạt
    elevation: 0,
    shadowOpacity: 0,
  },
  saveBtnTextDisabled: {
    color: 'rgba(255, 255, 255, 0.8)',
  },



  markerFixed: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -20,
    marginTop: -40,
  },
  mapFooter: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  confirmMapBtn: {
    backgroundColor: '#F26522',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center'
  },
  cancelMapBtn: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    width: 80,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd'
  },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', backgroundColor: '#fff', padding: 20, borderRadius: 15, alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  modalText: { fontSize: 16, textAlign: 'center', marginBottom: 25, color: '#333' },
  modalButtons: { flexDirection: 'row', width: '100%', justifyContent: 'space-between' },
  btn: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  cancelBtn: { backgroundColor: '#f0f0f0', marginRight: 10 },
  confirmBtn: { backgroundColor: '#F26522' },
  cancelText: { fontWeight: 'bold', color: '#333' },
  confirmText: { fontWeight: 'bold', color: '#fff' }
});