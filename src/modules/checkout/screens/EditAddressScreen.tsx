import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Switch,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ActivityIndicator
} from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { CheckoutStyles } from '../css/CheckOutStyles';
import { router } from 'expo-router';
import useGetAddressDetail from "../hooks/useGetAddressDetail";
import useUpdateAddress from "../hooks/useUpdateAddress";
import Toast from 'react-native-toast-message';
import MapView, { Marker } from 'react-native-maps';
import Constants from 'expo-constants';

const GOONG_API_KEY = Constants.expoConfig?.extra?.apiGetMapKey;

type EditProps = {
  addressId?: string
}

export default function EditAddressScreen({ addressId }: EditProps) {
  const { data, isPending: loadingDetail } = useGetAddressDetail(addressId);
  const { mutate: updateAddress, isPending: updatePending } = useUpdateAddress();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  const [showMap, setShowMap] = useState(false);
  const [pickedLocation, setPickedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const searchTimeout = useRef<any>(null);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (data?.data) {
      const detail = data.data;
      setName(detail.name || '');
      setPhone(detail.phone || '');
      setAddress(detail.address || '');
      setIsDefault(detail.isDefault || false);
    }
  }, [data]);

  const isFormValid = name.trim() !== '' && phone.trim().length >= 10 && address.trim() !== '';

  const handleSave = () => {
    if (!isFormValid) return;

    updateAddress({
      addressId,
      name,
      phone,
      address,
      isDefault
    }, {
      onSuccess: () => {
        Toast.show({ type: 'success', text1: 'Đã sửa địa chỉ!' });
        router.push("/(details)/addressTabs/ListAddressTabs");
      },
      onError: () => {
        Toast.show({
          type: 'error',
          text1: 'Thất bại',
          text2: 'Cập nhật địa chỉ thất bại'
        });
      }
    });
  };

  const openMap = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Toast.show({ type: 'error', text1: 'Không có quyền vị trí' });
      return;
    }

    setShowMap(true);

    if (address.trim() !== '') {
      try {
        const res = await fetch(
          `https://rsapi.goong.io/Geocode?address=${encodeURIComponent(address)}&api_key=${GOONG_API_KEY}`
        );
        const geoData = await res.json();
        if (geoData.results && geoData.results.length > 0) {
          const loc = geoData.results[0].geometry.location;
          setPickedLocation({ latitude: loc.lat, longitude: loc.lng });
          return;
        }
      } catch (e) {
        console.log("Geocoding error, falling back to current location");
      }
    }

    try {
      const current = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setPickedLocation({
        latitude: current.coords.latitude,
        longitude: current.coords.longitude,
      });
    } catch {
      setPickedLocation({ latitude: 10.8231, longitude: 106.6297 });
    }
  };

  const confirmLocation = async () => {
    if (!pickedLocation) {
      Toast.show({ type: 'info', text1: 'Chưa chọn vị trí' });
      return;
    }

    setLoadingSearch(true);
    try {
      const res = await fetch(
        `https://rsapi.goong.io/Geocode?latlng=${pickedLocation.latitude},${pickedLocation.longitude}&api_key=${GOONG_API_KEY}`
      );
      const resData = await res.json();

      if (resData.results && resData.results.length > 0) {
        setAddress(resData.results[0].formatted_address);
        setShowMap(false);
      } else {
        setAddress(`${pickedLocation.latitude.toFixed(6)}, ${pickedLocation.longitude.toFixed(6)}`);
        setShowMap(false);
      }
    } catch (e) {
      Toast.show({ type: 'error', text1: 'Không lấy được địa chỉ từ Goong' });
    } finally {
      setLoadingSearch(false);
    }
  };

  const searchLocation = async (text: string) => {
    setSearchText(text);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    if (text.length < 2) {
      setSearchResults([]);
      return;
    }

    setLoadingSearch(true);
    searchTimeout.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://rsapi.goong.io/Place/AutoComplete?api_key=${GOONG_API_KEY}&input=${encodeURIComponent(text)}`
        );
        const resData = await res.json();
        if (resData.status === 'OK') {
          setSearchResults(resData.predictions);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingSearch(false);
      }
    }, 500);
  };

  const selectSearchResult = async (item: any) => {
    setLoadingSearch(true);
    try {
      const res = await fetch(
        `https://rsapi.goong.io/Place/Detail?place_id=${item.place_id}&api_key=${GOONG_API_KEY}`
      );
      const resData = await res.json();
      
      if (resData.status === 'OK') {
        const location = resData.result.geometry.location;
        const newCoords = { latitude: location.lat, longitude: location.lng };
        
        setPickedLocation(newCoords);
        setSearchText(item.description);
        setSearchResults([]);

        mapRef.current?.animateToRegion({
          ...newCoords,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSearch(false);
    }
  };

  const clearSearch = () => {
    setSearchText('');
    setSearchResults([]);
  };

  if (loadingDetail) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#F26522" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: '#fff' }}
    >
      <ScrollView style={CheckoutStyles.formContainer}>
        <View style={CheckoutStyles.inputWrapper}>
          <Text style={CheckoutStyles.inputLabel}>Họ và tên</Text>
          <View style={CheckoutStyles.inputBox}>
            <Ionicons name="person-outline" size={20} color="#F26522" />
            <TextInput 
              style={CheckoutStyles.input}
              placeholder="Nhập tên người nhận"
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>

        <View style={CheckoutStyles.inputWrapper}>
          <Text style={CheckoutStyles.inputLabel}>Số điện thoại</Text>
          <View style={CheckoutStyles.inputBox}>
            <Ionicons name="call-outline" size={20} color="#F26522" />
            <TextInput 
              style={CheckoutStyles.input}
              placeholder="Nhập số điện thoại"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              maxLength={11}
            />
          </View>
        </View>

        <View style={CheckoutStyles.inputWrapper}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={CheckoutStyles.inputLabel}>Địa chỉ giao hàng</Text>
            <TouchableOpacity onPress={openMap}>
              <Text style={{ color: '#F26522', fontSize: 12, fontWeight: '600' }}>
                <Ionicons name="map-outline" size={12} /> Chọn trên bản đồ
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[CheckoutStyles.inputBox, CheckoutStyles.textArea]}>
            <Ionicons name="location-outline" size={20} color="#F26522" style={{ marginTop: 2 }} />
            <TextInput 
              style={[CheckoutStyles.input, { textAlignVertical: 'top' }]}
              placeholder="Số nhà, tên đường, phường, quận..."
              multiline
              numberOfLines={4}
              value={address}
              onChangeText={setAddress}
            />
          </View>
        </View>

        <View style={CheckoutStyles.defaultRow}>
          <View>
            <Text style={CheckoutStyles.defaultTextTitle}>Đặt làm mặc định</Text>
            <Text style={CheckoutStyles.defaultTextSub}>Sử dụng cho các lần mua hàng sau</Text>
          </View>
          <Switch 
            trackColor={{ false: "#DDD", true: "#FFD5C2" }}
            thumbColor={isDefault ? "#F26522" : "#F4F3F4"}
            onValueChange={setIsDefault}
            value={isDefault}
          />
        </View>

        <TouchableOpacity 
          style={[
            CheckoutStyles.saveBtn, 
            (!isFormValid || updatePending) && CheckoutStyles.saveBtnDisabled
          ]} 
          onPress={handleSave}
          disabled={!isFormValid || updatePending}
          activeOpacity={0.7}
        >
          <Text style={CheckoutStyles.saveBtnText}>
            {updatePending ? 'Đang lưu...' : 'Lưu chỉnh sửa'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={showMap} animationType="slide">
        <View style={{ flex: 1 }}>
          <View style={{
            position: 'absolute',
            top: Platform.OS === 'ios' ? 50 : 20,
            left: 16, right: 16, zIndex: 10,
            backgroundColor: '#fff', borderRadius: 8, padding: 8,
            elevation: 5, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 4,
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="search-outline" size={18} color="#999" style={{ marginRight: 8 }} />
              <TextInput
                style={{ flex: 1, height: 40 }}
                placeholder="Tìm địa điểm ..."
                value={searchText}
                onChangeText={searchLocation}
              />
              {loadingSearch && <ActivityIndicator size="small" color="#F26522" style={{ marginRight: 8 }} />}
              {searchText.length > 0 && (
                <TouchableOpacity onPress={clearSearch}>
                  <Ionicons name="close-circle" size={20} color="#ccc" />
                </TouchableOpacity>
              )}
            </View>

            {searchResults.length > 0 && (
              <View style={{ marginTop: 8, borderTopWidth: 1, borderTopColor: '#eee', maxHeight: 300 }}>
                <ScrollView keyboardShouldPersistTaps="handled">
                  {searchResults.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => selectSearchResult(item)}
                      style={{ paddingVertical: 12, borderBottomWidth: 0.5, borderBottomColor: '#eee', flexDirection: 'row', alignItems: 'center' }}
                    >
                      <Ionicons name="location-sharp" size={16} color="#F26522" style={{ marginRight: 8 }} />
                      <Text numberOfLines={2} style={{ fontSize: 13, flex: 1 }}>{item.description}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          <View style={{ flex: 1 }}>
            {pickedLocation && (
              <MapView
                ref={mapRef}
                style={{ flex: 1 }}
                initialRegion={{
                  latitude: pickedLocation.latitude,
                  longitude: pickedLocation.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                onPress={(e) => setPickedLocation(e.nativeEvent.coordinate)}
              >
                <Marker coordinate={pickedLocation} />
              </MapView>
            )}

            <View style={CheckoutStyles.mapFooter}>
              <TouchableOpacity style={CheckoutStyles.cancelMapBtn} onPress={() => setShowMap(false)}>
                <Text>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={CheckoutStyles.confirmMapBtn} onPress={confirmLocation}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Xác nhận vị trí</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}