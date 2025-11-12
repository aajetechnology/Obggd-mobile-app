// src/screens/RegisterScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView, // ← ADDED
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function RegisterScreen() {
  const [form, setForm] = useState({
    fullName: '',
    role: '',
    staffId: '',
    contact: '',
    photo: null,
  });

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Allow access to photos.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setForm({ ...form, photo: result.assets[0].uri });
    }
  };

  const handleSubmit = () => {
    if (!form.fullName || !form.staffId || !form.photo) {
      Alert.alert('Incomplete', 'Fill name, ID, and upload photo.');
    } else {
      Alert.alert('Success!', 'Submitted! (UI Only)');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
          <Text style={styles.title}>OBGD LIMITED</Text>
          <Text style={styles.subtitle}>Engineering & Construction</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <TextInput style={styles.input} placeholder="Full Name" value={form.fullName} onChangeText={t => setForm({ ...form, fullName: t })} />
          <TextInput style={styles.input} placeholder="Department / Role" value={form.role} onChangeText={t => setForm({ ...form, role: t })} />
          <TextInput style={styles.input} placeholder="Staff ID" value={form.staffId} onChangeText={t => setForm({ ...form, staffId: t })} />
          <TextInput style={styles.input} placeholder="Contact Number" value={form.contact} onChangeText={t => setForm({ ...form, contact: t })} keyboardType="phone-pad" />

          <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
            <Text style={styles.uploadText}>
              {form.photo ? 'Photo Selected' : 'Upload Profile Photo'}
            </Text>
          </TouchableOpacity>

          {form.photo && <Image source={{ uri: form.photo }} style={styles.photoPreview} />}

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit for Approval</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { flexGrow: 1 }, // ← Ensures content grows
  header: { alignItems: 'center', paddingTop: 20, paddingBottom: 10 },
  logo: { width: 100, height: 100 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#000', marginTop: 8 },
  subtitle: { fontSize: 15, color: '#666', marginTop: 4 },
  form: { 
    paddingHorizontal: 30, 
    flex: 1, // ← CRITICAL: Makes form take available space
    justifyContent: 'flex-start',
  },
  input: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 14,
    color: '#333',
  },
  uploadBtn: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  uploadText: { color: '#666', fontSize: 16 },
  photoPreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#D4A017',
  },
  submitBtn: {
    backgroundColor: '#D4A017',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});