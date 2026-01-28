import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Switch,
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getProfile, logout } from '../services/auth';
import { getToken } from '../services/storage';

export default function SettingsScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    const load = async () => {
      const token = await getToken();
      const data = await getProfile(token);
      setUser(data);
    };
    load();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Logout", 
          onPress: () => logout(),
          style: "destructive"
        }
      ]
    );
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Ionicons name="settings-outline" size={48} color="#4F46E5" />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const SettingItem = ({ icon, title, subtitle, type = "navigation", value, onPress, onToggle }) => (
    <TouchableOpacity 
      style={styles.settingItem}
      onPress={onPress}
      disabled={type === "toggle" && !onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingIconContainer}>
        <Ionicons name={icon} size={22} color="#4F46E5" />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      <View style={styles.settingRight}>
        {type === "toggle" ? (
          <Switch
            value={value}
            onValueChange={onToggle}
            trackColor={{ false: "#E5E7EB", true: "#A5B4FC" }}
            thumbColor={value ? "#4F46E5" : "#9CA3AF"}
            ios_backgroundColor="#E5E7EB"
          />
        ) : type === "navigation" ? (
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        ) : (
          <Text style={styles.settingValue}>{value}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const Section = ({ title, children }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>
        {children}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle" size={80} color="#4F46E5" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileEmail}>{user.email}</Text>
            <View style={styles.memberSinceContainer}>
              <Ionicons name="time-outline" size={14} color="#6B7280" />
              <Text style={styles.memberSince}>Member since March 2024</Text>
            </View>
          </View>
        </View>

        {/* Account Section */}
        <Section title="ACCOUNT">
          <SettingItem
            icon="person-outline"
            title="Personal Information"
            subtitle="Update your name and contact details"
            type="navigation"
            onPress={() => {/* Navigate to edit profile */}}
          />
          <SettingItem
            icon="lock-closed-outline"
            title="Security"
            subtitle="Change password and 2FA settings"
            type="navigation"
            onPress={() => {/* Navigate to security */}}
          />
          <SettingItem
            icon="card-outline"
            title="Subscription"
            subtitle="Premium Plan • Active"
            value="Manage"
            type="navigation"
            onPress={() => {/* Navigate to subscription */}}
          />
        </Section>

        {/* Preferences Section */}
        <Section title="PREFERENCES">
          <SettingItem
            icon="notifications-outline"
            title="Push Notifications"
            subtitle="Get updates on new releases"
            type="toggle"
            value={notifications}
            onToggle={setNotifications}
          />
          <SettingItem
            icon="moon-outline"
            title="Dark Mode"
            subtitle="Switch to dark theme"
            type="toggle"
            value={darkMode}
            onToggle={setDarkMode}
          />
          <SettingItem
            icon="play-circle-outline"
            title="Auto-play Videos"
            subtitle="Play next video automatically"
            type="toggle"
            value={autoPlay}
            onToggle={setAutoPlay}
          />
          <SettingItem
            icon="download-outline"
            title="Download Quality"
            subtitle="High quality (HD)"
            value="Change"
            type="navigation"
            onPress={() => {/* Navigate to quality settings */}}
          />
        </Section>

        {/* Support Section */}
        <Section title="SUPPORT">
          <SettingItem
            icon="help-circle-outline"
            title="Help Center"
            subtitle="FAQs and troubleshooting"
            type="navigation"
            onPress={() => {/* Navigate to help */}}
          />
          <SettingItem
            icon="document-text-outline"
            title="Terms & Policies"
            subtitle="Terms of service and privacy"
            type="navigation"
            onPress={() => {/* Navigate to terms */}}
          />
          <SettingItem
            icon="chatbubble-outline"
            title="Contact Support"
            subtitle="Get help from our team"
            type="navigation"
            onPress={() => {/* Navigate to contact */}}
          />
        </Section>

        {/* About Section */}
        <Section title="ABOUT">
          <SettingItem
            icon="information-circle-outline"
            title="App Version"
            subtitle="NCS Video Platform"
            value="v2.1.0"
          />
          <SettingItem
            icon="star-outline"
            title="Rate the App"
            subtitle="Share your feedback"
            type="navigation"
            onPress={() => {/* Open app store */}}
          />
        </Section>

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Ionicons name="log-out-outline" size={22} color="#EF4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.copyright}>
          © 2024 NCS Dashboard. All rights reserved.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'white',
    marginTop: 8,
    marginHorizontal: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 8,
  },
  avatarContainer: {
    marginRight: 20,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 8,
  },
  memberSinceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  memberSince: {
    fontSize: 13,
    color: '#6B7280',
  },
  section: {
    marginTop: 24,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    paddingLeft: 8,
  },
  sectionContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingIconContainer: {
    width: 40,
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  settingRight: {
    marginLeft: 12,
  },
  settingValue: {
    fontSize: 14,
    color: '#4F46E5',
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginTop: 32,
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    gap: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
  copyright: {
    textAlign: 'center',
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 32,
    marginHorizontal: 16,
  },
});