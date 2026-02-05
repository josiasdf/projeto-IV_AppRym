import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function MindfullScreen() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('Inspire'); 
  const [count, setCount] = useState(4);
  const [cycles, setCycles] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(5); 
  
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    let interval;
    
    if (isActive) {
      interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount > 1) {
            return prevCount - 1;
          } else {
            
            if (phase === 'Inspire') {
              setPhase('Segure');
              return 4;
            } else if (phase === 'Segure') {
              setPhase('Expire');
              return 4;
            } else {
              setPhase('Inspire');
              setCycles((prev) => prev + 1);
              return 4;
            }
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, phase]);

  
  useEffect(() => {
    if (phase === 'Inspire') {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1.5,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.8,
          duration: 4000,
          useNativeDriver: true,
        }),
      ]).start();
    } else if (phase === 'Segure') {
      
    } else if (phase === 'Expire') {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.3,
          duration: 4000,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [phase]);

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase('Inspire');
    setCount(4);
    setCycles(0);
    scaleAnim.setValue(1);
    opacityAnim.setValue(0.3);
  };

  const techniques = [
    { id: 1, name: '4-4-4', description: 'Inspire 4s, Segure 4s, Expire 4s', icon: 'leaf-outline' },
    { id: 2, name: 'Box Breathing', description: 'Técnica de relaxamento profundo', icon: 'square-outline' },
    { id: 3, name: 'Calma Rápida', description: 'Respiração para ansiedade', icon: 'flash-outline' },
  ];

  const benefits = [
    { icon: 'heart-outline', text: 'Reduz ansiedade' },
    { icon: 'moon-outline', text: 'Melhora o sono' },
    { icon: 'happy-outline', text: 'Aumenta o foco' },
    { icon: 'fitness-outline', text: 'Diminui estresse' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.header}>
          <Text style={styles.title}>Respiração Guiada</Text>
          <Text style={styles.subtitle}>Encontre sua calma interior</Text>
        </View>

        <View style={styles.breathingContainer}>
          <Animated.View 
            style={[
              styles.outerCircle,
              {
                transform: [{ scale: scaleAnim }],
                opacity: opacityAnim,
              }
            ]}
          />
          <View style={styles.innerCircle}>
            <Text style={styles.phaseText}>{phase}</Text>
            <Text style={styles.countText}>{count}</Text>
            <Text style={styles.cyclesText}>{cycles} ciclos</Text>
          </View>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity 
            style={styles.controlButton}
            onPress={handleReset}
          >
          <Ionicons name="reload-outline" size={28} color="#7F8C8D" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.mainButton, isActive && styles.mainButtonActive]}
            onPress={handleStartPause}
          >
            <Ionicons 
              name={isActive ? "pause" : "play"} 
              size={40} 
              color="#FFFFFF" 
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.controlButton}
            onPress={() => {/* Abrir configurações de duração */}}
          >
            <Ionicons name="time-outline" size={28} color="#7F8C8D" />
          </TouchableOpacity>
        </View>

        <View style={styles.durationContainer}>
          <Text style={styles.durationLabel}>Duração da sessão</Text>
          <View style={styles.durationOptions}>
            {[1, 5, 10, 15].map((duration) => (
              <TouchableOpacity
                key={duration}
                style={[
                  styles.durationChip,
                  selectedDuration === duration && styles.durationChipSelected
                ]}
                onPress={() => setSelectedDuration(duration)}
              >
                <Text style={[
                  styles.durationText,
                  selectedDuration === duration && styles.durationTextSelected
                ]}>
                  {duration} min
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Outras técnicas</Text>
          <View style={styles.techniquesContainer}>
            {techniques.map((technique) => (
              <TouchableOpacity key={technique.id} style={styles.techniqueCard}>
                <View style={styles.techniqueIcon}>
                  <Ionicons name={technique.icon} size={24} color="#4A90A4" />
                </View>
                <View style={styles.techniqueInfo}>
                  <Text style={styles.techniqueName}>{technique.name}</Text>
                  <Text style={styles.techniqueDescription}>{technique.description}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#B0B0B0" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Benefícios da respiração consciente</Text>
          <View style={styles.benefitsContainer}>
            {benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <View style={styles.benefitIcon}>
                  <Ionicons name={benefit.icon} size={20} color="#4A90A4" />
                </View>
                <Text style={styles.benefitText}>{benefit.text}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  subtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 4,
  },
  breathingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    marginVertical: 20,
  },
  outerCircle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#A8D5BA',
  },
  innerCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 3,
    borderColor: '#E8F4F8',
  },
  phaseText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90A4',
    marginBottom: 8,
  },
  countText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  cyclesText: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 8,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mainButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4A90A4',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4A90A4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  mainButtonActive: {
    backgroundColor: '#7FB3D5',
  },
  durationContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  durationLabel: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 10,
    textAlign: 'center',
  },
  durationOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  durationChip: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 5,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
  },
  durationChipSelected: {
    backgroundColor: '#E8F4F8',
    borderColor: '#4A90A4',
  },
  durationText: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  durationTextSelected: {
    color: '#4A90A4',
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 15,
  },
  techniquesContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
  },
  techniqueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  techniqueIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8F4F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  techniqueInfo: {
    flex: 1,
  },
  techniqueName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 2,
  },
  techniqueDescription: {
    fontSize: 13,
    color: '#7F8C8D',
  },
  benefitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  benefitIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E8F4F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  benefitText: {
    fontSize: 13,
    color: '#2C3E50',
    flex: 1,
  },
});