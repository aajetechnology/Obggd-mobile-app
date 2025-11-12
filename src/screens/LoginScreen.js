// src/screens/LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email === 'admin@obgd.com' && password === '123') {
      navigation.replace('Drawer');
    } else {
      Alert.alert('Login Failed', 'Invalid email or password');
    }
  };

  const handleSkip = () => navigation.replace('Drawer');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.inner}>
        {/* ---------- BOLD LOGO + TITLE ---------- */}
        <View style={styles.header}>
          <Image
            source={require('../../assets/logo.png')}   // ← PNG for web, SVG for native
            style={styles.gear}
            resizeMode="contain"
          />
          <View style={styles.titleBox}>
            <Text style={styles.title}>OBGGD LIMITED</Text>
            <Text style={styles.subtitle}>Engineering & Construction</Text>
          </View>
        </View>

        {/* ---------- INPUT FIELDS ---------- */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* ---------- LOGIN BUTTON ---------- */}
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>

        {/* ---------- SKIP LINK ---------- */}
        <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip for now →</Text>
        </TouchableOpacity>

        {/* ---------- FOOTER ---------- */}
        <Text style={styles.footer}>BuildLog v1.0</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

/* ============================== STYLES ============================== */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  inner: { flex: 1, justifyContent: 'center', paddingHorizontal: 30 },

  /* ----- Header (logo + text) ----- */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  gear: { width: 90, height: 90, marginRight: 12 },
  titleBox: { flexDirection: 'column' },
  title: {
    fontSize: 32,
    fontWeight: '900',        // ultra-bold like the mock-up
    color: '#000',
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: -4,
  },

  /* ----- Inputs ----- */
  input: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16,
  },

  /* ----- Login button (exact orange pill) ----- */
  loginBtn: {
    backgroundColor: '#E67E22',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  loginText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },

  /* ----- Skip link ----- */
  skipBtn: { marginTop: 20, alignItems: 'center' },
  skipText: { color: '#E67E22', fontSize: 16, fontWeight: '600' },

  /* ----- Footer ----- */
  footer: { textAlign: 'center', color: '#ccc', marginTop: 40, fontSize: 12 },
});