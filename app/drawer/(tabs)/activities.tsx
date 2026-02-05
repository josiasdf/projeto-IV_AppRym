import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ActivitiesScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activities, setActivities] = useState([
    { id: 1, title: 'Meditar 10 minutos', icon: 'leaf-outline', color: '#A8D5BA', completed: false, category: 'Mindfulness' },
    { id: 2, title: 'Caminhar 30 minutos', icon: 'walk-outline', color: '#FFD93D', completed: false, category: 'Exercício' },
    { id: 3, title: 'Beber 2L de água', icon: 'water-outline', color: '#7FB3D5', completed: false, category: 'Saúde' },
    { id: 4, title: 'Ler 20 páginas', icon: 'book-outline', color: '#DDA0DD', completed: false, category: 'Lazer' },
    { id: 5, title: 'Ligar para um amigo', icon: 'call-outline', color: '#FFB6C1', completed: false, category: 'Social' },
    { id: 6, title: 'Registrar gratidão', icon: 'heart-outline', color: '#FFA07A', completed: false, category: 'Autocuidado' },
    { id: 7, title: 'Alongamento', icon: 'fitness-outline', color: '#98D8C8', completed: false, category: 'Exercício' },
    { id: 8, title: 'Dormir 8 horas', icon: 'moon-outline', color: '#B0C4DE', completed: false, category: 'Saúde' },
  ]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const days = getDaysInMonth(selectedDate);
  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const isSelectedDate = (date) => {
    if (!date) return false;
    return date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear();
  };

  const changeMonth = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() + direction);
    setSelectedDate(newDate);
  };

  const toggleActivity = (id) => {
    setActivities(activities.map(activity => 
      activity.id === id 
        ? { ...activity, completed: !activity.completed }
        : activity
    ));
  };

  const completedCount = activities.filter(a => a.completed).length;
  const totalCount = activities.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
    
      <View style={styles.header}>
        <Text style={styles.title}>Minhas Atividades</Text>
        <Text style={styles.subtitle}>Cuide do seu bem-estar diário</Text>
      </View>

    
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <View>
            <Text style={styles.progressTitle}>Progresso de Hoje</Text>
            <Text style={styles.progressSubtitle}>{completedCount} de {totalCount} atividades</Text>
          </View>
          <View style={styles.progressCircle}>
            <Text style={styles.progressNumber}>{Math.round(progressPercentage)}%</Text>
          </View>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
        </View>
      </View>

     
      <View style={styles.calendarContainer}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.monthButton}>
            <Ionicons name="chevron-back" size={24} color="#4A90A4" />
          </TouchableOpacity>
          <Text style={styles.monthYear}>
            {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
          </Text>
          <TouchableOpacity onPress={() => changeMonth(1)} style={styles.monthButton}>
            <Ionicons name="chevron-forward" size={24} color="#4A90A4" />
          </TouchableOpacity>
        </View>

        <View style={styles.weekDaysContainer}>
          {weekDays.map((day, index) => (
            <Text key={index} style={styles.weekDay}>{day}</Text>
          ))}
        </View>

        <View style={styles.daysGrid}>
          {days.map((day, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayCell,
                !day && styles.dayCellEmpty,
                isToday(day) && styles.dayToday,
                isSelectedDate(day) && styles.daySelected,
              ]}
              onPress={() => day && setSelectedDate(day)}
              disabled={!day}
            >
              {day && (
                <>
                  <Text style={[
                    styles.dayText,
                    isToday(day) && styles.dayTextToday,
                    isSelectedDate(day) && styles.dayTextSelected,
                  ]}>
                    {day.getDate()}
                  </Text>
                  {isToday(day) && completedCount > 0 && (
                    <View style={styles.dayDot} />
                  )}
                </>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.activitiesSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Atividades do Dia</Text>
          <TouchableOpacity>
            <Ionicons name="add-circle-outline" size={28} color="#4A90A4" />
          </TouchableOpacity>
        </View>

        {activities.map((activity) => (
          <TouchableOpacity
            key={activity.id}
            style={[
              styles.activityCard,
              activity.completed && styles.activityCardCompleted
            ]}
            onPress={() => toggleActivity(activity.id)}
            activeOpacity={0.7}
          >
            <View style={styles.activityLeft}>
              <View style={[styles.checkbox, activity.completed && styles.checkboxCompleted]}>
                {activity.completed && (
                  <Ionicons name="checkmark" size={18} color="#FFFFFF" />
                )}
              </View>
              <View style={[styles.activityIcon, { backgroundColor: activity.color }]}>
                <Ionicons name={activity.icon} size={22} color="#FFFFFF" />
              </View>
              <View style={styles.activityInfo}>
                <Text style={[
                  styles.activityTitle,
                  activity.completed && styles.activityTitleCompleted
                ]}>
                  {activity.title}
                </Text>
                <Text style={styles.activityCategory}>{activity.category}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.tipContainer}>
        <Ionicons name="bulb-outline" size={20} color="#4A90A4" />
        <Text style={styles.tipText}>
          Estabeleça uma rotina diária de atividades para melhorar seu bem-estar mental
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
  progressCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  progressSubtitle: {
    fontSize: 13,
    color: '#7F8C8D',
    marginTop: 2,
  },
  progressCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E8F4F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90A4',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E8F4F8',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4A90A4',
    borderRadius: 4,
  },
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  monthButton: {
    padding: 8,
  },
  monthYear: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  weekDay: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7F8C8D',
    width: 40,
    textAlign: 'center',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
  },
  dayCellEmpty: {
    backgroundColor: 'transparent',
  },
  dayToday: {
    backgroundColor: '#E8F4F8',
    borderRadius: 20,
  },
  daySelected: {
    backgroundColor: '#4A90A4',
    borderRadius: 20,
  },
  dayText: {
    fontSize: 14,
    color: '#2C3E50',
  },
  dayTextToday: {
    fontWeight: 'bold',
    color: '#4A90A4',
  },
  dayTextSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  dayDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#4A90A4',
    marginTop: 2,
  },
  activitiesSection: {
    paddingHorizontal: 20,
    marginTop: 20,
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
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  activityCardCompleted: {
    backgroundColor: '#F8F9FA',
    opacity: 0.8,
  },
  activityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#B0B0B0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxCompleted: {
    backgroundColor: '#4A90A4',
    borderColor: '#4A90A4',
  },
  activityIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2C3E50',
    marginBottom: 2,
  },
  activityTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#7F8C8D',
  },
  activityCategory: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F4F8',
    marginHorizontal: 20,
    marginTop: 20,
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

