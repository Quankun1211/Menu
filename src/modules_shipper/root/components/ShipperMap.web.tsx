import React, { forwardRef, useImperativeHandle } from "react";
import { Text, View } from "react-native";

export type ShipperMapHandle = { animateToRegion: (region: any, duration?: number) => void };
type Props = { latitude?: number; longitude?: number; visible: boolean };

const ShipperMap = forwardRef<ShipperMapHandle, Props>(({ latitude, longitude, visible }, ref) => {
  useImperativeHandle(ref, () => ({ animateToRegion: () => undefined }));
  if (!visible) return null;
  return <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#E8F0E8" }}>
    <Text style={{ color: "#5C4033", fontWeight: "600" }}>Bản đồ shipper chỉ hiển thị trên ứng dụng di động</Text>
    {latitude != null && longitude != null && <Text style={{ color: "#806A5C", marginTop: 6 }}>{latitude.toFixed(5)}, {longitude.toFixed(5)}</Text>}
  </View>;
});
ShipperMap.displayName = "ShipperMap";
export default ShipperMap;
