// src/screens/MaterialRequestScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function MaterialRequestScreen() {
  const [material, setMaterial] = useState('Cement');
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('No Active Request');

  const [tracking, setTracking] = useState(false);
  const [eta, setEta] = useState('ETA: 45 min');

  const materials = ['Cement', 'Rebar', 'Bricks', 'Sand', 'Steel Beams'];

  // Simulate live ETA countdown
  useEffect(() => {
    if (tracking) {
      const interval = setInterval(() => {
        setEta(prev => {
          const mins = parseInt(prev.split(' ')[1]);
          if (mins <= 0) {
            setStatus('Delivered');
            setTracking(false);
            return 'Delivered';
          }
          return `ETA: ${mins - 1} min`;
        });
      }, 60000); // 1 min
      return () => clearInterval(interval);
    }
  }, [tracking]);

  const submitRequest = () => {
    if (!quantity) return Alert.alert('Error', 'Enter quantity');
    setStatus('Requested');
    Alert.alert('Success', `Requested ${quantity} ${material}`);
  };

  const approveRequest = () => {
    if (status === 'Requested') {
      setStatus('Approved');
      Alert.alert('Approved', 'Manager approved your request');
    }
  };

  const startTracking = () => {
    if (status !== 'Approved') return Alert.alert('Info', 'Awaiting manager approval');
    setStatus('In Transit');
    setTracking(true);
    Alert.alert('Tracking', 'Delivery truck dispatched');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Material Request</Text>

      {/* === REQUEST FORM === */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Request New Materials</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Request Material</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            multiline
            placeholder="e.g., Cement, Rebar"
            value={notes}
            onChangeText={setNotes}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Quantity</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 50 bags"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Notes (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            multiline
            placeholder="Urgent? Deliver to Gate 2?"
            value={notes}
            onChangeText={setNotes}
          />
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={submitRequest}>
          <Text style={styles.submitText}>Submit Request</Text>
        </TouchableOpacity>
      </View>

      {/* === STATUS CARD === */}
      <View style={styles.statusCard}>
        <Text style={styles.statusTitle}>Request Status</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(status) }]}>
          <Text style={styles.statusText}>{status}</Text>
        </View>

        {/* Manager Approval (Mock) */}
        {status === 'Requested' && (
          <TouchableOpacity style={styles.approveBtn} onPress={approveRequest}>
            <Text style={styles.approveText}>Manager: Approve</Text>
          </TouchableOpacity>
        )}

        {/* Start Tracking */}
        {status === 'Approved' && (
          <TouchableOpacity style={styles.trackBtn} onPress={startTracking}>
            <Text style={styles.trackText}>Start Tracking</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* === TRACKING CARD === */}
      {tracking && (
        <View style={styles.trackingCard}>
          <Text style={styles.trackingTitle}>Delivery In Transit</Text>
          <Text style={styles.truckIcon}>Truck</Text>
          <Text style={styles.eta}>{eta}</Text>
          <Text style={styles.trackingNote}>Live updates every minute</Text>
        </View>
      )}

      {/* === TIP === */}
      <Text style={styles.tip}>
        After approval, track delivery in real-time. Map coming soon on mobile.
      </Text>
    </ScrollView>
  );
}

// Status colors
const getStatusColor = (s) => {
  const map = {
    'Requested': '#F39C12',
    'Approved': '#27AE60',
    'In Transit': '#E67E22',
    'Delivered': '#2ECC71',
  };
  return map[s] || '#95A5A6';
};

/* ============================== STYLES ============================== */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 24, paddingBottom: 60 },

  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#D4A017',
    textAlign: 'center',
    marginBottom: 30,
  },

  // Form Section
  section: {
    backgroundColor: '#f8f8f8',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 16,
  },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, color: '#7F8C8D', marginBottom: 6 },
  picker: { backgroundColor: '#fff', borderRadius: 12 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: { height: 90, textAlignVertical: 'top' },

  submitBtn: {
    backgroundColor: '#E67E22',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 8,
  },
  submitText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  // Status Card
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    elevation: 3,
    marginBottom: 24,
  },
  statusTitle: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50', marginBottom: 12 },
  statusBadge: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 30,
    marginBottom: 16,
  },
  statusText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  approveBtn: {
    backgroundColor: '#3498DB',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  approveText: { color: '#fff', fontWeight: '600' },

  trackBtn: {
    backgroundColor: '#27AE60',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
  },
  trackText: { color: '#fff', fontWeight: 'bold' },

  // Tracking Card
  trackingCard: {
    backgroundColor: '#FFF8E1',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
  },
  trackingTitle: { fontSize: 18, fontWeight: 'bold', color: '#E67E22', marginBottom: 12 },
  truckIcon: { fontSize: 48, marginBottom: 8 },
  eta: { fontSize: 22, fontWeight: '900', color: '#E67E22' },
  trackingNote: { fontSize: 14, color: '#7F8C8D', marginTop: 8 },

  tip: {
    textAlign: 'center',
    color: '#95A5A6',
    fontSize: 14,
    lineHeight: 20,
  },
});