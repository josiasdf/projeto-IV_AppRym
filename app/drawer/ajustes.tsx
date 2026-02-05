import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function SettingScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

const handleLogout = async () => {
  Alert.alert(
    'Sair da Conta',
    'Deseja realmente sair?',
    [
      { text: 'Cancelar', style: 'cancel' },
      { 
        text: 'Sair', 
        style: 'destructive', 
        onPress: async () => {
          await AsyncStorage.removeItem('userToken');
          router.replace('/');
        }
      }
    ]
  );
};

  const handleDeleteAccount = () => {
    Alert.alert(
      'Excluir Conta',
      'Esta ação é irreversível. Todos os seus dados serão permanentemente apagados.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive', 
          onPress: () => {
            // Aqui você faria a exclusão real da conta
            Alert.alert(
              'Conta Excluída', 
              'Sua conta foi excluída.',
              [
                {
                  text: 'OK',
                  onPress: () => router.replace('/')
                }
              ]
            );
          }
        }
      ]
    );
  };

  const handleExportData = () => {
    Alert.alert('Exportar Dados', 'Seus dados foram exportados com sucesso em formato PDF!');
  };

  const handleEditProfile = () => {
    Alert.alert('Editar Perfil', 'Funcionalidade em desenvolvimento');
  };

  const handleChangePassword = () => {
    Alert.alert('Alterar Senha', 'Funcionalidade em desenvolvimento');
  };

  const handleHelpCenter = () => {
    Alert.alert('Central de Ajuda', 'Abrindo FAQ e tutoriais...');
  };

  const handleContactUs = () => {
    Alert.alert('Fale Conosco', 'Abrindo formulário de contato...');
  };

  const handleRateApp = () => {
    Alert.alert('Avaliar App', 'Abrindo loja de aplicativos...');
  };

  const handleTerms = () => {
    Alert.alert('Termos de Uso', 'Abrindo termos de uso...');
  };

  const handlePrivacy = () => {
    Alert.alert('Política de Privacidade', 'Abrindo política de privacidade...');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={48} color="#4A90A4" />
          </View>
          <TouchableOpacity style={styles.editAvatarBtn}>
            <Ionicons name="camera" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>Usuário RYM</Text>
        <Text style={styles.userEmail}>usuario@email.com</Text>
        <TouchableOpacity style={styles.editProfileBtn} onPress={handleEditProfile}>
          <Text style={styles.editProfileText}>Editar Perfil</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notificações</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <View style={[styles.iconCircle, { backgroundColor: '#FFE5E5' }]}>
              <Ionicons name="notifications-outline" size={20} color="#FF6B6B" />
            </View>
            <View>
              <Text style={styles.settingTitle}>Notificações Push</Text>
              <Text style={styles.settingSubtitle}>Receber lembretes diários</Text>
            </View>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#E0E0E0', true: '#A8D5BA' }}
            thumbColor={notificationsEnabled ? '#4A90A4' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <View style={[styles.iconCircle, { backgroundColor: '#FFF3E0' }]}>
              <Ionicons name="volume-medium-outline" size={20} color="#FFA726" />
            </View>
            <View>
              <Text style={styles.settingTitle}>Sons</Text>
              <Text style={styles.settingSubtitle}>Efeitos sonoros do app</Text>
            </View>
          </View>
          <Switch
            value={soundEnabled}
            onValueChange={setSoundEnabled}
            trackColor={{ false: '#E0E0E0', true: '#A8D5BA' }}
            thumbColor={soundEnabled ? '#4A90A4' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Aparência</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <View style={[styles.iconCircle, { backgroundColor: '#E3F2FD' }]}>
              <Ionicons name="moon-outline" size={20} color="#42A5F5" />
            </View>
            <View>
              <Text style={styles.settingTitle}>Modo Escuro</Text>
              <Text style={styles.settingSubtitle}>Interface com tema escuro</Text>
            </View>
          </View>
          <Switch
            value={darkModeEnabled}
            onValueChange={setDarkModeEnabled}
            trackColor={{ false: '#E0E0E0', true: '#A8D5BA' }}
            thumbColor={darkModeEnabled ? '#4A90A4' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Segurança e Privacidade</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <View style={[styles.iconCircle, { backgroundColor: '#F3E5F5' }]}>
              <Ionicons name="finger-print-outline" size={20} color="#AB47BC" />
            </View>
            <View>
              <Text style={styles.settingTitle}>Biometria</Text>
              <Text style={styles.settingSubtitle}>Desbloquear com digital/face</Text>
            </View>
          </View>
          <Switch
            value={biometricEnabled}
            onValueChange={setBiometricEnabled}
            trackColor={{ false: '#E0E0E0', true: '#A8D5BA' }}
            thumbColor={biometricEnabled ? '#4A90A4' : '#f4f3f4'}
          />
        </View>

        <TouchableOpacity style={styles.settingItem} onPress={handleChangePassword}>
          <View style={styles.settingLeft}>
            <View style={[styles.iconCircle, { backgroundColor: '#E8F5E9' }]}>
              <Ionicons name="lock-closed-outline" size={20} color="#66BB6A" />
            </View>
            <View>
              <Text style={styles.settingTitle}>Alterar Senha</Text>
              <Text style={styles.settingSubtitle}>Atualizar senha de acesso</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#B0B0B0" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={handleExportData}>
          <View style={styles.settingLeft}>
            <View style={[styles.iconCircle, { backgroundColor: '#FFF9C4' }]}>
              <Ionicons name="download-outline" size={20} color="#FBC02D" />
            </View>
            <View>
              <Text style={styles.settingTitle}>Exportar Dados</Text>
              <Text style={styles.settingSubtitle}>Baixar seus dados em PDF</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#B0B0B0" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Suporte</Text>
        
        <TouchableOpacity style={styles.settingItem} onPress={handleHelpCenter}>
          <View style={styles.settingLeft}>
            <View style={[styles.iconCircle, { backgroundColor: '#E8F4F8' }]}>
              <Ionicons name="help-circle-outline" size={20} color="#4A90A4" />
            </View>
            <View>
              <Text style={styles.settingTitle}>Central de Ajuda</Text>
              <Text style={styles.settingSubtitle}>FAQ e tutoriais</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#B0B0B0" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={handleContactUs}>
          <View style={styles.settingLeft}>
            <View style={[styles.iconCircle, { backgroundColor: '#FCE4EC' }]}>
              <Ionicons name="mail-outline" size={20} color="#EC407A" />
            </View>
            <View>
              <Text style={styles.settingTitle}>Fale Conosco</Text>
              <Text style={styles.settingSubtitle}>Envie sugestões e feedback</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#B0B0B0" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={handleRateApp}>
          <View style={styles.settingLeft}>
            <View style={[styles.iconCircle, { backgroundColor: '#F3E5F5' }]}>
              <Ionicons name="star-outline" size={20} color="#9C27B0" />
            </View>
            <View>
              <Text style={styles.settingTitle}>Avaliar o App</Text>
              <Text style={styles.settingSubtitle}>Deixe sua avaliação</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#B0B0B0" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.settingItem} onPress={handleTerms}>
          <View style={styles.settingLeft}>
            <View style={[styles.iconCircle, { backgroundColor: '#E0F2F1' }]}>
              <Ionicons name="document-text-outline" size={20} color="#26A69A" />
            </View>
            <View>
              <Text style={styles.settingTitle}>Termos de Uso</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#B0B0B0" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={handlePrivacy}>
          <View style={styles.settingLeft}>
            <View style={[styles.iconCircle, { backgroundColor: '#FFF3E0' }]}>
              <Ionicons name="shield-checkmark-outline" size={20} color="#FF9800" />
            </View>
            <View>
              <Text style={styles.settingTitle}>Política de Privacidade</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#B0B0B0" />
        </TouchableOpacity>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Versão 1.0.0</Text>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#4A90A4" />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
          <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
          <Text style={styles.deleteText}>Excluir Conta</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  profileSection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 30,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E8F4F8',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E8F4F8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4A90A4',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 15,
  },
  editProfileBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E8F4F8',
    borderWidth: 1,
    borderColor: '#4A90A4',
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A90A4',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#2C3E50',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  versionText: {
    fontSize: 12,
    color: '#B0B0B0',
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: '#4A90A4',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A90A4',
    marginLeft: 8,
  },
  deleteButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#FF6B6B',
  },
  deleteText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
    marginLeft: 8,
  },
});