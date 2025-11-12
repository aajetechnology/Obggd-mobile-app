// src/screens/DailyLogScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';

export default function DailyLogScreen() {
  const [date] = useState(new Date().toLocaleDateString());
  const [weather, setWeather] = useState('Sunny');
  const [site, setSite] = useState('Main Site');
  const [workDone, setWorkDone] = useState('');
  const [safetyNote, setSafetyNote] = useState('');
  const [materials, setMaterials] = useState([{ name: '', qty: '' }]);
  const [photos, setPhotos] = useState([]);

  const addMaterial = () => {
    setMaterials([...materials, { name: '', qty: '' }]);
  };

  const updateMaterial = (index, field, value) => {
    const updated = [...materials];
    updated[index][field] = value;
    setMaterials(updated);
  };

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets) {
        setPhotos([...photos, ...response.assets.map(a => a.uri)]);
      }
    });
  };

  const submitLog = () => {
    Alert.alert('Success', 'Daily log submitted!');
    // TODO: Send to FastAPI
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Daily Work Log</Text>

      {/* Date & Weather */}
      <View style={styles.section}>
        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>{date}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Weather</Text>
        <Picker selectedValue={weather} onValueChange={setWeather} style={styles.picker}>
          <Picker.Item label="Sunny ☀️" value="Sunny" />
          <Picker.Item label="Cloudy ☁️" value="Cloudy" />
          <Picker.Item label="Rainy 🌧️" value="Rainy" />
          <Picker.Item label="Windy 🌬️" value="Windy" />
        </Picker>
      </View>
      {/* Site / Project */}{/* Site */}
        <View style={styles.section}>
        <Text style={styles.label}>Site / Project</Text>
        <TextInput
          style={styles.textArea}
          multiline
          placeholder="Describe tasks completed..."
          value={workDone}
          onChangeText={setWorkDone}
        />
      </View>

      
      {/* <View style={styles.section}>
        <Text style={styles.label}></Text>
        <Picker selectedValue={site} onValueChange={setSite} style={styles.picker}>
          <Picker.Item label="Main Site - Phase 1" value="Main Site" />
          <Picker.Item label="West Wing Extension" value="West Wing" />
          <Picker.Item label="Parking Lot" value="Parking" />
        </Picker>
      </View> */}

      {/* Work Done */}
      <View style={styles.section}>
        <Text style={styles.label}>Work Done Today</Text>
        <TextInput
          style={styles.textArea}
          multiline
          placeholder="Describe tasks completed..."
          value={workDone}
          onChangeText={setWorkDone}
        />
      </View>

      {/* Workers Present (Mock) */}
      <View style={styles.section}>
        <Text style={styles.label}>Workers Present (8)</Text>
        <View style={styles.workerList}>
          {['John D.', 'Mike S.', 'Sarah K.', 'Alex P.'].map((name, i) => (
            <View key={i} style={styles.workerItem}>
              <Text style={styles.workerName}>{name}</Text>
              <Text style={styles.workerTime}>In: 08:30</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Materials Used */}
      <View style={styles.section}>
        <Text style={styles.label}>Materials Used</Text>
        {materials.map((m, i) => (
          <View key={i} style={styles.materialRow}>
            <TextInput
              style={styles.materialInput}
              placeholder="Item"
              value={m.name}
              onChangeText={(v) => updateMaterial(i, 'name', v)}
            />
            <TextInput
              style={styles.qtyInput}
              placeholder="Qty"
              value={m.qty}
              onChangeText={(v) => updateMaterial(i, 'qty', v)}
              keyboardType="numeric"
            />
          </View>
        ))}
        <TouchableOpacity style={styles.addBtn} onPress={addMaterial}>
          <Text style={styles.addText}>+ Add Material</Text>
        </TouchableOpacity>
      </View>

      {/* Safety Notes */}
      <View style={styles.section}>
        <Text style={styles.label}>Safety Notes / Incidents</Text>
        <TextInput
          style={[styles.textArea, { borderColor: '#E74C3C' }]}
          multiline
          placeholder="Any incidents or safety observations..."
          value={safetyNote}
          onChangeText={setSafetyNote}
        />
      </View>

      {/* Photos */}
      <View style={styles.section}>
        <Text style={styles.label}>Photos ({photos.length})</Text>
        <TouchableOpacity style={styles.photoBtn} onPress={pickImage}>
          <Text style={styles.photoText}>📷 Add Photo</Text>
        </TouchableOpacity>
      </View>

      {/* Submit */}
      <TouchableOpacity style={styles.submitBtn} onPress={submitLog}>
        <Text style={styles.submitText}>Submit Daily Log</Text>
      </TouchableOpacity>
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
  section: { marginBottom: 24 },
  label: { fontSize: 16, fontWeight: 'bold', color: '#2C3E50', marginBottom: 8 },
  value: { fontSize: 16, color: '#34495E', paddingVertical: 8 },
  picker: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 12,
  },
  textArea: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    height: 100,
    textAlignVertical: 'top',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  workerList: { backgroundColor: '#f8f8f8', borderRadius: 12, padding: 12 },
  workerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  workerName: { fontSize: 15, color: '#2C3E50' },
  workerTime: { fontSize: 14, color: '#27AE60' },
  materialRow: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 10,
  },
  materialInput: {
    flex: 2,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
  },
  qtyInput: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
  },
  addBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#E67E22',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 8,
  },
  addText: { color: '#fff', fontWeight: '600' },
  photoBtn: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  photoText: { fontSize: 16, color: '#2C3E50' },
  submitBtn: {
    backgroundColor: '#E67E22',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    elevation: 6,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});