import { View, TouchableOpacity, Text, Image } from "react-native";
import { CheckoutStyles } from "../css/CheckOutStyles";
import { Ionicons } from "@expo/vector-icons";
const PaymentOption = ({ id, title, sub, icon, selected, onPress, isIconComponent }: any) => (
    <TouchableOpacity 
      style={[CheckoutStyles.paymentCard, selected && CheckoutStyles.paymentCardSelected]} 
      onPress={onPress}
    >
      <View style={CheckoutStyles.paymentIconContainer}>
        {isIconComponent ? isIconComponent : <Image source={{ uri: icon }} style={CheckoutStyles.paymentIcon} />}
      </View>
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={CheckoutStyles.paymentTitle}>{title}</Text>
        <Text style={CheckoutStyles.paymentSub}>{sub}</Text>
      </View>
      <Ionicons 
        name={selected ? "radio-button-on" : "radio-button-off"} 
        size={22} 
        color={selected ? "#F26522" : "#DDD"} 
      />
    </TouchableOpacity>
);

export default PaymentOption