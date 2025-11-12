// src/screens/SettingsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';

// Mock user – replace with real auth later
const initialUser = {
  name: 'John K. Doe',
  employeeId: '#EMP-0481',
  role: 'Site Foreman',
  department: 'Civil Works',
  site: 'Main Site – Phase 1',
  phone: '+1 555-0192',
  email: 'john.doe@obgd.com',
};

export default function SettingsScreen() {
  const [user, setUser] = useState(initialUser);
  const [savedUser, setSavedUser] = useState(initialUser);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const appVersion = '1.0.0';

  const updateField = (field, value) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

  const saveProfile = () => {
    const { name, phone, email } = user;
    if (!name.trim()) {
      Alert.alert('Error', 'Name cannot be empty');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Error', 'Enter a valid email');
      return;
    }
    setSavedUser(user);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    Alert.alert('Theme', `Dark mode ${!isDarkMode ? 'enabled' : 'disabled'}`);
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'You have been logged out.', [
      { text: 'OK', onPress: () => console.log('Logged out') },
    ]);
  };

  const clearCache = () => {
    Alert.alert('Cache Cleared', 'All local data removed.');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Settings</Text>

      {/* === PROFILE SECTION === */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Edit Profile</Text>

        {/* Employee ID - READ ONLY */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Employee ID</Text>
          <View style={styles.readOnlyInput}>
            <Text style={styles.readOnlyText}>{user.employeeId}</Text>
          </View>
        </View>

        {/* Full Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={user.name}
            onChangeText={(v) => updateField('name', v)}
            placeholder="Enter full name"
          />
        </View>

        {/* Role */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Role</Text>
          <TextInput
            style={styles.input}
            value={user.role}
            onChangeText={(v) => updateField('role', v)}
            placeholder="e.g., Site Foreman"
          />
        </View>

        {/* Department */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Department</Text>
          <TextInput
            style={styles.input}
            value={user.department}
            onChangeText={(v) => updateField('department', v)}
            placeholder="e.g., Civil Works"
          />
        </View>

        {/* Site */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Site</Text>
          <TextInput
            style={styles.input}
            value={user.site}
            onChangeText={(v) => updateField('site', v)}
            placeholder="e.g., Main Site – Phase 1"
          />
        </View>

        {/* Phone */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={user.phone}
            onChangeText={(v) => updateField('phone', v)}
            placeholder="+1 555-0192"
            keyboardType="phone-pad"
          />
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={user.email}
            onChangeText={(v) => updateField('email', v)}
            placeholder="name@obgd.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveBtn} onPress={saveProfile}>
          <Text style={styles.saveText}>Save All Changes</Text>
        </TouchableOpacity>
      </View>

      {/* === PREFERENCES === */}
      

      {/* === ABOUT === */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>App Version</Text>
          <Text style={styles.infoValue}>{appVersion}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Company</Text>
          <Text style={styles.infoValue}>OBGGD Limited</Text>
        </View>
      </View>

      {/* === ACTIONS === */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.actionBtn} onPress={clearCache}>
          <Text style={styles.actionText}>Clear Cache</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.logoutBtn]} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* === FOOTER === */}
      <Text style={styles.footer}>
        BuildLog – Construction Workforce Management
      </Text>
    </ScrollView>
  );
}

/* ============================== STYLES ============================== */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 24, paddingBottom: 40 },

  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#D4A017',
    textAlign: 'center',
    marginBottom: 30,
  },

  // Section
  section: {
    backgroundColor: '#f8f8f8',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 16,
  },

  // Inputs
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, color: '#7F8C8D', marginBottom: 6 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  readOnlyInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  readOnlyText: {
    fontSize: 16,
    color: '#555',
    fontWeight: '600',
  },

  // Save Button
  saveBtn: {
    backgroundColor: '#E67E22',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 8,
  },
  saveText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  // Preferences
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingLabel: { fontSize: 16, color: '#2C3E50', fontWeight: '600' },
  settingDesc: { fontSize: 13, color: '#95A5A6' },

  // About
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  infoLabel: { fontSize: 15, color: '#7F8C8D' },
  infoValue: { fontSize: 15, color: '#2C3E50', fontWeight: '500' },

  // Actions
  actionBtn: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  actionText: { color: '#2C3E50', fontWeight: '600' },
  logoutBtn: {
    backgroundColor: '#E74C3C',
    borderColor: '#E74C3C',
  },
  logoutText: { color: '#fff', fontWeight: 'bold' },

  // Footer
  footer: {
    textAlign: 'center',
    color: '#95A5A6',
    fontSize: 13,
    marginTop: 20,
    fontStyle: 'italic',
  },
});