import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SobreScreen() {
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  const features = [
    { icon: 'happy-outline', title: 'Registro de Humor', description: 'Monitore suas emoções diariamente' },
    { icon: 'book-outline', title: 'Diário Pessoal', description: 'Escreva sobre seus sentimentos' },
    { icon: 'leaf-outline', title: 'Mindfulness', description: 'Exercícios de respiração e meditação' },
    { icon: 'list-outline', title: 'Atividades', description: 'Organize sua rotina de bem-estar' },
  ];

  const team = [
    { name: 'Equipe RYM', role: 'Desenvolvedores' },
  ];

  const emergency = [
    { icon: 'call-outline', title: 'CVV - 188', subtitle: 'Centro de Valorização da Vida', number: '188' },
    { icon: 'call-outline', title: 'CAPS', subtitle: 'Centro de Atenção Psicossocial', number: '191' },
    { icon: 'call-outline', title: 'Emergência', subtitle: 'SAMU', number: '192' },
  ];

  return (
    
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
             <Image source={require('../assets/logo_rym.png')} style={styles.logoContainer} />
          </View>
        </View>
        <Text style={styles.appName}>Rescue Your Mind</Text>
        <Text style={styles.tagline}>Cuidando da sua saúde mental</Text>
      </View>
   <View style={styles.motivationCard}>
        <Ionicons name="heart" size={20} color="#7F8C8D" />
        <Text style={styles.disclaimerText}>
          <Text style={styles.motivationText}>Lembre-se:</Text> Toda pessoa é um Universo em Crise! Cuide-se. 🕊️
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="ribbon-outline" size={24} color="#4A90A4" />
          <Text style={styles.sectionTitle}>Nossa Missão</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.missionText}>
            O Rescue Your Mind foi criado com o propósito de tornar o cuidado com a saúde mental 
            mais acessível e prático. Acreditamos que pequenas ações diárias podem transformar 
            vidas e promover bem-estar emocional.
          </Text>
          <Text style={styles.missionText}>
            Nosso app oferece ferramentas baseadas em práticas comprovadas de mindfulness, 
            registro emocional e autocuidado, ajudando você a desenvolver maior consciência 
            sobre seus sentimentos e padrões comportamentais.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="rocket-outline" size={24} color="#4A90A4" />
          <Text style={styles.sectionTitle}>Principais Recursos</Text>
        </View>
        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Ionicons name={feature.icon} size={28} color="#4A90A4" />
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="star-outline" size={24} color="#4A90A4" />
          <Text style={styles.sectionTitle}>Nossos Valores</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.valueItem}>
            <View style={styles.valueDot} />
            <Text style={styles.valueText}><Text style={styles.valueBold}>Privacidade:</Text> Seus dados são protegidos e confidenciais</Text>
          </View>
          <View style={styles.valueItem}>
            <View style={styles.valueDot} />
            <Text style={styles.valueText}><Text style={styles.valueBold}>Acessibilidade:</Text> Saúde mental para todos</Text>
          </View>
          <View style={styles.valueItem}>
            <View style={styles.valueDot} />
            <Text style={styles.valueText}><Text style={styles.valueBold}>Empatia:</Text> Compreendemos suas necessidades</Text>
          </View>
          <View style={styles.valueItem}>
            <View style={styles.valueDot} />
            <Text style={styles.valueText}><Text style={styles.valueBold}>Ciência:</Text> Práticas baseadas em evidências</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="shield-checkmark-outline" size={24} color="#FF6B6B" />
          <Text style={[styles.sectionTitle, { color: '#FF6B6B' }]}>Recursos de Emergência</Text>
        </View>
        <View style={styles.emergencyCard}>
          <Text style={styles.emergencyText}>
            Se você está em crise, não hesite em buscar ajuda profissional imediatamente.
          </Text>
          {emergency.map((resource, index) => (
            <TouchableOpacity
              key={index}
              style={styles.emergencyItem}
              onPress={() => Linking.openURL(`tel:${resource.number}`)}
            >
              <View style={styles.emergencyIcon}>
                <Ionicons name={resource.icon} size={24} color="#FF6B6B" />
              </View>
              <View style={styles.emergencyInfo}>
                <Text style={styles.emergencyTitle}>{resource.title}</Text>
                <Text style={styles.emergencySubtitle}>{resource.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#B0B0B0" />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="people-outline" size={24} color="#4A90A4" />
          <Text style={styles.sectionTitle}>Equipe</Text>
        </View>
        <View style={styles.card}>
          {team.map((member, index) => (
            <View key={index} style={styles.teamMember}>
              <View style={styles.teamAvatar}>
                <Ionicons name="person" size={24} color="#4A90A4" />
              </View>
              <View>
                <Text style={styles.teamName}>{member.name}</Text>
                <Text style={styles.teamRole}>{member.role}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="share-social-outline" size={24} color="#4A90A4" />
          <Text style={styles.sectionTitle}>Conecte-se Conosco</Text>
        </View>
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-instagram" size={24} color="#E4405F" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-facebook" size={24} color="#1877F2" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="mail-outline" size={24} color="#4A90A4" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.disclaimerContainer}>
        <Ionicons name="information-circle-outline" size={20} color="#7F8C8D" />
        <Text style={styles.disclaimerText}>
          <Text style={styles.disclaimerBold}>Importante:</Text> Este aplicativo não substitui 
          tratamento médico ou psicológico profissional. Se você está enfrentando problemas 
          sérios de saúde mental, procure um profissional qualificado.
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Rescue Your Mind © 2025</Text>
        <Text style={styles.footerVersion}>Versão 1.0.0</Text>
      </View>

      <View style={{ height: 30 }} />

     
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  logoContainer: {
    marginBottom: 20,
    width: 200,
    height:200,
  },
  logo: {
    width: 180,
    height: 180,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4A90A4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  logoImage: {
    width: '80%',
    height: '80%',
  },
  appName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 14,
    color: '#7F8C8D',
    fontStyle: 'italic',
  },
  section: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginLeft: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  missionText: {
    fontSize: 15,
    color: '#2C3E50',
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'justify',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
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
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E8F4F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 16,
  },
  valueItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  valueDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4A90A4',
    marginTop: 6,
    marginRight: 12,
  },
  valueText: {
    flex: 1,
    fontSize: 14,
    color: '#2C3E50',
    lineHeight: 20,
  },
  valueBold: {
    fontWeight: '600',
    color: '#4A90A4',
  },
  emergencyCard: {
    backgroundColor: '#FFF5F5',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#FFE5E5',
  },
  emergencyText: {
    fontSize: 14,
    color: '#2C3E50',
    marginBottom: 15,
    lineHeight: 20,
    fontWeight: '500',
  },
  emergencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  emergencyIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFE5E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  emergencyInfo: {
    flex: 1,
  },
  emergencyTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 2,
  },
  emergencySubtitle: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  teamMember: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  teamAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8F4F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  teamName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 2,
  },
  teamRole: {
    fontSize: 13,
    color: '#7F8C8D',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  disclaimerContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF9E6',
    marginHorizontal: 20,
    marginTop: 25,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FFA726',
  },
  disclaimerText: {
    flex: 1,
    fontSize: 13,
    color: '#2C3E50',
    marginLeft: 10,
    lineHeight: 18,
  },
  disclaimerBold: {
    fontWeight: '600',
    color: '#FFA726',
  },
  footer: {
    alignItems: 'center',
    marginTop: 30,
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 13,
    color: '#7F8C8D',
    marginBottom: 4,
  },
  footerVersion: {
    fontSize: 11,
    color: '#B0B0B0',
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
  motivationText: {
    flex: 1,
    fontSize: 16,
    color: '#051c33ff',
    lineHeight: 22,
    fontWeight: '500',
  },
});