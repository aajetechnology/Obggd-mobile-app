// src/screens/AttendanceScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  ScrollView,
} from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function AttendanceScreen() {
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState('');
  const [resumeTime, setResumeTime] = useState('');
  const [statusMsg, setStatusMsg] = useState('Scan QR to Check In');

  const summary = { days: 18, hours: 142.5, streak: 5 };

  const markedDates = {
    '2025-10-01': { marked: true, dotColor: '#E67E22' },
    '2025-10-02': { marked: true, dotColor: '#E67E22' },
    '2025-10-03': { marked: true, dotColor: '#E67E22' },
    '2025-10-07': { marked: true, dotColor: '#E67E22' },
    '2025-10-08': { marked: true, dotColor: '#E67E22' },
    '2025-10-09': { marked: true, dotColor: '#E67E22' },
    '2025-10-14': { marked: true, dotColor: '#E67E22' },
    '2025-10-15': { marked: true, dotColor: '#E67E22' },
    '2025-10-16': { marked: true, dotColor: '#E67E22' },
    '2025-10-21': { marked: true, dotColor: '#E67E22' },
    '2025-10-22': { marked: true, dotColor: '#E67E22' },
    '2025-10-23': { marked: true, dotColor: '#E67E22' },
    '2025-10-04': { marked: true, dotColor: '#E74C3C' },
    '2025-10-11': { marked: true, dotColor: '#E74C3C' },
    '2025-10-18': { marked: true, dotColor: '#E74C3C' },
  };

  const today = new Date().toISOString().split('T')[0];

  const formatTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleScan = () => {
    if (!checkedIn) {
      const time = formatTime();
      setCheckInTime(time);
      setCheckedIn(true);
      setStatusMsg(`Checked In at ${time}`);
      Alert.alert('Success', `Checked In at ${time}`);
    } else {
      const time = formatTime();
      setResumeTime(time);
      setStatusMsg(`Resumed at ${time}`);
      Alert.alert('Resumed', `Back to work at ${time}`);
    }
  };

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={true}
    >
      {/* Header */}
      <Text style={styles.title}>Attendance</Text>

      {/* QR Scan Button */}
      <TouchableOpacity style={styles.qrBtn} onPress={handleScan}>
        <Text style={styles.qrIcon}>QR Code</Text>
        <Text style={styles.qrText}>
          {checkedIn ? 'Scan to Resume' : 'Tap to Scan QR'}
        </Text>
      </TouchableOpacity>

      {/* Status */}
      <Text style={styles.status}>{statusMsg}</Text>

      {/* Today's Times */}
      {(checkedIn || resumeTime) && (
        <View style={styles.timeBox}>
          <View style={styles.timeRow}>
            <Text style={styles.timeLabel}>Check-In:</Text>
            <Text style={styles.timeValue}>{checkInTime || '-'}</Text>
          </View>
          <View style={styles.timeRow}>
            <Text style={styles.timeLabel}>Resume:</Text>
            <Text style={styles.timeValue}>{resumeTime || '—'}</Text>
          </View>
        </View>
      )}

      {/* Calendar Section */}
      <Text style={styles.calendarTitle}>Attendance This Month</Text>
      <View style={styles.calendarWrapper}>
        <Calendar
          current={today}
          markedDates={{
            ...markedDates,
            [today]: {
              selected: true,
              selectedColor: '#fff',
              selectedTextColor: '#E67E22',
              ...markedDates[today],
            },
          }}
          theme={{
            backgroundColor: '#fff',
            calendarBackground: '#fff',
            textSectionTitleColor: '#2C3E50',
            dayTextColor: '#2C3E50',
            textDisabledColor: '#ddd',
            monthTextColor: '#D4A017',
            arrowColor: '#E67E22',
            todayTextColor: '#E67E22',
            todayBackgroundColor: '#fff',
          }}
          hideExtraDays={true}
          firstDay={1}
          style={styles.calendar}
        />
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: '#22e622ff' }]} />
          <Text style={styles.legendText}>Present</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: '#f3230bff' }]} />
          <Text style={styles.legendText}>Absent</Text>
        </View>
      </View>

      {/* Summary Cards */}
      <View style={styles.summaryRow}>
        <View style={styles.card}>
          <Text style={styles.cardValue}>{summary.days}</Text>
          <Text style={styles.cardLabel}>Days Worked</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardValue}>{summary.hours}</Text>
          <Text style={styles.cardLabel}>Hours Logged</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardValue}>{summary.streak}</Text>
          <Text style={styles.cardLabel}>Day Streak</Text>
        </View>
      </View>

      {/* Footer Tip */}
      <Text style={styles.tip}>
        Scan the office QR code to mark your presence. No scan = Absent.
      </Text>
    </ScrollView>
  );
}

/* ============================== STYLES ============================== */
const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40, // Extra bottom space
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#D4A017',
    textAlign: 'center',
    marginBottom: 30,
  },
  qrBtn: {
    backgroundColor: '#E67E22',
    paddingVertical: 32,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 20,
    elevation: Platform.OS === 'android' ? 6 : 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  qrIcon: {
    fontSize: 60,
    color: '#fff',
    marginBottom: 8,
  },
  qrText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  status: {
    textAlign: 'center',
    fontSize: 16,
    color: '#27AE60',
    marginBottom: 20,
    fontWeight: '600',
  },
  timeBox: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  timeLabel: { fontSize: 15, color: '#2C3E50' },
  timeValue: { fontSize: 15, fontWeight: 'bold', color: '#2C3E50' },

  // Calendar
  calendarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
    textAlign: 'center',
  },
  calendarWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    marginBottom: 20,
  },
  calendar: {
    borderRadius: 16,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 14,
    color: '#2C3E50',
  },

  // Summary
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  card: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 3,
    minWidth: 90,
  },
  cardValue: {
    fontSize: 26,
    fontWeight: '900',
    color: '#2C3E50',
  },
  cardLabel: {
    fontSize: 13,
    color: '#7F8C8D',
    marginTop: 4,
  },
  tip: {
    textAlign: 'center',
    color: '#95A5A6',
    fontSize: 14,
    marginTop: 30,
    lineHeight: 20,
  },
});