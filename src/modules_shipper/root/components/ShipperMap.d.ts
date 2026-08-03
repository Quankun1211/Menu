import type React from "react";

export type ShipperMapHandle = {
  animateToRegion: (region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }, duration?: number) => void;
};

declare const ShipperMap: React.ForwardRefExoticComponent<{
  latitude?: number;
  longitude?: number;
  visible: boolean;
} & React.RefAttributes<ShipperMapHandle>>;

export default ShipperMap;
