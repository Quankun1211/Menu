import { TouchableOpacity, Text } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { ExploreStyles } from "../css/ExploreStyles"

interface CategoryItemProps {
  item: {
    _id: string;
    name: string;
  }
  isActive: boolean;
  onPress: (id: string) => void;
}

export default function CategoryItem({ item, isActive, onPress }: CategoryItemProps) {
  return (
    <TouchableOpacity
      onPress={() => onPress(item._id)}
      style={[
        ExploreStyles.chip,
        isActive ? ExploreStyles.activeChip : ExploreStyles.inactiveChip
      ]}
      activeOpacity={0.7}
    >
      <Text style={[
        ExploreStyles.chipText,
        isActive ? ExploreStyles.activeChipText : ExploreStyles.inactiveChipText
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  )
}