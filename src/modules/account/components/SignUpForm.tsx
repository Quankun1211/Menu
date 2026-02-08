import { View, Text, Pressable, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SignUpStyle } from '../css/SignUpStyles';
import { useState } from 'react';
import { registerSchema } from "../schema/register.schema";
import { RegisterRequest } from '../types/api-request';
import { Ionicons } from '@expo/vector-icons';
const SignUpForm = ({
    onFinish,
    isLoading
}: {
    onFinish: (values: RegisterRequest) => void,
    isLoading: boolean
}) => {
    const [errors, setErrors] = useState<
      Partial<Record<keyof RegisterRequest, string>>
    >({});

    const [form, setForm] = useState<RegisterRequest>({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (
        key: keyof RegisterRequest,
        value: string
    ) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
      const result = registerSchema.safeParse(form);

      if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;

        setErrors({
          name: fieldErrors.name?.[0],
          username: fieldErrors.username?.[0],
          email: fieldErrors.email?.[0],
          password: fieldErrors.password?.[0],
          confirmPassword: fieldErrors.confirmPassword?.[0],
        });
        return;
      }

      setErrors({});
      onFinish(result.data);
    };
    const inputError = (error?: string) => [
      SignUpStyle.input,
      error && { borderColor: "red", borderWidth: 1 },
    ];

return (
    <View>
      <Text style={SignUpStyle.label}>Họ và tên</Text>
      <View style={[SignUpStyle.inputContainer, errors.name && { borderColor: 'red' }]}>
        <Ionicons name="person" size={20} color="#f49d71" style={SignUpStyle.icon} />
        <TextInput
          style={SignUpStyle.inputField}
          placeholder="Nhập họ và tên của bạn"
          placeholderTextColor="#90786b"
          value={form.name}
          onChangeText={(v) => handleChange("name", v)}
        />
      </View>
      {errors.name && <Text style={SignUpStyle.errorText}>{errors.name}</Text>}

      <Text style={SignUpStyle.label}>Tên đăng nhập</Text>
      <View style={[SignUpStyle.inputContainer, errors.username && { borderColor: 'red' }]}>
        <Ionicons name="person" size={20} color="#f49d71" style={SignUpStyle.icon} />
        <TextInput
          style={SignUpStyle.inputField}
          placeholder="Nhập họ và tên của bạn"
          placeholderTextColor="#90786b"
          value={form.username}
          onChangeText={(v) => handleChange("username", v)}
        />
      </View>
      {errors.username && <Text style={SignUpStyle.errorText}>{errors.username}</Text>}

      <Text style={SignUpStyle.label}>Email</Text>
      <View style={[SignUpStyle.inputContainer, errors.email && { borderColor: 'red' }]}>
        <Ionicons name="mail" size={20} color="#f49d71" style={SignUpStyle.icon} />
        <TextInput
          style={SignUpStyle.inputField}
          placeholder="email@example.com"
          placeholderTextColor="#90786b"
          keyboardType="email-address"
          autoCapitalize="none"
          value={form.email}
          onChangeText={(v) => handleChange("email", v)}
          />
      </View>
      {errors.email && <Text style={SignUpStyle.errorText}>{errors.email}</Text>}

      <Text style={SignUpStyle.label}>Mật khẩu</Text>
      <View style={[SignUpStyle.inputContainer, errors.password && { borderColor: 'red' }]}>
        <Ionicons name="lock-closed" size={20} color="#f49d71" style={SignUpStyle.icon} />
        <TextInput
          style={SignUpStyle.inputField}
          placeholder="Tối thiểu 8 ký tự"
          placeholderTextColor="#90786b"
          secureTextEntry
          value={form.password}
          onChangeText={(v) => handleChange("password", v)}
        />
      </View>
      {errors.password && <Text style={SignUpStyle.errorText}>{errors.password}</Text>}

      <Text style={SignUpStyle.label}>Xác nhận mật khẩu</Text>
      <View style={[SignUpStyle.inputContainer, errors.confirmPassword && { borderColor: 'red' }]}>
        <Ionicons name="lock-closed" size={20} color="#f49d71" style={SignUpStyle.icon} />
        <TextInput
          style={SignUpStyle.inputField}
          placeholder="Tối thiểu 8 ký tự"
          placeholderTextColor="#90786b"
          secureTextEntry
          value={form.confirmPassword}
          onChangeText={(v) => handleChange("confirmPassword", v)}
        />
      </View>
      {errors.confirmPassword && <Text style={SignUpStyle.errorText}>{errors.confirmPassword}</Text>}

      <TouchableOpacity
        style={SignUpStyle.button}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        <Text style={SignUpStyle.buttonText}>
          {isLoading ? "Đang đăng ký..." : "Đăng ký ngay →"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpForm;
