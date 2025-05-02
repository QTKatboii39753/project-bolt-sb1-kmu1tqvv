import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, SecondaryText } from '@/components/Themed';
import Card from '@/components/ui/Card';
import { neonColors } from '@/constants/Colors';
import { 
  Zap, 
  Leaf, 
  Timer, 
  Activity, 
  Star, 
  Lock
} from 'lucide-react-native';

// Define drive modes
interface DriveMode {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  locked?: boolean;
  stats: {
    speed: number;
    acceleration: number;
    handling: number;
    efficiency: number;
  };
  background?: string;
}

export default function ModesScreen() {
  const insets = useSafeAreaInsets();
  
  const driveModes: DriveMode[] = [
    {
      id: 'normal',
      name: 'Normal',
      description: 'Balanced performance for everyday driving',
      icon: <Activity size={24} color={neonColors.primary} />,
      color: neonColors.primary,
      stats: {
        speed: 60,
        acceleration: 50,
        handling: 60,
        efficiency: 80,
      },
      background: 'https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 'sport',
      name: 'Sport',
      description: 'Maximum performance with enhanced throttle response',
      icon: <Zap size={24} color="#FF0099" />,
      color: "#FF0099",
      stats: {
        speed: 90,
        acceleration: 85,
        handling: 70,
        efficiency: 40,
      },
      background: 'https://images.pexels.com/photos/2127015/pexels-photo-2127015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 'eco',
      name: 'Eco',
      description: 'Improved energy efficiency for longer drive time',
      icon: <Leaf size={24} color="#00E676" />,
      color: "#00E676",
      stats: {
        speed: 40,
        acceleration: 30,
        handling: 50,
        efficiency: 95,
      },
      background: 'https://images.pexels.com/photos/133633/pexels-photo-133633.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 'drift',
      name: 'Drift',
      description: 'Reduced traction control for controlled sliding',
      icon: <Timer size={24} color="#FFEA00" />,
      color: "#FFEA00",
      stats: {
        speed: 70,
        acceleration: 65,
        handling: 95,
        efficiency: 30,
      },
      background: 'https://images.pexels.com/photos/2920064/pexels-photo-2920064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Competition-ready settings for maximum control',
      icon: <Star size={24} color="#5E17EB" />,
      color: "#5E17EB",
      locked: true,
      stats: {
        speed: 100,
        acceleration: 100,
        handling: 100,
        efficiency: 20,
      },
      background: 'https://images.pexels.com/photos/3349204/pexels-photo-3349204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];
  
  const [selectedMode, setSelectedMode] = useState<DriveMode>(driveModes[0]);
  
  const handleSelectMode = (mode: DriveMode) => {
    if (!mode.locked) {
      setSelectedMode(mode);
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
        <Text style={styles.title}>DRIVE MODES</Text>
      </View>
      
      {/* Selected Mode Display */}
      <View style={styles.selectedModeContainer}>
        <Card variant="hologram" style={[styles.selectedModeCard, { borderColor: selectedMode.color }]}>
          <View style={styles.selectedModeContent}>
            <View style={styles.selectedModeTextContainer}>
              <View style={styles.modeIconContainer}>
                {selectedMode.icon}
              </View>
              <Text style={[styles.selectedModeName, { color: selectedMode.color }]}>
                {selectedMode.name}
              </Text>
              <SecondaryText style={styles.selectedModeDescription}>
                {selectedMode.description}
              </SecondaryText>
            </View>
            {selectedMode.background && (
              <Image
                source={{ uri: selectedMode.background }}
                style={styles.modeBackgroundImage}
                blurRadius={3}
              />
            )}
          </View>
          
          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>SPEED</Text>
              <View style={styles.statBarContainer}>
                <View 
                  style={[
                    styles.statBar, 
                    { width: `${selectedMode.stats.speed}%`, backgroundColor: selectedMode.color }
                  ]} 
                />
              </View>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>ACCELERATION</Text>
              <View style={styles.statBarContainer}>
                <View 
                  style={[
                    styles.statBar, 
                    { width: `${selectedMode.stats.acceleration}%`, backgroundColor: selectedMode.color }
                  ]} 
                />
              </View>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>HANDLING</Text>
              <View style={styles.statBarContainer}>
                <View 
                  style={[
                    styles.statBar, 
                    { width: `${selectedMode.stats.handling}%`, backgroundColor: selectedMode.color }
                  ]} 
                />
              </View>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>EFFICIENCY</Text>
              <View style={styles.statBarContainer}>
                <View 
                  style={[
                    styles.statBar, 
                    { width: `${selectedMode.stats.efficiency}%`, backgroundColor: selectedMode.color }
                  ]} 
                />
              </View>
            </View>
          </View>
        </Card>
      </View>
      
      {/* Mode Selection */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.modesScrollView}
        contentContainerStyle={styles.modesContainer}
      >
        {driveModes.map((mode) => (
          <TouchableOpacity
            key={mode.id}
            style={[
              styles.modeItem,
              selectedMode.id === mode.id && styles.modeItemSelected,
              mode.locked && styles.modeItemLocked,
              { borderColor: selectedMode.id === mode.id ? mode.color : 'transparent' }
            ]}
            onPress={() => handleSelectMode(mode)}
            disabled={mode.locked}
          >
            <View style={styles.modeContent}>
              <View style={styles.modeHeader}>
                {mode.icon}
                {mode.locked && (
                  <View style={styles.lockedIcon}>
                    <Lock size={16} color={neonColors.textSecondary} />
                  </View>
                )}
              </View>
              <Text style={styles.modeName}>{mode.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
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
  selectedModeContainer: {
    padding: 16,
  },
  selectedModeCard: {
    borderWidth: 2,
    padding: 0,
    overflow: 'hidden',
  },
  selectedModeContent: {
    padding: 16,
    paddingBottom: 8,
  },
  selectedModeTextContainer: {
    position: 'relative',
    zIndex: 2,
  },
  modeIconContainer: {
    marginBottom: 8,
  },
  selectedModeName: {
    fontFamily: 'Rajdhani-Bold',
    fontSize: 30,
    marginBottom: 4,
  },
  selectedModeDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  modeBackgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.2,
    zIndex: 1,
  },
  statsContainer: {
    backgroundColor: 'rgba(8, 10, 26, 0.7)',
    padding: 16,
  },
  statItem: {
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Rajdhani-SemiBold',
    marginBottom: 4,
    color: neonColors.textSecondary,
  },
  statBarContainer: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  statBar: {
    height: '100%',
    borderRadius: 3,
  },
  modesScrollView: {
    marginTop: 16,
  },
  modesContainer: {
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
  modeItem: {
    backgroundColor: neonColors.surface,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    width: 110,
    height: 110,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  modeItemSelected: {
    backgroundColor: 'rgba(20, 26, 70, 0.8)',
  },
  modeItemLocked: {
    opacity: 0.5,
  },
  modeContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  modeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modeName: {
    fontSize: 16,
    fontWeight: '600',
  },
  lockedIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});