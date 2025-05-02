import React, { useState, useRef } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '@/components/Themed';
import VirtualJoystick from '@/components/ui/VirtualJoystick';
import StatusBar from '@/components/ui/StatusBar';
import Card from '@/components/ui/Card';
import CarModel from '@/components/CarModel';
import Button from '@/components/ui/Button';
import { neonColors } from '@/constants/Colors';
import { Battery, SignalMedium, Power, LightbulbOff, ArCamera } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function ControlScreen() {
  const insets = useSafeAreaInsets();
  
  // Car control states
  const [throttle, setThrottle] = useState(0);
  const [steering, setSteering] = useState(0);
  const [isConnected, setIsConnected] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(82);
  const [signalStrength, setSignalStrength] = useState(78);
  const [headlightsOn, setHeadlightsOn] = useState(false);
  const [speed, setSpeed] = useState(0);
  
  // 3D Car model position
  const [carPosition, setCarPosition] = useState({
    x: 0,
    y: 0,
    z: 0,
    rotationY: 0,
    wheelRotation: 0,
    speed: 0
  });
  
  // Update car state based on joystick input
  const handleDriveJoystick = (x: number, y: number) => {
    const newThrottle = -y; // Invert Y axis (push up for forward)
    const newSteering = x;
    
    setThrottle(newThrottle);
    setSteering(newSteering);
    
    // Update 3D car model position based on controls
    setCarPosition({
      x: carPosition.x + (newSteering * 0.01),
      y: 0,
      z: carPosition.z - (newThrottle * 0.02),
      rotationY: carPosition.rotationY + (newSteering * 0.02),
      wheelRotation: newSteering * 0.5,
      speed: newThrottle > 0 ? newThrottle * 5 : 0
    });
    
    // Update speed display
    setSpeed(Math.abs(Math.round(newThrottle * 30)));
  };
  
  const handleJoystickRelease = () => {
    setThrottle(0);
    setSteering(0);
    setSpeed(0);
  };
  
  const toggleHeadlights = () => {
    setHeadlightsOn(!headlightsOn);
  };
  
  const togglePower = () => {
    setIsConnected(!isConnected);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={[neonColors.backgroundLight, neonColors.background]}
        style={StyleSheet.absoluteFillObject}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>RC CONTROLLER</Text>
          <View style={styles.statusIcons}>
            <View style={styles.statusIconContainer}>
              <Battery size={18} color={neonColors.success} />
              <Text style={styles.statusText}>{batteryLevel}%</Text>
            </View>
            <View style={styles.statusIconContainer}>
              <SignalMedium size={18} color={neonColors.primary} />
              <Text style={styles.statusText}>{signalStrength}%</Text>
            </View>
          </View>
        </View>
      </View>
      
      {/* 3D Car View */}
      <View style={styles.carModelContainer}>
        <CarModel position={carPosition} style={styles.carModel} />
      </View>
      
      {/* Control Overlay */}
      <View style={styles.controlOverlay}>
        {/* Speed Display */}
        <Card variant="glass" style={styles.speedometer}>
          <Text style={styles.speedValue}>{speed}</Text>
          <Text style={styles.speedUnit}>KM/H</Text>
          <StatusBar 
            percentage={(speed / 30) * 100} 
            label="THROTTLE"
            color={neonColors.secondary}
          />
        </Card>
        
        {/* Control Buttons */}
        <View style={styles.controlButtons}>
          <TouchableOpacity
            style={[
              styles.controlButton,
              headlightsOn && styles.controlButtonActive
            ]}
            onPress={toggleHeadlights}
          >
            {headlightsOn ? (
              <ArCamera size={24} color={neonColors.warning} />
            ) : (
              <LightbulbOff size={24} color={neonColors.textSecondary} />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.controlButton,
              isConnected && styles.powerButtonActive
            ]}
            onPress={togglePower}
          >
            <Power 
              size={24} 
              color={isConnected ? neonColors.error : neonColors.textSecondary} 
            />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Virtual Joysticks */}
      <VirtualJoystick
        position="right"
        onMove={handleDriveJoystick}
        onRelease={handleJoystickRelease}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    zIndex: 10,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Rajdhani-Bold',
    fontSize: 24,
    color: neonColors.text,
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  statusText: {
    fontFamily: 'Rajdhani-Medium',
    fontSize: 14,
    marginLeft: 4,
  },
  carModelContainer: {
    position: 'absolute',
    width: width,
    height: height * 0.6,
    top: height * 0.15,
  },
  carModel: {
    width: '100%',
    height: '100%',
  },
  controlOverlay: {
    position: 'absolute',
    top: 80,
    left: 20,
    width: width - 40,
  },
  speedometer: {
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  speedValue: {
    fontFamily: 'Rajdhani-Bold',
    fontSize: 42,
    color: neonColors.primary,
  },
  speedUnit: {
    fontFamily: 'Rajdhani-Medium',
    fontSize: 14,
    marginBottom: 8,
  },
  controlButtons: {
    marginTop: 16,
    flexDirection: 'row',
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(20, 26, 70, 0.6)',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: neonColors.border,
  },
  controlButtonActive: {
    backgroundColor: 'rgba(94, 23, 235, 0.2)',
    borderColor: neonColors.secondary,
  },
  powerButtonActive: {
    backgroundColor: 'rgba(255, 61, 113, 0.2)',
    borderColor: neonColors.error,
  },
});