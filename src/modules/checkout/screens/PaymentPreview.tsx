import React, { useRef, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { WebView, WebViewNavigation } from "react-native-webview";
import { useLocalSearchParams, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import api from "@/services/axios";

const PaymentPreview = () => {
  const params = useLocalSearchParams();
  const url = Array.isArray(params.url) ? params.url[0] : params.url;
  const routeOrderId = Array.isArray(params.orderId)
    ? params.orderId[0]
    : params.orderId;
  const [isLoading, setIsLoading] = useState(true);
  const handledRef = useRef(false);
  const confirmingRef = useRef(false);
  const orderId = url?.match(/[?&]vnp_TxnRef=([^&]+)/)?.[1];

  const showSuccess = (detail: string) => {
    handledRef.current = true;
    Toast.show({
      type: "success",
      text1: "Thanh toán thành công",
      text2: detail,
    });
    router.replace("/(tabs)/order");
  };

  const handleNavigationStateChange = async (navState: WebViewNavigation) => {
    const currentUrl = navState.url;
    if (!currentUrl || !currentUrl.includes("vnpay-return") || confirmingRef.current) {
      return;
    }

    confirmingRef.current = true;
    const queryString = currentUrl.split("?")[1] || "";
    const callbackParams = Object.fromEntries(new URLSearchParams(queryString).entries());
    const callbackOrderId = callbackParams.vnp_TxnRef || orderId;
    const isSuccess = callbackParams.vnp_ResponseCode === "00";
    const isCancelled = callbackParams.vnp_ResponseCode === "24";

    try {
      const response = await api.get("/orders/payment-confirmations/vnpay", {
        params: callbackParams,
      });
      if (response.data?.data?.paymentStatus !== "paid") {
        throw new Error("Backend chưa xác nhận thanh toán");
      }
      showSuccess("Đơn hàng của bạn đang được xử lý");
    } catch (error: any) {
      const actualOrderId =
        error?.data?.orderId ||
        error?.response?.data?.data?.orderId ||
        routeOrderId ||
        callbackOrderId;
      if (isSuccess && actualOrderId) {
        try {
          const reconciliation = await api.post(
            `/orders/${actualOrderId}/payment-reconciliations`,
          );
          if (reconciliation.data?.data?.paymentStatus === "paid") {
            showSuccess("Giao dịch đã được VNPay đối soát");
            return;
          }
        } catch {
          // Không tin kết quả trên trình duyệt nếu backend chưa xác nhận.
        }
      }

      handledRef.current = true;
      Toast.show({
        type: isCancelled ? "info" : "error",
        text1: isCancelled ? "Đã hủy thanh toán" : "Thanh toán không thành công",
        text2: isCancelled
          ? "Đơn hàng và tồn kho đang được cập nhật"
          : "Vui lòng kiểm tra lại trong danh sách đơn hàng",
      });
      router.back();
    } finally {
      confirmingRef.current = false;
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
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <WebView
        source={{ uri: url }}
        onNavigationStateChange={handleNavigationStateChange}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        cacheEnabled={false}
        originWhitelist={["*"]}
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
    backgroundColor: "#fff",
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PaymentPreview;
