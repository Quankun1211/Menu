import { TouchableOpacity, View, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import { AppTheme } from '@/constants/theme';

const CustomTabBarButton = ({ children, onPress }: any) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.customButtonInner}
      onPress={(event) => {
        Haptics.selectionAsync();
        onPress?.(event);
      }}
      activeOpacity={0.9}
    >
      <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 3 }}>
        {children}
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  customButtonInner: {
    top: -17,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: AppTheme.colors.primary,
    borderWidth: 4,
    borderColor: AppTheme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: AppTheme.colors.brown,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 7,
  },
});

export default CustomTabBarButton
