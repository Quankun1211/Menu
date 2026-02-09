import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const ResetPasswordStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  input: {
    width: '100%',
    height: 56,
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 16,
  },
  btn: {
    width: '100%',
    height: 56,
    backgroundColor: '#E25822', // Màu cam đồng bộ với các màn hình trước
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    // Đổ bóng cho nút bấm
    shadowColor: '#E25822',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
  // Nếu bạn muốn hiển thị thông báo lỗi nhỏ dưới input
  errorText: {
    color: '#FF4D4F',
    fontSize: 13,
    marginBottom: 10,
    marginLeft: 5,
  }
});