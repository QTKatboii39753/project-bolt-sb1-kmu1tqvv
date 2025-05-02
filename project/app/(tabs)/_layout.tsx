import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { neonColors } from '@/constants/Colors';
import { TowerControl as GameControllerIcon, Settings as SettingsIcon, Gauge as GaugeIcon, LayoutGrid as LayoutGridIcon } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: neonColors.primary,
        tabBarInactiveTintColor: neonColors.textSecondary,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarBackground: () => (
          <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill} />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Control',
          tabBarIcon: ({ color, size }) => (
            <GameControllerIcon size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <GaugeIcon size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="modes"
        options={{
          title: 'Modes',
          tabBarIcon: ({ color, size }) => (
            <LayoutGridIcon size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <SettingsIcon size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    borderTopWidth: 0,
    backgroundColor: 'transparent',
    elevation: 0,
    height: 60,
  },
  tabBarLabel: {
    fontFamily: 'Rajdhani-Medium',
    fontSize: 12,
  },
});