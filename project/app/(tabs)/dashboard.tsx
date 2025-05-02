import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, SecondaryText } from '@/components/Themed';
import Card from '@/components/ui/Card';
import StatusBar from '@/components/ui/StatusBar';
import Button from '@/components/ui/Button';
import ConnectionManager from '@/components/ConnectionManager';
import { neonColors } from '@/constants/Colors';
import { 
  Battery, 
  SignalMedium, 
  Zap, 
  Thermometer, 
  ArrowRightLeft,
  RefreshCcw
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  
  // Mock telemetry data
  const [telemetry, setTelemetry] = useState({
    batteryLevel: 82,
    signalStrength: 76,
    motorTemp: 42,
    controlTemp: 38,
    voltage: 7.4,
    current: 2.1,
    runtime: '01:24:35',
    distance: 1.2,
  });
  
  const [isConnected, setIsConnected] = useState(false);

  // Simulate refreshing telemetry data
  const refreshTelemetry = () => {
    if (!isConnected) return;
    
    // Random fluctuations for demo
    setTelemetry({
      ...telemetry,
      batteryLevel: Math.max(1, Math.min(100, telemetry.batteryLevel + Math.floor(Math.random() * 3) - 1)),
      signalStrength: Math.max(1, Math.min(100, telemetry.signalStrength + Math.floor(Math.random() * 5) - 2)),
      motorTemp: Math.max(30, Math.min(60, telemetry.motorTemp + Math.floor(Math.random() * 3) - 1)),
      controlTemp: Math.max(30, Math.min(50, telemetry.controlTemp + Math.floor(Math.random() * 3) - 1)),
      current: Math.max(0.1, Math.min(5, telemetry.current + (Math.random() * 0.4 - 0.2))).toFixed(1),
    });
  };
  
  const handleConnect = (device: any) => {
    setIsConnected(true);
  };
  
  const handleDisconnect = () => {
    setIsConnected(false);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={[neonColors.backgroundLight, neonColors.background]}
        style={StyleSheet.absoluteFillObject}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>DASHBOARD</Text>
      </View>
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Connection Section */}
        <ConnectionManager 
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
        />
        
        {/* Telemetry Section */}
        <Card style={styles.telemetryCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Car Telemetry</Text>
            <Button 
              title="Refresh" 
              variant="outline" 
              onPress={refreshTelemetry}
              width={100}
              height={36}
              icon={<RefreshCcw size={16} color={neonColors.primary} />}
              disabled={!isConnected}
            />
          </View>
          
          {isConnected ? (
            <>
              {/* Battery Status */}
              <View style={styles.telemetryRow}>
                <View style={styles.telemetryIcon}>
                  <Battery size={20} color={
                    telemetry.batteryLevel > 50 ? neonColors.success : 
                    telemetry.batteryLevel > 20 ? neonColors.warning : 
                    neonColors.error
                  } />
                </View>
                <View style={styles.telemetryInfo}>
                  <SecondaryText style={styles.telemetryLabel}>Battery Level</SecondaryText>
                  <StatusBar 
                    percentage={telemetry.batteryLevel} 
                    label="" 
                    showPercentage={false}
                    color={
                      telemetry.batteryLevel > 50 ? neonColors.success : 
                      telemetry.batteryLevel > 20 ? neonColors.warning : 
                      neonColors.error
                    }
                  />
                </View>
                <Text style={styles.telemetryValue}>{telemetry.batteryLevel}%</Text>
              </View>
              
              {/* Signal Strength */}
              <View style={styles.telemetryRow}>
                <View style={styles.telemetryIcon}>
                  <SignalMedium size={20} color={neonColors.primary} />
                </View>
                <View style={styles.telemetryInfo}>
                  <SecondaryText style={styles.telemetryLabel}>Signal Strength</SecondaryText>
                  <StatusBar 
                    percentage={telemetry.signalStrength} 
                    label="" 
                    showPercentage={false}
                    color={neonColors.primary}
                  />
                </View>
                <Text style={styles.telemetryValue}>{telemetry.signalStrength}%</Text>
              </View>
              
              {/* Motor Temperature */}
              <View style={styles.telemetryRow}>
                <View style={styles.telemetryIcon}>
                  <Thermometer size={20} color={neonColors.warning} />
                </View>
                <View style={styles.telemetryInfo}>
                  <SecondaryText style={styles.telemetryLabel}>Motor Temperature</SecondaryText>
                  <StatusBar 
                    percentage={(telemetry.motorTemp / 60) * 100} 
                    label="" 
                    showPercentage={false}
                    color={neonColors.warning}
                  />
                </View>
                <Text style={styles.telemetryValue}>{telemetry.motorTemp}°C</Text>
              </View>
              
              {/* Controller Temperature */}
              <View style={styles.telemetryRow}>
                <View style={styles.telemetryIcon}>
                  <Thermometer size={20} color={neonColors.secondary} />
                </View>
                <View style={styles.telemetryInfo}>
                  <SecondaryText style={styles.telemetryLabel}>Controller Temperature</SecondaryText>
                  <StatusBar 
                    percentage={(telemetry.controlTemp / 50) * 100} 
                    label="" 
                    showPercentage={false}
                    color={neonColors.secondary}
                  />
                </View>
                <Text style={styles.telemetryValue}>{telemetry.controlTemp}°C</Text>
              </View>
              
              {/* Power Stats */}
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Zap size={18} color={neonColors.primary} />
                  <SecondaryText style={styles.statLabel}>Voltage</SecondaryText>
                  <Text style={styles.statValue}>{telemetry.voltage}V</Text>
                </View>
                <View style={styles.statItem}>
                  <ArrowRightLeft size={18} color={neonColors.secondary} />
                  <SecondaryText style={styles.statLabel}>Current</SecondaryText>
                  <Text style={styles.statValue}>{telemetry.current}A</Text>
                </View>
                <View style={styles.statItem}>
                  <RefreshCcw size={18} color={neonColors.accent} />
                  <SecondaryText style={styles.statLabel}>Runtime</SecondaryText>
                  <Text style={styles.statValue}>{telemetry.runtime}</Text>
                </View>
              </View>
            </>
          ) : (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateText}>Connect to a device to view telemetry data</Text>
            </View>
          )}
        </Card>
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
  telemetryCard: {
    marginTop: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  telemetryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  telemetryIcon: {
    width: 40,
    alignItems: 'center',
  },
  telemetryInfo: {
    flex: 1,
    marginHorizontal: 8,
  },
  telemetryLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  telemetryValue: {
    width: 60,
    textAlign: 'right',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Rajdhani-Bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    padding: 12,
    backgroundColor: neonColors.surfaceLight,
    borderRadius: 12,
  },
  statItem: {
    alignItems: 'center',
    width: (width - 120) / 3,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Rajdhani-Bold',
  },
  emptyStateContainer: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    textAlign: 'center',
    color: neonColors.textSecondary,
    fontSize: 16,
  },
});