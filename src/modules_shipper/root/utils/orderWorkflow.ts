export type ShipperOrderStatus =
  | "assigned" | "confirmed" | "processing" | "shipping"
  | "pending_cancel" | "cancelled" | "delivered" | "completed";

export type ShipperNextStatus = "confirmed" | "shipping" | "delivered";

export type ShipperStatusConfig = {
  text: string;
  next: ShipperNextStatus | null;
  color: string;
  label: string;
};

const configs: Record<ShipperOrderStatus, ShipperStatusConfig> = {
  assigned: { text: "XÁC NHẬN ĐƠN", next: "confirmed", color: "#FF8C00", label: "Chờ xác nhận" },
  confirmed: { text: "ĐÃ LẤY HÀNG", next: "shipping", color: "#007AFF", label: "Đang lấy hàng" },
  processing: { text: "ĐÃ LẤY HÀNG", next: "shipping", color: "#007AFF", label: "Đang chuẩn bị hàng" },
  shipping: { text: "HOÀN THÀNH", next: "delivered", color: "#28a745", label: "Đang giao hàng" },
  pending_cancel: { text: "ĐANG CHỜ HỦY", next: null, color: "#6c757d", label: "Yêu cầu hủy" },
  cancelled: { text: "ĐƠN ĐÃ HỦY", next: null, color: "#dc3545", label: "Đã hủy" },
  delivered: { text: "ĐÃ GIAO HÀNG", next: null, color: "#333", label: "Đã hoàn tất" },
  completed: { text: "ĐÃ GIAO HÀNG", next: null, color: "#333", label: "Đã hoàn tất" },
};

export const getShipperStatusConfig = (status?: string): ShipperStatusConfig =>
  configs[status as ShipperOrderStatus] || {
    text: "KIỂM TRA LẠI", next: null, color: "#999", label: "Không xác định",
  };
