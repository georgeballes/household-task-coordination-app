import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTaskContext } from '../context/TaskContext';

const ProfileScreen = ({ navigation }) => {
  const { currentUser, logout, members } = useTaskContext();
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  const settingsOptions = [
    { icon: '👥', label: 'Household Members', screen: 'HouseholdMembers' },
    { icon: '🔔', label: 'Notifications', screen: 'Notifications' },
    { icon: '🔄', label: 'Task Preferences', screen: 'TaskPreferences' },
    { icon: '🎨', label: 'Appearance', screen: 'Appearance' },
    { icon: '❓', label: 'Help & Support', screen: 'Support' }
  ];

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            logout();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{currentUser.name.charAt(0)}</Text>
          </View>
          <Text style={styles.userName}>{currentUser.name}</Text>
        </View>
        
        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{currentUser.stats.totalTasks}</Text>
            <Text style={styles.statLabel}>Tasks</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{currentUser.stats.completedTasks}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{currentUser.stats.pendingTasks}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>
        
        {/* Household Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Your Household</Text>
          <View style={styles.householdCard}>
            <Text style={styles.householdName}>{currentUser.household}</Text>
            <TouchableOpacity style={styles.manageButton}>
              <Text style={styles.manageButtonText}>Manage</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Settings Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          {/* Notification Toggle */}
          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingIconContainer}>
                <Text style={styles.settingIcon}>🔔</Text>
              </View>
              <Text style={styles.settingLabel}>Notifications</Text>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#D1D1D6', true: '#4A80F0' }}
                thumbColor={'#FFFFFF'}
              />
            </View>
          </View>
          
          {/* Other Settings */}
          <View style={styles.settingCard}>
            {settingsOptions.slice(1).map((option, index) => (
              <TouchableOpacity 
                key={index} 
                style={[
                  styles.settingRow,
                  index < settingsOptions.length - 2 && styles.settingBorder
                ]}
              >
                <View style={styles.settingIconContainer}>
                  <Text style={styles.settingIcon}>{option.icon}</Text>
                </View>
                <Text style={styles.settingLabel}>{option.label}</Text>
                <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: '#4A80F0',
    paddingTop: 30,
    paddingBottom: 40,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#4A80F0',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: -25,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#777777',
  },
  sectionContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  householdCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  householdName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  manageButton: {
    backgroundColor: '#4A80F0',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  manageButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  settingCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  settingBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingIconContainer: {
    width: 30,
    alignItems: 'center',
    marginRight: 10,
  },
  settingIcon: {
    fontSize: 20,
  },
  settingLabel: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  logoutButton: {
    marginHorizontal: 20,
    marginVertical: 30,
    borderWidth: 2,
    borderColor: '#F44336',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: '#F44336',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
