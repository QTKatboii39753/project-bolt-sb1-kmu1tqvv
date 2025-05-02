import React, { useRef, useEffect, useCallback } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useDerivedValue,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { neonColors } from '@/constants/Colors';

interface VirtualJoystickProps {
  size?: number;
  innerSize?: number;
  onMove?: (x: number, y: number) => void;
  onRelease?: () => void;
  position?: 'left' | 'right';
  maxDistance?: number;
}

export default function VirtualJoystick({
  size = 150,
  innerSize = 60,
  onMove,
  onRelease,
  position = 'left',
  maxDistance = 50,
}: VirtualJoystickProps) {
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);
  const isPressing = useSharedValue(false);
  
  // Memoize the onMove callback to prevent unnecessary recreations
  const handleMove = useCallback((x: number, y: number) => {
    if (onMove && typeof onMove === 'function') {
      onMove(x, y);
    }
  }, [onMove]);
  
  // Calculate normalized values (-1 to 1)
  const normalizedX = useDerivedValue(() => {
    return positionX.value / maxDistance;
  });
  
  const normalizedY = useDerivedValue(() => {
    return positionY.value / maxDistance;
  });
  
  // Effect to call onMove with normalized values
  useEffect(() => {
    if (!handleMove) return;

    const id = normalizedX.addListener((x) => {
      if (isPressing.value) {
        runOnJS(handleMove)(x.value, normalizedY.value);
      }
    });
    
    return () => {
      if (id !== undefined) {
        normalizedX.removeListener(id);
      }
    };
  }, [normalizedX, normalizedY, handleMove]);
  
  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressing.value = true;
    })
    .onUpdate((e) => {
      let newX = e.translationX;
      let newY = e.translationY;
      
      // Calculate distance from center
      const distance = Math.sqrt(newX * newX + newY * newY);
      
      // If distance is greater than maxDistance, normalize
      if (distance > maxDistance) {
        const angle = Math.atan2(newY, newX);
        newX = Math.cos(angle) * maxDistance;
        newY = Math.sin(angle) * maxDistance;
      }
      
      positionX.value = newX;
      positionY.value = newY;
    })
    .onEnd(() => {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
      isPressing.value = false;
      if (onRelease && typeof onRelease === 'function') {
        runOnJS(onRelease)();
      }
    });
  
  const innerCircleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });
  
  const borderAnimatedStyle = useAnimatedStyle(() => {
    return {
      borderColor: isPressing.value 
        ? neonColors.primary 
        : 'rgba(255, 255, 255, 0.2)',
      borderWidth: isPressing.value ? 2 : 1,
    };
  });
  
  return (
    <View
      style={[
        styles.container,
        { 
          width: size, 
          height: size,
          left: position === 'left' ? 20 : undefined,
          right: position === 'right' ? 20 : undefined,
        },
      ]}
    >
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            styles.joystickBase,
            { width: size, height: size },
            borderAnimatedStyle,
          ]}
        >
          <Animated.View
            style={[
              styles.innerCircle,
              { width: innerSize, height: innerSize },
              innerCircleStyle,
            ]}
          >
            <LinearGradient
              colors={[neonColors.primary, neonColors.secondary]}
              style={styles.gradientFill}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  joystickBase: {
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(20, 26, 70, 0.3)',
  },
  innerCircle: {
    borderRadius: 999,
    overflow: 'hidden',
    position: 'absolute',
  },
  gradientFill: {
    flex: 1,
    borderRadius: 999,
  },
});