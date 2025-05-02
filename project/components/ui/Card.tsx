import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { View } from '@/components/Themed';
import { neonColors } from '@/constants/Colors';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'glass' | 'hologram';
  intensity?: number;
}

export default function Card({ 
  children, 
  style, 
  variant = 'default',
  intensity = 30
}: CardProps) {
  if (variant === 'glass') {
    return (
      <BlurView 
        intensity={intensity} 
        tint="dark" 
        style={[styles.container, styles.glassCard, style]}
      >
        {children}
      </BlurView>
    );
  }

  if (variant === 'hologram') {
    return (
      <LinearGradient
        colors={['rgba(94, 23, 235, 0.1)', 'rgba(0, 120, 255, 0.1)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.container, styles.hologramCard, style]}
      >
        <View style={styles.hologramBorder}>
          {children}
        </View>
      </LinearGradient>
    );
  }

  return (
    <View style={[styles.container, styles.defaultCard, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    margin: 8,
  },
  defaultCard: {
    backgroundColor: neonColors.surface,
    borderColor: neonColors.border,
    borderWidth: 1,
    shadowColor: neonColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  glassCard: {
    backgroundColor: 'rgba(20, 26, 70, 0.5)',
    overflow: 'hidden',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
  },
  hologramCard: {
    backgroundColor: 'transparent',
    borderColor: neonColors.primaryLight,
    borderWidth: 1,
    overflow: 'hidden',
  },
  hologramBorder: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 12,
  }
});