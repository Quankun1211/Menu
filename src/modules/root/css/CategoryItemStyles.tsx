import { StyleSheet } from "react-native";
const RADIUS = 26;
export const CategoryItemStyles = StyleSheet.create({
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  categoryCard: {
    width: '48%',
    height: 120,
    marginBottom: 15,
    borderRadius: RADIUS,
    overflow: 'hidden',   // 🔥 cắt tuyệt đối
    backgroundColor: 'transparent', // ❌ KHÔNG để trắng
  },

  categoryImg: {
    flex: 1,
  },

  imageRadius: {
    borderRadius: RADIUS, // 🔥 FIX VIỀN TRẮNG
  },

  categoryText: {
    position: 'absolute',
    left: 14,
    bottom: 12,
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
  },
});
