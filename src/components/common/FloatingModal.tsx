import React, { useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, Platform, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const BUTTON_SIZE = 60;
const SIDE_PADDING = 20;

const SAFE_TOP = Platform.OS === 'ios' ? 60 : 40; 
const SAFE_BOTTOM = 100; 

export default function FloatingChatbot({ onPress }: { onPress: () => void }) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const context = useSharedValue({ x: 0, y: 0 });

  const pulse = useSharedValue(1);

  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(1.2, { duration: 1500 }),
      -1,
      true
    );
  }, []);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { x: translateX.value, y: translateY.value };
    })
    .onUpdate((event) => {
      translateX.value = event.translationX + context.value.x;
      
      const newY = event.translationY + context.value.y;

      const INITIAL_BOTTOM_DISTANCE = 120; 
      
      const limitTop = -(SCREEN_HEIGHT - INITIAL_BOTTOM_DISTANCE - SAFE_TOP - BUTTON_SIZE);
      const limitBottom = INITIAL_BOTTOM_DISTANCE - SAFE_BOTTOM;

      translateY.value = Math.max(limitTop, Math.min(newY, limitBottom));
    })
    .onEnd(() => {
      const threshold = -(SCREEN_WIDTH / 2 - BUTTON_SIZE / 2 - SIDE_PADDING);
      const targetX = translateX.value > threshold ? 0 : -(SCREEN_WIDTH - BUTTON_SIZE - SIDE_PADDING * 2);
      translateX.value = withSpring(targetX, { damping: 25, stiffness: 80 });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: interpolate(pulse.value, [1, 1.2], [1, 1.05]) }
    ],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: interpolate(pulse.value, [1, 1.2], [0.6, 0]),
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <Animated.View style={[styles.pulseCircle, pulseStyle]} />

        <TouchableOpacity 
          onPress={onPress} 
          style={styles.bubble} 
          activeOpacity={0.8}
        >
          <Ionicons name="chatbubble-ellipses" size={30} color="white" />
          <View style={styles.onlineBadge} />
        </TouchableOpacity>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30, 
    right: SIDE_PADDING,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulseCircle: {
    position: 'absolute',
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: '#E25822',
  },
  bubble: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    backgroundColor: '#E25822',
    borderRadius: BUTTON_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  onlineBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: 'white',
  }
});