import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function MindfullScreen() {
  const router = useRouter();

  const benefits = [
    { icon: 'heart-outline', text: 'Reduz ansiedade', color: '#FF6B6B' },
    { icon: 'moon-outline', text: 'Melhora o sono', color: '#4A90A4' },
    { icon: 'happy-outline', text: 'Aumenta o foco', color: '#FFD93D' },
    { icon: 'fitness-outline', text: 'Diminui estresse', color: '#6BCF7F' },
  ];

  const tips = [
    "Reserve 5-10 minutos diários para praticar",
    "Encontre um lugar tranquilo e confortável",
    "Não julgue seus pensamentos, apenas observe",
    "A constância é mais importante que a duração",
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      <View style={styles.header}>
        <Text style={styles.title}>Mindfulness</Text>
        <Text style={styles.subtitle}>Práticas de autocuidado e bem-estar</Text>
      </View>

      <View style={styles.cardsContainer}>
        
        {/* CARD DE RESPIRAÇÃO */}
        <TouchableOpacity 
          style={[styles.mainCard, { backgroundColor: '#E8F5E9' }]}
          // CORREÇÃO AQUI: Caminho atualizado para a pasta (tabs)
          onPress={() => router.push('/drawer/(tabs)/respiracao')}
          activeOpacity={0.8}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.iconCircle, { backgroundColor: '#66BB6A' }]}>
              <Ionicons name="leaf" size={32} color="#FFFFFF" />
            </View>
            <Ionicons name="arrow-forward" size={24} color="#66BB6A" />
          </View>
          <Text style={styles.cardTitle}>Respiração Guiada</Text>
          <Text style={styles.cardDescription}>
            Exercícios de respiração para acalmar a mente e reduzir ansiedade
          </Text>
          <View style={styles.cardFooter}>
            <View style={styles.badge}>
              <Ionicons name="time-outline" size={14} color="#66BB6A" />
              <Text style={[styles.badgeText, { color: '#66BB6A' }]}>5-15 min</Text>
            </View>
            <View style={styles.badge}>
              <Ionicons name="flame-outline" size={14} color="#66BB6A" />
              <Text style={[styles.badgeText, { color: '#66BB6A' }]}>Iniciante</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* CARD DE MEDITAÇÃO */}
        <TouchableOpacity 
          style={[styles.mainCard, { backgroundColor: '#E3F2FD' }]}
          // CORREÇÃO AQUI: Caminho atualizado para a pasta (tabs)
          onPress={() => router.push('/drawer/(tabs)/meditacao')}
          activeOpacity={0.8}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.iconCircle, { backgroundColor: '#42A5F5' }]}>
              <Ionicons name="musical-notes" size={32} color="#FFFFFF" />
            </View>
            <Ionicons name="arrow-forward" size={24} color="#42A5F5" />
          </View>
          <Text style={styles.cardTitle}>Meditações Guiadas</Text>
          <Text style={styles.cardDescription}>
            Vídeos e áudios de meditação para diversos momentos do seu dia
          </Text>
          <View style={styles.cardFooter}>
            <View style={styles.badge}>
              <Ionicons name="videocam-outline" size={14} color="#42A5F5" />
              <Text style={[styles.badgeText, { color: '#42A5F5' }]}>12 vídeos</Text>
            </View>
            <View style={styles.badge}>
              <Ionicons name="star-outline" size={14} color="#42A5F5" />
              <Text style={[styles.badgeText, { color: '#42A5F5' }]}>Variados</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Por que praticar mindfulness?</Text>
        <View style={styles.benefitsGrid}>
          {benefits.map((benefit, index) => (
            <View key={index} style={styles.benefitCard}>
              <View style={[styles.benefitIcon, { backgroundColor: `${benefit.color}20` }]}>
                <Ionicons name={benefit.icon} size={24} color={benefit.color} />
              </View>
              <Text style={styles.benefitText}>{benefit.text}</Text>
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dicas para começar</Text>
        <View style={styles.tipsContainer}>
          {tips.map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <View style={styles.tipNumber}>
                <Text style={styles.tipNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.quoteContainer}>
        <Ionicons name="chatbox-ellipses-outline" size={24} color="#4A90A4" />
        <Text style={styles.quoteText}>
          "A paz vem de dentro de você. Não a procure fora."
        </Text>
        <Text style={styles.quoteAuthor}>- Buda</Text>
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
  cardsContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  mainCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 15,
    color: '#7F8C8D',
    lineHeight: 22,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    gap: 10,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 16,
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  benefitCard: {
    width: (width - 50) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  benefitIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitText: {
    fontSize: 14,
    color: '#2C3E50',
    textAlign: 'center',
    fontWeight: '500',
  },
  tipsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  tipNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E8F4F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tipNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A90A4',
  },
  tipText: {
    flex: 1,
    fontSize: 15,
    color: '#2C3E50',
    lineHeight: 22,
  },
  quoteContainer: {
    marginHorizontal: 20,
    marginTop: 30,
    backgroundColor: '#E8F4F8',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#4A90A4',
  },
  quoteText: {
    fontSize: 16,
    color: '#2C3E50',
    fontStyle: 'italic',
    lineHeight: 24,
    marginTop: 12,
  },
  quoteAuthor: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 8,
    textAlign: 'right',
  },
});