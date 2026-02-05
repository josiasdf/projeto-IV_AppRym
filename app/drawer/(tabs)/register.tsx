import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type MoodType = {
  id: number;
  emoji: string;
  label: string;
  color: string;
};

type TriggerType = {
  id: number;
  label: string;
  icon: any;
};

export default function RegisterScreen() {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [intensity, setIntensity] = useState(3);
  const [note, setNote] = useState('');
  const [selectedTriggers, setSelectedTriggers] = useState<number[]>([]);

  const moods: MoodType[] = [
    { id: 1, emoji: '😢', label: 'Muito triste', color: '#D1C4E9' },
    { id: 2, emoji: '😔', label: 'Triste', color: '#BBDEFB' },
    { id: 3, emoji: '😌', label: 'Neutro', color: '#E0E0E0' },
    { id: 4, emoji: '😊', label: 'Feliz', color: '#B3E5FC' },
    { id: 5, emoji: '😄', label: 'Muito feliz', color: '#A8E6CF' },
  ];

  const triggers: TriggerType[] = [
    { id: 1, label: 'Trabalho', icon: 'briefcase-outline' },
    { id: 2, label: 'Família', icon: 'people-outline' },
    { id: 3, label: 'Saúde', icon: 'fitness-outline' },
    { id: 4, label: 'Relacionamento', icon: 'heart-outline' },
    { id: 5, label: 'Finanças', icon: 'cash-outline' },
    { id: 6, label: 'Sono', icon: 'moon-outline' },
    { id: 7, label: 'Alimentação', icon: 'restaurant-outline' },
    { id: 8, label: 'Exercício', icon: 'barbell-outline' },
  ];

  const toggleTrigger = (triggerId: number) => {
    if (selectedTriggers.includes(triggerId)) {
      setSelectedTriggers(selectedTriggers.filter(id => id !== triggerId));
    } else {
      setSelectedTriggers([...selectedTriggers, triggerId]);
    }
  };

  const handleSave = () => {
    if (!selectedMood) {
      Alert.alert('Atenção', 'Por favor, selecione como você está se sentindo.');
      return;
    }

    // Aqui você salvaria no backend ou AsyncStorage
    Alert.alert(
      'Registro salvo! ✅', 
      'Seu humor foi registrado com sucesso.',
      [{ 
        text: 'OK', 
        onPress: () => {
          setSelectedMood(null);
          setIntensity(3);
          setNote('');
          setSelectedTriggers([]);
        }
      }]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Como você está?</Text>
        <Text style={styles.subtitle}>Registre seu momento atual</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Selecione seu humor</Text>
        <View style={styles.moodsContainer}>
          {moods.map((mood) => (
            <TouchableOpacity
              key={mood.id}
              style={[
                styles.moodCard,
                { backgroundColor: mood.color },
                selectedMood?.id === mood.id && styles.moodCardSelected
              ]}
              onPress={() => setSelectedMood(mood)}
            >
              <Text style={styles.moodEmoji}>{mood.emoji}</Text>
              <Text style={styles.moodLabel}>{mood.label}</Text>
              {selectedMood?.id === mood.id && (
                <View style={styles.checkmark}>
                  <Ionicons name="checkmark-circle" size={24} color="#4A90A4" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {selectedMood && (
        <View style={styles.section}>
          <View style={styles.intensityHeader}>
            <Text style={styles.sectionTitle}>Intensidade</Text>
            <Text style={styles.intensityValue}>{intensity}/5</Text>
          </View>
          <View style={styles.intensityContainer}>
            {[1, 2, 3, 4, 5].map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.intensityDot,
                  level <= intensity && styles.intensityDotActive
                ]}
                onPress={() => setIntensity(level)}
              >
                <Text style={[
                  styles.intensityNumber,
                  level <= intensity && styles.intensityNumberActive
                ]}>
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>O que influenciou? (opcional)</Text>
        <View style={styles.triggersContainer}>
          {triggers.map((trigger) => (
            <TouchableOpacity
              key={trigger.id}
              style={[
                styles.triggerChip,
                selectedTriggers.includes(trigger.id) && styles.triggerChipSelected
              ]}
              onPress={() => toggleTrigger(trigger.id)}
            >
              <Ionicons 
                name={trigger.icon} 
                size={18} 
                color={selectedTriggers.includes(trigger.id) ? '#4A90A4' : '#7F8C8D'} 
              />
              <Text style={[
                styles.triggerLabel,
                selectedTriggers.includes(trigger.id) && styles.triggerLabelSelected
              ]}>
                {trigger.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Adicione uma nota (opcional)</Text>
        <View style={styles.noteContainer}>
          <TextInput
            style={styles.noteInput}
            placeholder="O que aconteceu? Como você está se sentindo?"
            placeholderTextColor="#B0B0B0"
            multiline
            numberOfLines={4}
            value={note}
            onChangeText={setNote}
            textAlignVertical="top"
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.saveButton, !selectedMood && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={!selectedMood}
        >
          <Ionicons name="checkmark-circle-outline" size={24} color="#FFFFFF" />
          <Text style={styles.saveButtonText}>Salvar Registro</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tipContainer}>
        <Ionicons name="bulb-outline" size={20} color="#4A90A4" />
        <Text style={styles.tipText}>
          Dica: Registre seu humor regularmente para identificar padrões e melhorar seu bem-estar.
        </Text>
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
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
  section: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 15,
  },
  moodsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moodCard: {
    width: '48%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  moodCardSelected: {
    borderColor: '#4A90A4',
    shadowColor: '#4A90A4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  moodEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  moodLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2C3E50',
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  intensityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  intensityValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90A4',
  },
  intensityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 16,
  },
  intensityDot: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  intensityDotActive: {
    backgroundColor: '#4A90A4',
  },
  intensityNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7F8C8D',
  },
  intensityNumberActive: {
    color: '#FFFFFF',
  },
  triggersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  triggerChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
  },
  triggerChipSelected: {
    backgroundColor: '#E8F4F8',
    borderColor: '#4A90A4',
  },
  triggerLabel: {
    fontSize: 14,
    color: '#7F8C8D',
    marginLeft: 6,
  },
  triggerLabelSelected: {
    color: '#4A90A4',
    fontWeight: '500',
  },
  noteContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
  },
  noteInput: {
    fontSize: 15,
    color: '#2C3E50',
    minHeight: 100,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  saveButton: {
    backgroundColor: '#4A90A4',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#4A90A4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  saveButtonDisabled: {
    backgroundColor: '#B0B0B0',
    shadowOpacity: 0,
    elevation: 0,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F4F8',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4A90A4',
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: '#2C3E50',
    marginLeft: 10,
    lineHeight: 18,
  },
});