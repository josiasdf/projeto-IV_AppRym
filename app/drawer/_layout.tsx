import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false, // O Header vem das Tabs ou das páginas internas
        drawerActiveTintColor: '#4A90A4',
      }}
    >
      {/* Aponta para a pasta (tabs), que vai carregar o index.tsx primeiro */}
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'Início',
          title: 'Rescue Your Mind',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="ajustes"
        options={{
          headerShown: true,
          drawerLabel: 'Ajustes',
          title: 'Configurações',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="sobre"
        options={{
          headerShown: true,
          drawerLabel: 'Sobre',
          title: 'Sobre o App',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="information-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}