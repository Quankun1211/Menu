import { StyleSheet } from "react-native";

export const OrderItemStyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA', padding: 16 },
  statusBanner: {
    backgroundColor: '#FFEDE3',
    padding: 20,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFDCC9'
  },
  bannerTitle: { fontSize: 20, fontWeight: 'bold', color: '#F26522' },
  bannerSub: { color: '#888', marginTop: 4, paddingRight: 10 },
  bikeIconBg: { backgroundColor: '#fff', padding: 10, borderRadius: 25 },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10},
  stepContainer: { flexDirection: 'row', height: 60 },
  stepLeft: { alignItems: 'center', width: 30, marginRight: 15 },
  iconCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center', zIndex: 1 },
  activeCircle: { backgroundColor: '#FFEDE3' },
  line: { width: 2, flex: 1, backgroundColor: '#EEE', marginVertical: -5 },
  activeLine: { backgroundColor: '#F26522' },
  stepTitle: { fontSize: 14, color: '#333' },
  stepTime: { fontSize: 12, color: '#999' },
  stepSubtitle: { fontSize: 12, color: '#F26522' },
  locationCircle: { backgroundColor: '#E8F5E9', padding: 8, borderRadius: 12 },
  mapSnippet: { width: '100%', height: 200, borderRadius: 16, marginTop: 10 },
  productRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  productImg: { width: 80, height: 80, borderRadius: 25 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  totalLabel: { fontSize: 18, fontWeight: 'bold' },
  totalPrice: { fontSize: 18, fontWeight: 'bold', color: '#F26522' },
  paymentMethod: { 
    flexDirection: 'row', 
    backgroundColor: '#F8F9FA', 
    padding: 12, 
    borderRadius: 12, 
    alignItems: 'center',
    marginTop: 15
  },
  stepRight: { 
    flex: 1, 
    paddingBottom: 20 
  },
  paymentText: { flex: 1, marginLeft: 10, fontSize: 13 },
  paidText: { color: '#4CAF50', fontWeight: 'bold', fontSize: 12 },
  tagGreen: { backgroundColor: '#E8F5E9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  tagText: { color: '#4CAF50', fontSize: 10, fontWeight: 'bold' },
addressType: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
  },
  addressText: {
    fontSize: 13,
    color: '#777',
    lineHeight: 18,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10
  },
  productName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  productUnit: {
    fontSize: 13,
    color: '#999',
  },
  productPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#F26522',
  },

  // Bổ sung cho phần Payment Summary nếu cần
  summaryText: {
    fontSize: 14,
    color: '#555',
  },
  summaryValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  shippingCard: {
  backgroundColor: '#fff',
  borderRadius: 24,
  marginBottom: 16,
  overflow: 'hidden',
  elevation: 3,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  },
  mapHeader: {
    width: '100%',
    height: 120,
    position: 'relative',
  },
  timeTag: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  timeTagText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  shippingBody: {
    padding: 16,
  },
  statusHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  shippingStatusText: {
    color: '#32CD32',
    fontWeight: 'bold',
    fontSize: 13,
    textTransform: 'uppercase',
  },
  shippingOrderCode: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  bikeIconCircle: {
    backgroundColor: '#F0FFF0',
    padding: 8,
    borderRadius: 20,
  },
  progressBarContainer: {
    marginTop: 20,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#EEE',
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressActive: {
    height: 6,
    backgroundColor: '#32CD32',
    borderRadius: 3,
    width: '60%', // Giả lập shipper đi được 60%
  },
  bikeMarker: {
    position: 'absolute',
    left: '55%', // Căn chỉnh icon trùng với đầu thanh tiến trình
    backgroundColor: '#32CD32',
    padding: 4,
    borderRadius: 12,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  progressLabelText: {
    fontSize: 10,
    color: '#999',
    fontWeight: 'bold',
  },
  addressMiniCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 16,
    marginTop: 16,
  },
  addressInfo: {
    marginLeft: 12,
    flex: 1,
  },
  addressMain: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  addressSub: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  followBtn: {
    backgroundColor: '#F26522',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 25,
  },
  followBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})