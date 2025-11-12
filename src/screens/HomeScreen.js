// src/screens/HomeScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

// Mock user – replace with real auth later
const currentUser = {
  name: 'John K. Doe',
  employeeId: '#EMP-0481',
  role: 'Site Foreman',
  department: 'Civil Works',
  site: 'Main Site – Phase 1',
  phone: '+1 555-0192',
  email: 'john.doe@obgd.com',
  joinDate: '15 Mar 2023',
};

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* === EMPLOYEE ID CARD === */}
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>C</Text>
          </View>
          <Text style={styles.company}>OBGGD LIMITED</Text>
        </View>

        {/* Avatar + Name */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {currentUser.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
          <Text style={styles.name}>{currentUser.name}</Text>
          <Text style={styles.employeeId}>{currentUser.employeeId}</Text>
        </View>

        {/* Details */}
        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Role</Text>
            <Text style={styles.value}>{currentUser.role}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Department</Text>
            <Text style={styles.value}>{currentUser.department}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Site</Text>
            <Text style={styles.value}>{currentUser.site}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{currentUser.phone}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{currentUser.email}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Joined</Text>
            <Text style={styles.value}>{currentUser.joinDate}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Engineering & Construction</Text>
          <Text style={styles.footerText}>BuildLog v1.0</Text>
        </View>
      </View>

      {/* === QUICK ACTIONS === */}
      <View style={styles.actions}>
        <Text style={styles.actionTitle}>Quick Actions</Text>
        <View style={styles.actionRow}>
          {/* Check In */}
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionIcon}>📱</Text>
            <Text style={styles.actionLabel}>Check In</Text>
          </TouchableOpacity>

          {/* Daily Log */}
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionIcon}>📋</Text>
            <Text style={styles.actionLabel}>Daily Log</Text>
          </TouchableOpacity>

          {/* Attendance */}
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionIcon}>📅</Text>
            <Text style={styles.actionLabel}>Attendance</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

/* ============================== STYLES ============================== */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { padding: 20, alignItems: 'center' },

  // ID CARD
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    marginBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoPlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: '#E67E22',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  company: {
    fontSize: 18,
    fontWeight: '900',
    color: '#D4A017',
    marginLeft: 12,
  },

  // Avatar
  avatarSection: { alignItems: 'center', marginBottom: 20 },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E67E22',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: { color: '#fff', fontSize: 32, fontWeight: 'bold' },
  name: { fontSize: 22, fontWeight: '900', color: '#2C3E50' },
  employeeId: { fontSize: 16, color: '#E67E22', fontWeight: 'bold' },

  // Details
  details: { marginVertical: 16 },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  label: { fontSize: 15, color: '#7F8C8D', fontWeight: '600' },
  value: { fontSize: 15, color: '#2C3E50', fontWeight: '500' },

  // Footer
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  footerText: { fontSize: 12, color: '#95A5A6' },

  // QUICK ACTIONS
  actions: { width: '100%', maxWidth: 380 },
  actionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 16,
    textAlign: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionBtn: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    width: 100,
    elevation: 3,
  },
  actionIcon: {
    fontSize: 36,  // Larger for visibility
    marginBottom: 6,
  },
  actionLabel: { fontSize: 13, color: '#2C3E50', fontWeight: '600' },
});