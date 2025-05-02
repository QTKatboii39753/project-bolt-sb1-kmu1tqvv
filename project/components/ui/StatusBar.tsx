import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, SecondaryText } from '@/components/Themed';
import { neonColors } from '@/constants/Colors';

interface StatusBarProps {
  percentage: number;
  label: string;
  color?: string;
  size?: 'small' | 'medium' | 'large';
  showPercentage?: boolean;
}

export default function StatusBar({
  percentage,
  label,
  color = neonColors.primary,
  size = 'medium',
  showPercentage = true,
}: StatusBarProps) {
  // Ensure percentage is between 0 and 100
  const normalizedPercentage = Math.max(0, Math.min(100, percentage));
  
  // Define height based on size
  const getHeight = () => {
    switch(size) {
      case 'small': return 4;
      case 'large': return 12;
      default: return 8;
    }
  };
  
  // Get the right color for the gradient based on percentage
  const getGradientColors = () => {
    if (normalizedPercentage <= 20) {
      return [neonColors.error, neonColors.error];
    } else if (normalizedPercentage <= 50) {
      return [neonColors.warning, color];
    }
    return [color, color];
  };
  
  const height = getHeight();
  
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <SecondaryText style={styles.label}>{label}</SecondaryText>
        {showPercentage && (
          <Text style={styles.percentage}>{normalizedPercentage}%</Text>
        )}
      </View>
      <View style={[styles.track, { height }]}>
        <LinearGradient
          colors={getGradientColors()}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.progress,
            { width: `${normalizedPercentage}%`, height },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
  },
  percentage: {
    fontSize: 12,
    fontWeight: '500',
  },
  track: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    borderRadius: 4,
  },
});