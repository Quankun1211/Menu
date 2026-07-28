import { Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppTheme } from '@/constants/theme';

export default function AuthHomeButton() {
  const insets = useSafeAreaInsets();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Quay về trang chủ"
      hitSlop={8}
      onPress={() => router.replace('/(tabs)')}
      style={({ pressed }) => [
        styles.button,
        { top: Math.max(insets.top, 12) + 8 },
        pressed && styles.pressed,
      ]}
    >
      <Ionicons name="chevron-back" size={20} color={AppTheme.colors.brown} />
      <Text style={styles.label}>Trang chủ</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    left: 16,
    zIndex: 20,
    minHeight: 44,
    paddingHorizontal: 13,
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    shadowColor: AppTheme.colors.brown,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    elevation: 4,
  },
  label: {
    color: AppTheme.colors.brown,
    fontSize: 13,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.72,
    transform: [{ scale: 0.97 }],
  },
});
