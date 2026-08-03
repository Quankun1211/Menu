import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { DashboardStyles } from "../css/DashboardStyles";

export type ShipperMapHandle = { animateToRegion: (region: any, duration?: number) => void };
type Props = { latitude?: number; longitude?: number; visible: boolean };

const ShipperMap = forwardRef<ShipperMapHandle, Props>(({ latitude, longitude, visible }, ref) => {
  const mapRef = useRef<MapView>(null);
  useImperativeHandle(ref, () => ({
    animateToRegion: (region, duration) => mapRef.current?.animateToRegion(region, duration),
  }));
  if (!visible) return null;
  return <MapView ref={mapRef} style={StyleSheet.absoluteFill} provider={PROVIDER_GOOGLE} initialRegion={{ latitude: latitude || 10.762622, longitude: longitude || 106.660172, latitudeDelta: 0.01, longitudeDelta: 0.01 }}>
    {latitude != null && longitude != null && <Marker coordinate={{ latitude, longitude }}><View style={DashboardStyles.shipperMarker}><View style={DashboardStyles.shipperDot}/></View></Marker>}
  </MapView>;
});
ShipperMap.displayName = "ShipperMap";
export default ShipperMap;
