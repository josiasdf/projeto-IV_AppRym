import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { Tabs, useNavigation } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // 1. Importação nova

export default function TabLayout() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets(); // 2. Pegamos as medidas de segurança do celular

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#4A90A4',
        tabBarInactiveTintColor: '#95a5a6',
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          // 3. Ajuste dinâmico: Altura base (70) + o espaço dos botões do Android
          height: 70 + insets.bottom, 
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          // 4. Empurra os ícones para cima para não ficarem escondidos
          paddingBottom: 10 + insets.bottom, 
          paddingTop: 10,
        },
        headerLeft: () => (
          <TouchableOpacity 
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())} 
            style={{ marginLeft: 16 }}
          >
            <Ionicons name="menu" size={28} color="#4A90A4" />
          </TouchableOpacity>
        ),
      }}
    >
      {/* 1. INÍCIO */}
      <Tabs.Screen
        name="index" 
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
        }}
      />
      
      {/* 2. HUMOR */}
      <Tabs.Screen
        name="register"
        options={{
          title: 'Humor',
          tabBarIcon: ({ color }) => <Ionicons name="happy-outline" size={24} color={color} />,
        }}
      />

      {/* 3. DIÁRIO (BOTÃO DESTAQUE) */}
      <Tabs.Screen
        name="diario"
        options={{
          title: '', 
          tabBarIcon: ({ focused }) => (
            <View style={styles.highlightButton}>
              <Ionicons name="heart" size={32} color="#FFFFFF" />
            </View>
          ),
        }}
      />

      {/* 4. RELAXE */}
      <Tabs.Screen
        name="mindfull"
        options={{
          title: 'Relaxe',
          tabBarIcon: ({ color }) => <Ionicons name="leaf-outline" size={24} color={color} />,
        }}
      />

      {/* 5. SEU DIA */}
      <Tabs.Screen
        name="activities"
        options={{
          title: 'Seu Dia',
          tabBarIcon: ({ color }) => <Ionicons name="list-outline" size={24} color={color} />,
        }}
      />

      {/* --- TELAS OCULTAS --- */}
      <Tabs.Screen name="meditacao" options={{ href: null }} />
      <Tabs.Screen name="respiracao" options={{ href: null }} />
      
    </Tabs>
  );
}

const styles = StyleSheet.create({
  highlightButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#66BB6A',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30, // Mantém o efeito flutuante
    shadowColor: '#66BB6A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  }
});