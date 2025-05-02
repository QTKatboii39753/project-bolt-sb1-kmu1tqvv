import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, SecondaryText } from '@/components/Themed';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { neonColors } from '@/constants/Colors';
import { Wifi, Bluetooth, Check, X } from 'lucide-react-native';

interface DeviceInfo {
  id: string;
  name: string;
  type: 'bluetooth' | 'wifi';
  connected: boolean;
  signal?: number;
}

const mockDevices: DeviceInfo[] = [
  { id: '1', name: 'RC Car XR-7', type: 'bluetooth', connected: false, signal: 75 },
  { id: '2', name: 'SpeedRacer Pro', type: 'bluetooth', connected: false, signal: 90 },
  { id: '3', name: 'Drift King 3000', type: 'wifi', connected: false, signal: 60 },
];

interface ConnectionManagerProps {
  onConnect?: (device: DeviceInfo) => void;
  onDisconnect?: () => void;
}

export default function ConnectionManager({ onConnect, onDisconnect }: ConnectionManagerProps) {
  const [devices, setDevices] = useState<DeviceInfo[]>(mockDevices);
  const [scanning, setScanning] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState<DeviceInfo | null>(null);

  const startScan = () => {
    setScanning(true);
    
    // Simulate scanning behavior
    setTimeout(() => {
      setScanning(false);
    }, 3000);
  };

  const connectToDevice = (device: DeviceInfo) => {
    // Simulate connection delay
    const updatedDevices = devices.map(d => 
      d.id === device.id ? { ...d, connected: true } : { ...d, connected: false }
    );
    
    setDevices(updatedDevices);
    const connected = { ...device, connected: true };
    setConnectedDevice(connected);
    
    if (onConnect) {
      onConnect(connected);
    }
  };

  const disconnectDevice = () => {
    if (connectedDevice) {
      const updatedDevices = devices.map(d => 
        d.id === connectedDevice.id ? { ...d, connected: false } : d
      );
      
      setDevices(updatedDevices);
      setConnectedDevice(null);
      
      if (onDisconnect) {
        onDisconnect();
      }
    }
  };

  return (
    <Card variant="glass" style={styles.container}>
      <Text style={styles.title}>Connect to RC Car</Text>
      
      <View style={styles.scanButtonContainer}>
        <Button
          title={scanning ? "Scanning..." : "Scan for Devices"}
          onPress={startScan}
          loading={scanning}
          disabled={scanning}
          icon={<Wifi size={18} color={neonColors.text} />}
        />
      </View>
      
      <View style={styles.devicesContainer}>
        {devices.map((device) => (
          <TouchableOpacity
            key={device.id}
            style={[
              styles.deviceItem,
              device.connected && styles.deviceItemConnected
            ]}
            onPress={() => connectToDevice(device)}
            disabled={device.connected || !!connectedDevice}
          >
            <View style={styles.deviceIcon}>
              {device.type === 'bluetooth' ? (
                <Bluetooth size={20} color={neonColors.primary} />
              ) : (
                <Wifi size={20} color={neonColors.secondary} />
              )}
            </View>
            
            <View style={styles.deviceInfo}>
              <Text style={styles.deviceName}>{device.name}</Text>
              <SecondaryText style={styles.deviceType}>
                {device.type === 'bluetooth' ? 'Bluetooth' : 'Wi-Fi'} • Signal: {device.signal}%
              </SecondaryText>
            </View>
            
            <View style={styles.deviceStatus}>
              {device.connected ? (
                <Check size={20} color={neonColors.success} />
              ) : connectedDevice ? (
                <X size={20} color={neonColors.textSecondary} />
              ) : null}
            </View>
          </TouchableOpacity>
        ))}
      </View>
      
      {connectedDevice && (
        <View style={styles.connectedInfo}>
          <Text style={styles.connectedText}>
            Connected to: {connectedDevice.name}
          </Text>
          <Button
            title="Disconnect"
            variant="danger"
            onPress={disconnectDevice}
            width={120}
            height={40}
          />
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  scanButtonContainer: {
    marginBottom: 16,
  },
  devicesContainer: {
    width: '100%',
  },
  deviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: neonColors.surfaceLight,
  },
  deviceItemConnected: {
    backgroundColor: 'rgba(0, 230, 118, 0.1)',
    borderColor: neonColors.success,
    borderWidth: 1,
  },
  deviceIcon: {
    marginRight: 12,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '500',
  },
  deviceType: {
    fontSize: 14,
  },
  deviceStatus: {
    width: 24,
    alignItems: 'center',
  },
  connectedInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: neonColors.border,
  },
  connectedText: {
    fontSize: 14,
    fontWeight: '500',
    color: neonColors.success,
  },
});