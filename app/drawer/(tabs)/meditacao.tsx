
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MeditacaoScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = ['Todos', 'Ansiedade', 'Sono', 'Foco', 'Gratidão'];

  const videos = [
    {
      id: 1,
      title: 'Meditação para Ansiedade',
      duration: '10 min',
      category: 'Ansiedade',
      thumbnail: '🧘‍♀️',
      youtubeId: '1fYt92gSJ_U',
      description: 'Técnica guiada para acalmar a mente ansiosa',
      color: '#FFE5E5',
    },
    {
      id: 2,
      title: 'Meditação para Dormir',
      duration: '18 min',
      category: 'Sono',
      thumbnail: '🌙',
      youtubeId: '9u8USeMyIwo',
      description: 'Relaxamento profundo para uma noite tranquila',
      color: '#E3F2FD',
    },
    {
      id: 3,
      title: 'Meditação de Gratidão',
      duration: '7 min',
      category: 'Gratidão',
      thumbnail: '💝',
      youtubeId: 'Z_cWOox88T4',
      description: 'Cultive sentimentos positivos e gratidão',
      color: '#FFF3E0',
    },
    {
      id: 4,
      title: 'Foco e Concentração',
      duration: '12 min',
      category: 'Foco',
      thumbnail: '🎯',
      youtubeId: 'Hfptig4uHmI',
      description: 'Melhore sua produtividade e clareza mental',
      color: '#E8F5E9',
    },
    {
      id: 5,
      title: 'Respiração Consciente',
      duration: '8 min',
      category: 'Ansiedade',
      thumbnail: '🌬️',
      youtubeId: 'DUsx3EzIm2Q',
      description: 'Exercícios de respiração para reduzir estresse',
      color: '#F3E5F5',
    },
    {
      id: 6,
      title: 'Body Scan Relaxante',
      duration: '20 min',
      category: 'Sono',
      thumbnail: '✨',
      youtubeId: '0_OERIJXfYM',
      description: 'Escaneamento corporal para relaxamento total',
      color: '#E0F2F1',
    },
    {
      id: 7,
      title: 'Manhã Energizada',
      duration: '5 min',
      category: 'Foco',
      thumbnail: '☀️',
      youtubeId: 'IHODMlQtFcE',
      description: 'Comece o dia com energia e propósito',
      color: '#FFF9C4',
    },
    {
      id: 8,
      title: 'Amor Próprio',
      duration: '12 min',
      category: 'Gratidão',
      thumbnail: '💗',
      youtubeId: 'yKJ8jwIvrfA',
      description: 'Desenvolva compaixão e amor por si mesmo',
      color: '#FCE4EC',
    },
  ];

  const filteredVideos = selectedCategory === 'Todos' 
    ? videos 
    : videos.filter(v => v.category === selectedCategory);

  const openYoutube = (youtubeId) => {
    const url = `https://www.youtube.com/watch?v=${youtubeId}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#4A90A4" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meditações Guiadas</Text> 
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.categoriesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  selectedCategory === category && styles.categoryChipSelected
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextSelected
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.videosContainer}> 
          {filteredVideos.map((video) => (
            <TouchableOpacity
              key={video.id}
              style={[styles.videoCard, { backgroundColor: video.color }]}
              onPress={() => openYoutube(video.youtubeId)}
              activeOpacity={0.7}
            >
              <View style={styles.videoThumbnail}>
                <Text style={styles.thumbnailEmoji}>{video.thumbnail}</Text>
                <View style={styles.playButton}>
                  <Ionicons name="play" size={20} color="#FFFFFF" />
                </View>
              </View>
              
              <View style={styles.videoInfo}>
                <Text style={styles.videoTitle}>{video.title}</Text>
                <Text style={styles.videoDescription}>{video.description}</Text>
                
                <View style={styles.videoFooter}>
                  <View style={styles.durationBadge}>
                    <Ionicons name="time-outline" size={14} color="#7F8C8D" />
                    <Text style={styles.durationText}>{video.duration}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color="#7F8C8D" />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View> 

        <View style={styles.tipContainer}> 
          <Ionicons name="headset-outline" size={24} color="#4A90A4" />
          <Text style={styles.tipText}>
            Use fones de ouvido para uma experiência mais imersiva
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
  categoriesContainer: {
    paddingVertical: 20,
    paddingLeft: 20,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 10,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
  },
  categoryChipSelected: {
    backgroundColor: '#4A90A4',
    borderColor: '#4A90A4',
  },
  categoryText: {
    fontSize: 14,
    color: '#7F8C8D',
    fontWeight: '500',
  },
  categoryTextSelected: {
    color: '#FFFFFF',
  },
  videosContainer: {
    paddingHorizontal: 20,
  },
  videoCard: {
    flexDirection: 'row',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  videoThumbnail: {
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  thumbnailEmoji: {
    fontSize: 48,
  },
  playButton: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(74, 144, 164, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 10,
  },
  videoInfo: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 6,
  },
  videoDescription: {
    fontSize: 13,
    color: '#7F8C8D',
    lineHeight: 18,
    marginBottom: 10,
  },
  videoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  durationText: {
    fontSize: 12,
    color: '#7F8C8D',
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

