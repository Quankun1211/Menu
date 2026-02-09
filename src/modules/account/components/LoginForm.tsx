import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SignUpStyle } from '../css/SignUpStyles';
import { useState } from 'react';
import { LogInRequest } from '../types/api-request';
import { Ionicons } from '@expo/vector-icons';
import { loginSchema } from '../schema/login.schema';
import { router } from "expo-router";

const LoginForm = ({
    onFinish,
    isLoading
}: {
    onFinish: (values: LogInRequest) => void,
    isLoading: boolean
}) => {
    const [errors, setErrors] = useState<
        Partial<Record<keyof LogInRequest, string>>
    >({});

    const [form, setForm] = useState<LogInRequest>({
        username: "",
        password: "",
    });

    const handleChange = (
        key: keyof LogInRequest,
        value: string
    ) => {
        setForm(prev => ({ ...prev, [key]: value }));
        if (errors[key]) {
            setErrors(prev => ({ ...prev, [key]: undefined }));
        }
    };

    const handleSubmit = () => {
        const result = loginSchema.safeParse(form);
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            setErrors({
                username: fieldErrors.username?.[0],
                password: fieldErrors.password?.[0],
            });
            return;
        }
        setErrors({});
        onFinish(result.data);
    };

    return (
        <View>
            <Text style={SignUpStyle.label}>Tên đăng nhập hoặc Email</Text>
            <View style={[
                SignUpStyle.inputContainer, 
                errors.username ? { borderColor: 'red' } : null
            ]}>
                <Ionicons name="person" size={20} color="#f49d71" style={SignUpStyle.icon} />
                <TextInput
                    style={SignUpStyle.inputField}
                    placeholder="Tên đăng nhập / Email của bạn"
                    placeholderTextColor="#90786b"
                    autoCapitalize="none"
                    value={form.username}
                    onChangeText={(v) => handleChange("username", v)}
                />
            </View>
            {errors.username && <Text style={SignUpStyle.errorText}>{errors.username}</Text>}

            <Text style={[SignUpStyle.label, { marginTop: 15 }]}>Mật khẩu</Text>
            <View style={[
                SignUpStyle.inputContainer, 
                errors.password ? { borderColor: 'red' } : null
            ]}>
                <Ionicons name="lock-closed" size={20} color="#f49d71" style={SignUpStyle.icon} />
                <TextInput
                    style={SignUpStyle.inputField}
                    placeholder="Nhập mật khẩu"
                    placeholderTextColor="#90786b"
                    secureTextEntry
                    value={form.password}
                    onChangeText={(v) => handleChange("password", v)}
                />
            </View>
            {errors.password && <Text style={SignUpStyle.errorText}>{errors.password}</Text>}

            <TouchableOpacity 
                onPress={() => router.push("/(auth)/forgot-password")}
                style={{ alignSelf: 'flex-end', marginTop: 10 }}
            >
                <Text style={{ color: '#E25822', fontWeight: '600', fontSize: 14 }}>
                    Quên mật khẩu?
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[SignUpStyle.button, { marginTop: 30 }, isLoading && { opacity: 0.7 }]}
                onPress={handleSubmit}
                disabled={isLoading}
            >
                <Text style={SignUpStyle.buttonText}>
                    {isLoading ? "Đang đăng nhập..." : "Đăng nhập →"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginForm;