import { useEffect, useState } from 'react';
import { useColorScheme as _useColorScheme } from 'react-native';

// Override always to use dark theme for this futuristic app
export function useColorScheme(): NonNullable<ReturnType<typeof _useColorScheme>> {
  // Real app would get from user preferences, but for demo purposes:
  return 'dark';
}