import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, SecondaryText, TextInput } from '@/components/Themed';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { neonColors } from '@/constants/Colors';
import { 
  ChevronRight, 
  User,
  Cloud,
  Gamepad2,
  Bluetooth,
  Volume2,
  Sliders,
  BatteryMedium,
  HelpCircle
} from 'lucide-react-native';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  
  // Settings state
  const [settings, setSettings] = useState({
    userName: 'Pilot_X22',
    vibration: true,
    soundEffects: true,
    autoConnect: true,
    cloudSync: false,
    lowBatteryWarning: true,
    showSpeedometer: true,
    sensitivityLevel: 75,
  });
  
  // Toggle setting
  const toggleSetting = (key: keyof typeof settings) => {
    if (typeof settings[key] === 'boolean') {
      setSettings({
        ...settings,
        [key]: !settings[key],
      });
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={[neonColors.backgroundLight, neonColors.background]}
        style={StyleSheet.absoluteFillObject}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>SETTINGS</Text>
      </View>
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* User Profile Section */}
        <Card variant="default" style={styles.profileCard}>
          <View style={styles.profileContainer}>
            <View style={styles.profileIconContainer}>
              <User size={24} color={neonColors.text} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{settings.userName}</Text>
              <SecondaryText style={styles.profileStatus}>Pro Member</SecondaryText>
            </View>
            <TouchableOpacity style={styles.profileEditButton}>
              <ChevronRight size={20} color={neonColors.textSecondary} />
            </TouchableOpacity>
          </View>
        </Card>
        
        {/* Controller Settings */}
        <Card style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Controller Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Gamepad2 size={20} color={neonColors.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Controller Sensitivity</Text>
              <SecondaryText style={styles.settingDescription}>
                Set the sensitivity of joystick controls
              </SecondaryText>
              <View style={styles.sensitivityContainer}>
                <LinearGradient
                  colors={[neonColors.primary, neonColors.secondary]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.sensitivityBar, { width: `${settings.sensitivityLevel}%` }]}
                />
                <View 
                  style={[
                    styles.sensitivityLevel, 
                    { left: `${settings.sensitivityLevel}%` }
                  ]}
                />
              </View>
              <View style={styles.sensitivityLabels}>
                <SecondaryText>Low</SecondaryText>
                <SecondaryText>High</SecondaryText>
              </View>
            </View>
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Volume2 size={20} color={neonColors.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Sound Effects</Text>
              <SecondaryText style={styles.settingDescription}>
                Enable sound effects for actions
              </SecondaryText>
            </View>
            <Switch
              value={settings.soundEffects}
              onValueChange={() => toggleSetting('soundEffects')}
              trackColor={{ false: neonColors.border, true: neonColors.primaryDark }}
              thumbColor={settings.soundEffects ? neonColors.primary : neonColors.textSecondary}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Sliders size={20} color={neonColors.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Vibration</Text>
              <SecondaryText style={styles.settingDescription}>
                Enable haptic feedback
              </SecondaryText>
            </View>
            <Switch
              value={settings.vibration}
              onValueChange={() => toggleSetting('vibration')}
              trackColor={{ false: neonColors.border, true: neonColors.primaryDark }}
              thumbColor={settings.vibration ? neonColors.primary : neonColors.textSecondary}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <BatteryMedium size={20} color={neonColors.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Low Battery Warning</Text>
              <SecondaryText style={styles.settingDescription}>
                Show warning when battery is low
              </SecondaryText>
            </View>
            <Switch
              value={settings.lowBatteryWarning}
              onValueChange={() => toggleSetting('lowBatteryWarning')}
              trackColor={{ false: neonColors.border, true: neonColors.primaryDark }}
              thumbColor={settings.lowBatteryWarning ? neonColors.primary : neonColors.textSecondary}
            />
          </View>
        </Card>
        
        {/* Connection Settings */}
        <Card style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Connection</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Bluetooth size={20} color={neonColors.secondary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Auto Connect</Text>
              <SecondaryText style={styles.settingDescription}>
                Automatically connect to last used device
              </SecondaryText>
            </View>
            <Switch
              value={settings.autoConnect}
              onValueChange={() => toggleSetting('autoConnect')}
              trackColor={{ false: neonColors.border, true: neonColors.secondaryDark }}
              thumbColor={settings.autoConnect ? neonColors.secondary : neonColors.textSecondary}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Cloud size={20} color={neonColors.secondary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Cloud Sync</Text>
              <SecondaryText style={styles.settingDescription}>
                Sync your settings across devices
              </SecondaryText>
            </View>
            <Switch
              value={settings.cloudSync}
              onValueChange={() => toggleSetting('cloudSync')}
              trackColor={{ false: neonColors.border, true: neonColors.secondaryDark }}
              thumbColor={settings.cloudSync ? neonColors.secondary : neonColors.textSecondary}
            />
          </View>
        </Card>
        
        {/* Support Section */}
        <Card style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <TouchableOpacity style={styles.supportItem}>
            <View style={styles.supportIconContainer}>
              <HelpCircle size={20} color={neonColors.accent} />
            </View>
            <View style={styles.supportContent}>
              <Text style={styles.supportText}>Help Center</Text>
            </View>
            <ChevronRight size={20} color={neonColors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.supportItem}>
            <View style={styles.supportIconContainer}>
              <HelpCircle size={20} color={neonColors.accent} />
            </View>
            <View style={styles.supportContent}>
              <Text style={styles.supportText}>Report an Issue</Text>
            </View>
            <ChevronRight size={20} color={neonColors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.supportItem}>
            <View style={styles.supportIconContainer}>
              <HelpCircle size={20} color={neonColors.accent} />
            </View>
            <View style={styles.supportContent}>
              <Text style={styles.supportText}>Privacy Policy</Text>
            </View>
            <ChevronRight size={20} color={neonColors.textSecondary} />
          </TouchableOpacity>
        </Card>
        
        <View style={styles.footerContainer}>
          <Text style={styles.versionText}>RCX Controller v1.0.0</Text>
          <Button 
            title="Reset All Settings" 
            variant="outline" 
            onPress={() => {}} 
            width={150}
            height={40}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  title: {
    fontFamily: 'Rajdhani-Bold',
    fontSize: 24,
    color: neonColors.text,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 80,
  },
  profileCard: {
    marginBottom: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: neonColors.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
  },
  profileStatus: {
    fontSize: 14,
  },
  profileEditButton: {
    padding: 8,
  },
  settingsSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    fontFamily: 'Rajdhani-Bold',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 120, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
    marginRight: 8,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
  },
  sensitivityContainer: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    marginTop: 12,
    position: 'relative',
  },
  sensitivityBar: {
    height: '100%',
    borderRadius: 3,
  },
  sensitivityLevel: {
    position: 'absolute',
    top: -4,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'white',
    transform: [{ translateX: -7 }],
    borderWidth: 2,
    borderColor: neonColors.primary,
  },
  sensitivityLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  supportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: neonColors.border,
  },
  supportIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 0, 153, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  supportContent: {
    flex: 1,
  },
  supportText: {
    fontSize: 16,
    fontWeight: '500',
  },
  footerContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 14,
    color: neonColors.textSecondary,
    marginBottom: 16,
  },
});