import React, { forwardRef, useImperativeHandle } from "react";
import { Text, View } from "react-native";

const MapView = forwardRef<any, any>(({ children, style }, ref) => {
  useImperativeHandle(ref, () => ({
    animateToRegion: () => undefined,
    fitToCoordinates: () => undefined,
  }));
  return <View style={[{ minHeight: 180, alignItems: "center", justifyContent: "center", backgroundColor: "#E8F0E8", overflow: "hidden" }, style]}>
    <Text style={{ color: "#5C4033", fontWeight: "600" }}>Bản đồ khả dụng trên ứng dụng di động</Text>
    {children}
  </View>;
});
MapView.displayName = "WebMapView";

export const Marker = ({ children }: any) => <>{children}</>;
export const Polyline = () => null;
export const PROVIDER_GOOGLE = "google";
export default MapView;
