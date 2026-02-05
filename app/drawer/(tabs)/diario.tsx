import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

export default function DiarioScreen() {
  const router = useRouter();
  const [entries, setEntries] = useState([
    {
      id: 1,
      date: '05 Nov 2025',
      mood: '😊',
      title: 'Um dia produtivo',
      preview: 'Hoje consegui finalizar o projeto que estava me deixando ansioso...',
      content: 'Hoje consegui finalizar o projeto que estava me deixando ansioso. Me sinto aliviado e orgulhoso do resultado.',
      tags: ['Trabalho', 'Conquista'],
    },
    {
      id: 2,
      date: '03 Nov 2025',
      mood: '😌',
      title: 'Caminhada no parque',
      preview: 'Aproveitei a tarde para caminhar. O contato com a natureza...',
      content: 'Aproveitei a tarde para caminhar no parque. O contato com a natureza me fez muito bem.',
      tags: ['Natureza', 'Bem-estar'],
    },
    {
      id: 3,
      date: '01 Nov 2025',
      mood: '😔',
      title: 'Dia difícil',
      preview: 'Hoje não foi um bom dia. Senti muita ansiedade pela manhã...',
      content: 'Hoje não foi um bom dia. Senti muita ansiedade pela manhã, mas consegui usar as técnicas de respiração.',
      tags: ['Ansiedade', 'Superação'],
    },
  ]);

  const [showNewEntry, setShowNewEntry] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [selectedMood, setSelectedMood] = useState('😊');

  const moods = ['😄', '😊', '😌', '😔', '😢', '😴', '😤', '🥰'];

  const handleSaveEntry = () => {
    if (!newTitle.trim() || !newContent.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha o título e o conteúdo.');
      return;
    }

    const newEntry = {
      id: entries.length + 1,
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
      mood: selectedMood,
      title: newTitle,
      preview: newContent.substring(0, 60) + '...',
      content: newContent,
      tags: ['Novo'],
    };

    setEntries([newEntry, ...entries]);
    setNewTitle('');
    setNewContent('');
    setSelectedMood('😊');
    setShowNewEntry(false);
    
    Alert.alert('Sucesso! ✅', 'Sua entrada foi salva no diário.');
  };

  const stats = [
    { icon: 'calendar-outline', value: entries.length, label: 'Entradas' },
    { icon: 'flame-outline', value: '7', label: 'Dias seguidos' },
    { icon: 'heart-outline', value: '85%', label: 'Humor positivo' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#4A90A4" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meu Diário</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowNewEntry(!showNewEntry)}
        >
          <Ionicons 
            name={showNewEntry ? "close" : "add"} 
            size={24} 
            color="#4A90A4" 
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Ionicons name={stat.icon} size={24} color="#4A90A4" />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {showNewEntry && (
          <View style={styles.newEntryContainer}>
            <Text style={styles.newEntryTitle}>Nova Entrada</Text>
            
            <View style={styles.moodSelectorContainer}>
              <Text style={styles.moodLabel}>Como você está se sentindo?</Text>
              <View style={styles.moodSelector}>
                {moods.map((mood, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.moodOption,
                      selectedMood === mood && styles.moodOptionSelected
                    ]}
                    onPress={() => setSelectedMood(mood)}
                  >
                    <Text style={styles.moodEmoji}>{mood}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Título</Text>
              <TextInput
                style={styles.titleInput}
                placeholder="Ex: Um dia especial..."
                placeholderTextColor="#B0B0B0"
                value={newTitle}
                onChangeText={setNewTitle}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>O que você quer registrar?</Text>
              <TextInput
                style={styles.contentInput}
                placeholder="Escreva sobre seu dia, seus sentimentos, conquistas..."
                placeholderTextColor="#B0B0B0"
                multiline
                numberOfLines={6}
                value={newContent}
                onChangeText={setNewContent}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => {
                  setShowNewEntry(false);
                  setNewTitle('');
                  setNewContent('');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.saveButton}
                onPress={handleSaveEntry}
              >
                <Ionicons name="checkmark-circle-outline" size={20} color="#FFFFFF" />
                <Text style={styles.saveButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.entriesSection}>
          <Text style={styles.sectionTitle}>Suas Entradas</Text>
          
          {entries.map((entry) => (
            <TouchableOpacity 
              key={entry.id} 
              style={styles.entryCard}
              activeOpacity={0.7}
            >
              <View style={styles.entryHeader}>
                <View style={styles.entryMood}>
                  <Text style={styles.entryMoodEmoji}>{entry.mood}</Text>
                </View>
                <View style={styles.entryHeaderText}>
                  <Text style={styles.entryTitle}>{entry.title}</Text>
                  <Text style={styles.entryDate}>{entry.date}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#B0B0B0" />
              </View>
              
              <Text style={styles.entryPreview}>{entry.preview}</Text>
              
              <View style={styles.entryTags}>
                {entry.tags.map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.tipContainer}>
          <Ionicons name="bulb-outline" size={20} color="#4A90A4" />
          <Text style={styles.tipText}>
            Escrever regularmente sobre seus sentimentos pode ajudar a processar emoções e reduzir o estresse.
          </Text>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8F4F8',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7F9FC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C3E50',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F4F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 11,
    color: '#7F8C8D',
    marginTop: 4,
    textAlign: 'center',
  },
  newEntryContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  newEntryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 20,
  },
  moodSelectorContainer: {
    marginBottom: 20,
  },
  moodLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2C3E50',
    marginBottom: 12,
  },
  moodSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  moodOption: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F7F9FC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  moodOptionSelected: {
    backgroundColor: '#E8F4F8',
    borderColor: '#4A90A4',
  },
  moodEmoji: {
    fontSize: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2C3E50',
    marginBottom: 8,
  },
  titleInput: {
    backgroundColor: '#F7F9FC',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: '#2C3E50',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
  },
  contentInput: {
    backgroundColor: '#F7F9FC',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: '#2C3E50',
    minHeight: 120,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#F7F9FC',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7F8C8D',
  },
  saveButton: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#4A90A4',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    shadowColor: '#4A90A4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  entriesSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 15,
  },
  entryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  entryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  entryMood: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8F4F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  entryMoodEmoji: {
    fontSize: 24,
  },
  entryHeaderText: {
    flex: 1,
  },
  entryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 2,
  },
  entryDate: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  entryPreview: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
    marginBottom: 12,
  },
  entryTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    backgroundColor: '#E8F4F8',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 11,
    color: '#4A90A4',
    fontWeight: '500',
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F4F8',
    marginHorizontal: 20,
    marginTop: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4A90A4',
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#2C3E50',
    marginLeft: 12,
    lineHeight: 20,
  },
});