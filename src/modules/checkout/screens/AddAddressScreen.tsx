import React, { useState, useRef } from 'react';
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
import useAddAddress from '../hooks/useAddAddress';
import Toast from 'react-native-toast-message';
import MapView, { Marker } from 'react-native-maps';

export default function AddAddressScreen() {
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

  const isFormValid =
    name.trim() !== '' &&
    phone.trim().length >= 10 &&
    address.trim() !== '';

  const { mutate: addAddress, isPending } = useAddAddress();

  const handleSave = () => {
    if (!isFormValid) return;

    addAddress(
      { name, phone, address, isDefault },
      {
        onSuccess: () => {
          Toast.show({ type: 'success', text1: 'Đã thêm địa chỉ' });
          router.push('/(details)/addressTabs/ListAddressTabs');
        },
        onError: () => {
          Toast.show({
            type: 'error',
            text1: 'Thất bại',
            text2: 'Thêm địa chỉ thất bại',
          });
        },
      }
    );
  };

  const openMap = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Toast.show({ type: 'error', text1: 'Không có quyền vị trí' });
      return;
    }

    setShowMap(true);

    try {
      const current = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setPickedLocation({
        latitude: current.coords.latitude,
        longitude: current.coords.longitude,
      });
    } catch {
      setPickedLocation({
        latitude: 10.8231,
        longitude: 106.6297,
      });
    }
  };

  const confirmLocation = async () => {
    if (!pickedLocation) {
      Toast.show({ type: 'info', text1: 'Chưa chọn vị trí' });
      return;
    }

    try {
      const res = await Location.reverseGeocodeAsync({
        latitude: pickedLocation.latitude,
        longitude: pickedLocation.longitude,
      });

      if (res.length > 0) {
        const i = res[0];
        const parts = [
          i.name,
          i.street,
          i.district,
          i.city,
          i.region,
        ].filter(Boolean); 

        if (parts.length > 0) {
          setAddress(parts.join(', '));
        } else {
          setAddress(
            `${pickedLocation.latitude.toFixed(6)}, ${pickedLocation.longitude.toFixed(6)}`
          );
        }
      }

      setShowMap(false);
    } catch (e) {
      Toast.show({ type: 'error', text1: 'Không lấy được địa chỉ' });
    }
  };

  const searchLocation = async (text: string) => {
    setSearchText(text);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (text.length < 2) { // Giảm xuống 2 ký tự để nhạy hơn
      setSearchResults([]);
      setLoadingSearch(false);
      return;
    }

    setLoadingSearch(true);
    searchTimeout.current = setTimeout(async () => {
      try {
        // Tọa độ bao quanh Việt Nam để thu hẹp phạm vi tìm kiếm
        const viewbox = '102.14,23.39,109.46,8.18'; 
        
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?` +
            `q=${encodeURIComponent(text)}` +
            `&format=json` +
            `&limit=15` + // Tăng giới hạn lên 15 kết quả
            `&countrycodes=vn` + // Chỉ tìm ở VN
            `&viewbox=${viewbox}` + 
            `&addressdetails=1` +
            `&accept-language=vi`, // Ép trả về tiếng Việt
          {
            headers: {
              'User-Agent': 'expo-app-contact-your-email@domain.com', // Nên để email để tránh bị block request
            },
          }
        );

        const data = await res.json();
        setSearchResults(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingSearch(false);
      }
    }, 500); // Giảm debounce xuống 500ms để cảm giác phản hồi nhanh hơn
  };

  const clearSearch = () => {
    setSearchText('');
    setSearchResults([]);
    setLoadingSearch(false);
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
  };

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
            <Ionicons
              name="location-outline"
              size={20}
              color="#F26522"
              style={{ marginTop: 2 }}
            />
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
            <Text style={CheckoutStyles.defaultTextSub}>
              Sử dụng cho các lần mua hàng sau
            </Text>
          </View>
          <Switch
            value={isDefault}
            onValueChange={setIsDefault}
            trackColor={{ false: '#DDD', true: '#FFD5C2' }}
            thumbColor={isDefault ? '#F26522' : '#F4F3F4'}
          />
        </View>

        <TouchableOpacity
          style={[
            CheckoutStyles.saveBtn,
            (!isFormValid || isPending) && CheckoutStyles.saveBtnDisabled,
          ]}
          onPress={handleSave}
          disabled={!isFormValid || isPending}
        >
          <Text style={CheckoutStyles.saveBtnText}>
            {isPending ? 'Đang lưu...' : 'Lưu địa chỉ'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={showMap} animationType="slide">
        <View style={{ flex: 1 }}>
          <View
            style={{
              position: 'absolute',
              top: Platform.OS === 'ios' ? 50 : 20,
              left: 16,
              right: 16,
              zIndex: 10,
              backgroundColor: '#fff',
              borderRadius: 8,
              padding: 8,
              elevation: 5,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="search-outline" size={18} color="#999" style={{ marginRight: 8 }} />
              <TextInput
                style={{ flex: 1, height: 40 }}
                placeholder="Tìm địa điểm (VD: Vincom, Bách Khoa...)"
                value={searchText}
                onChangeText={searchLocation}
              />
              {loadingSearch && (
                <ActivityIndicator size="small" color="#F26522" style={{ marginRight: 8 }} />
              )}
              {searchText.length > 0 && (
                <TouchableOpacity onPress={clearSearch}>
                  <Ionicons name="close-circle" size={20} color="#ccc" />
                </TouchableOpacity>
              )}
            </View>

            {searchResults.length > 0 && (
              <View style={{ marginTop: 8, borderTopWidth: 1, borderTopColor: '#eee' }}>
                {searchResults.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setPickedLocation({
                        latitude: parseFloat(item.lat),
                        longitude: parseFloat(item.lon),
                      });
                      setSearchText(item.display_name);
                      setAddress(item.display_name);
                      setSearchResults([]);
                    }}
                    style={{ paddingVertical: 10, borderBottomWidth: index === searchResults.length - 1 ? 0 : 0.5, borderBottomColor: '#eee' }}
                  >
                    <Text numberOfLines={2} style={{ fontSize: 13 }}>{item.display_name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View style={{ flex: 1 }}>
            {pickedLocation && (
              <MapView
                style={{ flex: 1 }}
                region={{
                  latitude: pickedLocation.latitude,
                  longitude: pickedLocation.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                onPress={(e) => {
                  setPickedLocation(e.nativeEvent.coordinate);
                }}
              >
                <Marker coordinate={pickedLocation} />
              </MapView>
            )}

            <View style={CheckoutStyles.mapFooter}>
              <TouchableOpacity
                style={CheckoutStyles.cancelMapBtn}
                onPress={() => setShowMap(false)}
              >
                <Text>Hủy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={CheckoutStyles.confirmMapBtn}
                onPress={confirmLocation}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                  Xác nhận vị trí
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}