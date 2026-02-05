import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  
  const [weekMood] = useState([
    { day: 'Seg', mood: 4, emoji: '😊' },
    { day: 'Ter', mood: 3, emoji: '😌' },
    { day: 'Qua', mood: 5, emoji: '😄' },
    { day: 'Qui', mood: 3, emoji: '😌' },
    { day: 'Sex', mood: 4, emoji: '😊' },
    { day: 'Sáb', mood: 2, emoji: '😔' },
    { day: 'Dom', mood: 4, emoji: '😊' },
  ]);

  const motivationalQuotes = [
    "Cada dia é uma nova oportunidade para cuidar de si mesmo 🌱",
    "Você está fazendo o seu melhor, e isso é suficiente 💙",
    "Respire fundo. Você consegue lidar com isso ☁️",
    "Seja gentil consigo mesmo hoje 🌸",
  ];

  const [currentQuote] = useState(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);

  const getMoodColor = (mood: number) => {
    const colors = {
      5: '#A8E6CF',
      4: '#B3E5FC',
      3: '#E0E0E0', 
      2: '#BBDEFB',  
      1: '#D1C4E9', 
    };
    return colors[mood] || '#E0E0E0';
  };

  const averageMood = (weekMood.reduce((acc, day) => acc + day.mood, 0) / weekMood.length).toFixed(1);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá! Usuário 👋</Text>
          <Text style={styles.date}>
            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </Text>
        </View>
        <TouchableOpacity style={styles.notificationBtn}>
          <Ionicons name="notifications-outline" size={24} color="#4A90A4" />
        </TouchableOpacity>
      </View>

      <View style={styles.motivationCard}>
        <Ionicons name="sparkles" size={24} color="#4A90A4" style={styles.sparkleIcon} />
        <Text style={styles.motivationText}>{currentQuote}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Como você está se sentindo hoje?</Text>
        <View style={styles.moodQuickSelect}>
          {[
            { emoji: '😄', label: 'Ótimo', value: 5 },
            { emoji: '😊', label: 'Bem', value: 4 },
            { emoji: '😌', label: 'Ok', value: 3 },
            { emoji: '😔', label: 'Triste', value: 2 },
            { emoji: '😢', label: 'Mal', value: 1 },
          ].map((mood, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.moodBtn}
          >
              <Text style={styles.moodEmoji}>{mood.emoji}</Text>
              <Text style={styles.moodLabel}>{mood.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Seu humor esta semana</Text>
          <Text style={styles.averageText}>Média: {averageMood}</Text>
        </View>
        <View style={styles.chartContainer}>
          <View style={styles.chart}>
            {weekMood.map((day, index) => (
              <View key={index} style={styles.barContainer}>
                <Text style={styles.barEmoji}>{day.emoji}</Text>
                <View style={styles.barWrapper}>
                  <View 
                    style={[
                      styles.bar, 
                      { 
                        height: `${(day.mood / 5) * 100}%`,
                        backgroundColor: getMoodColor(day.mood)
                      }
                    ]} 
                  />
                </View>
                <Text style={styles.barLabel}>{day.day}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recursos para você</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: '#E8F5E9' }]}
             onPress={() => router.push('/drawer/(tabs)/respiracao')}
          >
            <Ionicons name="leaf-outline" size={28} color="#66BB6A" />
            <Text style={styles.actionTitle}>Respirar</Text>
            <Text style={styles.actionSubtitle}>5 min</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: '#E3F2FD' }]}
            onPress={() => router.push('/drawer/(tabs)/activities')}
          >
            <Ionicons name="fitness-outline" size={28} color="#42A5F5" />
            <Text style={styles.actionTitle}>Atividades</Text>
            <Text style={styles.actionSubtitle}>Bem-estar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: '#F3E5F5' }]}
            onPress={() => router.push('/drawer/(tabs)/diario')}
          >
            <Ionicons name="book-outline" size={28} color="#AB47BC" />
            <Text style={styles.actionTitle}>Diário</Text>
            <Text style={styles.actionSubtitle}>Escrever</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: '#FFF3E0' }]}
            onPress={() => Linking.openURL('tel:188')}
          >
            <Ionicons name="call-outline" size={28} color="#FFA726" />
            <Text style={styles.actionTitle}>Ajuda</Text>
            <Text style={styles.actionSubtitle}>CVV 188</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Ionicons name="flame-outline" size={24} color="#FF6B6B" />
          <Text style={styles.statNumber}>7</Text>
          <Text style={styles.statLabel}>Dias de sequência</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="heart-outline" size={24} color="#4A90A4" />
          <Text style={styles.statNumber}>85%</Text>
          <Text style={styles.statLabel}>Humor positivo</Text>
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  date: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 4,
    textTransform: 'capitalize',
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  motivationCard: {
    backgroundColor: '#E8F4F8',
    marginHorizontal: 20,
    marginVertical: 15,
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#4A90A4',
  },
  sparkleIcon: {
    marginRight: 12,
  },
  motivationText: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
    lineHeight: 22,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 15,
  },
  averageText: {
    fontSize: 14,
    color: '#4A90A4',
    fontWeight: '600',
  },
  moodQuickSelect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodBtn: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    width: (width - 60) / 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  moodEmoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 11,
    color: '#7F8C8D',
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 180,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  barEmoji: {
    fontSize: 18,
    marginBottom: 4,
  },
  barWrapper: {
    width: 32,
    height: 120,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderRadius: 8,
  },
  barLabel: {
    fontSize: 11,
    color: '#7F8C8D',
    marginTop: 6,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: (width - 50) / 2,
    padding: 20,
    borderRadius: 16,
    marginBottom: 10,
    alignItems: 'center',
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginTop: 8,
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 4,
    textAlign: 'center',
  },
});