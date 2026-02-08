import useGetAddressDetail from "../hooks/useGetAddressDetail";
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Switch,
  KeyboardAvoidingView,
  Platform 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CheckoutStyles } from '../css/CheckOutStyles';
import { router } from 'expo-router';
import useUpdateAddress from "../hooks/useUpdateAddress";
import Toast from 'react-native-toast-message';
type EditProps = {
    addressId?: string
}
export default function EditAddressScreen({addressId} : EditProps) {
    const {data, isPending} = useGetAddressDetail(addressId)

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [isDefault, setIsDefault] = useState(false);
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
    const { mutate: updateAddress, isPending: updatePending } = useUpdateAddress()
    const handleSave = () => {
        if (isFormValid) {
          updateAddress({
            addressId,
            name,
            phone,
            address,
            isDefault
          }, {
              onSuccess: () => {
                  Toast.show({
                      type: 'success',
                      text1: 'Đã sửa địa chỉ!'
                  });
              },
              onError: () => {
                  Toast.show({
                      type: 'error',
                      text1: 'Thất bại',
                      text2: 'Thêm địa chỉ thất bại'
                  });
              }
          })
          router.push("/(tabs)/addressTabs/ListAddressTabs");
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
          <Text style={CheckoutStyles.inputLabel}>Địa chỉ giao hàng</Text>
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
            onValueChange={() => setIsDefault(!isDefault)}
            value={isDefault}
          />
        </View>

        <TouchableOpacity 
          style={[
            CheckoutStyles.saveBtn, 
            !isFormValid && CheckoutStyles.saveBtnDisabled
          ]} 
          onPress={handleSave}
          disabled={!isFormValid}
          activeOpacity={0.7}
        >
          <Text style={[
            CheckoutStyles.saveBtnText,
            !isFormValid && CheckoutStyles.saveBtnTextDisabled
          ]}>
            Lưu chỉnh sửa
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}