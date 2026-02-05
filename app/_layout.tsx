import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Telas de Autenticação (fora do drawer) */}
        <Stack.Screen 
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="RegistroUser"
          options={{
            headerShown: false,
          }}
        />
        
        {/* Drawer (sem parênteses) */}
        <Stack.Screen 
          name="drawer"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}