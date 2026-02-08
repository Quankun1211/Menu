import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const PaymentPreview = () => {
  const params = useLocalSearchParams();
  const url = Array.isArray(params.url) ? params.url[0] : params.url;

  const [isLoading, setIsLoading] = useState(true);

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    const { url: currentUrl } = navState;
    if (!currentUrl) return;

    // Log để bạn dễ debug xem URL cuối cùng trả về là gì
    console.log("Navigating to:", currentUrl);

    // Kiểm tra nếu URL chứa các từ khóa báo hiệu kết thúc thanh toán từ Backend của bạn
    const isReturn = currentUrl.includes('vnpay-return');
    const isSuccess = currentUrl.includes('vnp_ResponseCode=00');
    const isCancel = currentUrl.includes('vnp_ResponseCode=24'); // Mã 24 là người dùng hủy

    if (isReturn) {
      if (isSuccess) {
        Toast.show({
          type: 'success',
          text1: 'Thanh toán thành công',
          text2: 'Đơn hàng của bạn đang được xử lý'
        });
        // Dùng replace để khách không bấm back quay lại trang thanh toán được
        router.replace("/(tabs)/order");
      } else {
        const message = isCancel ? 'Bạn đã hủy thanh toán' : 'Giao dịch không thành công';
        Toast.show({
          type: 'error',
          text1: 'Thông báo',
          text2: message
        });
        router.back();
      }
    }
  };

  if (!url) {
    return (
      <View style={styles.errorContainer}>
        <ActivityIndicator size="large" color="#F26522" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <WebView
        source={{ uri: url }}
        onNavigationStateChange={handleNavigationStateChange}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        // Tránh việc bị cache trang cũ
        cacheEnabled={false}
        // Cho phép các link ngân hàng mở app mobile ngân hàng nếu có
        originWhitelist={['*']}
      />
      
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#F26522" />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  errorContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
});

export default PaymentPreview;