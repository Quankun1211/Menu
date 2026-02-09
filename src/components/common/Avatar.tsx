import { Image, View } from 'react-native';

const UserAvatar = ({ avatarUrl }: { avatarUrl: string }) => {
  
  return (
    <View style={{ flex: 1, backgroundColor: '#EEE' }}>
      <Image 
        source={{ uri: avatarUrl || 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }} 
        style={{ width: '100%', height: '100%' }}
        resizeMode="cover"
      />
    </View>
  );
};
;
export default UserAvatar;