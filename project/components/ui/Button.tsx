import React from 'react';
import { StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { neonColors } from '@/constants/Colors';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'outline' | 'danger';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  width?: number | string;
  height?: number;
  icon?: React.ReactNode;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  width,
  height = 50,
  icon
}: ButtonProps) {
  // Different gradient colors based on variant
  const getGradientColors = () => {
    switch (variant) {
      case 'primary':
        return [neonColors.primary, neonColors.primaryDark];
      case 'secondary':
        return [neonColors.secondary, neonColors.secondaryDark];
      case 'tertiary':
        return [neonColors.accent, neonColors.accentDark];
      case 'danger':
        return [neonColors.error, '#D10036'];
      case 'outline':
        return ['transparent', 'transparent'];
      default:
        return [neonColors.primary, neonColors.primaryDark];
    }
  };

  const getBorderColor = () => {
    if (variant === 'outline') {
      return { borderColor: neonColors.primary, borderWidth: 1 };
    }
    return {};
  };

  const getTextColor = () => {
    if (variant === 'outline') {
      return neonColors.primary;
    }
    return neonColors.text;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.buttonContainer,
        { opacity: disabled ? 0.6 : 1, width, height },
      ]}
    >
      <LinearGradient
        colors={getGradientColors()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradientContainer, getBorderColor()]}
      >
        {loading ? (
          <ActivityIndicator color={neonColors.text} />
        ) : (
          <>
            {icon && <>{icon}</>}
            <Text style={[styles.text, { color: getTextColor() }]}>{title}</Text>
          </>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  gradientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    textAlign: 'center',
  },
});