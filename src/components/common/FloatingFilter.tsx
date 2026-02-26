import React from 'react';
import { StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const BUTTON_SIZE = 56;
const SIDE_PADDING = 20;

const TOP_BOUNDARY = Platform.OS === 'ios' ? 100 : 50; 
const BOTTOM_BOUNDARY = Platform.OS === 'ios' ? 120 : 100;

export default function FloatingFilter({ onPress }: { onPress: () => void }) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const context = useSharedValue({ x: 0, y: 0 });

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { x: translateX.value, y: translateY.value };
    })
    .onUpdate((event) => {
      translateX.value = event.translationX + context.value.x;
      const newY = event.translationY + context.value.y;
      const limitTop = -(SCREEN_HEIGHT - BOTTOM_BOUNDARY - TOP_BOUNDARY - BUTTON_SIZE);
      const limitBottom = 20; 

      translateY.value = Math.max(limitTop, Math.min(newY, limitBottom));
    })
    .onEnd(() => {
      const threshold = -(SCREEN_WIDTH / 2 - BUTTON_SIZE / 2 - SIDE_PADDING);
      const targetX = translateX.value > threshold ? 0 : -(SCREEN_WIDTH - BUTTON_SIZE - SIDE_PADDING * 2);
      
      translateX.value = withSpring(targetX);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.filterBall, animatedStyle]}>
        <TouchableOpacity onPress={onPress} style={styles.button} activeOpacity={0.8}>
          <Ionicons name="options" size={26} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  filterBall: {
    position: 'absolute',
    bottom: 100, 
    right: SIDE_PADDING,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: '#F26522',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: 9999,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});