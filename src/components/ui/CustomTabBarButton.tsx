import { TouchableOpacity, View, StyleSheet } from 'react-native';

const CustomTabBarButton = ({ children, onPress }: any) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.customButtonInner}
      onPress={onPress}
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
    top: -20, 
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F26522',
    borderWidth: 4,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default CustomTabBarButton