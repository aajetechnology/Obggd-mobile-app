// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Image, View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

// Import Screens
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import AttendanceScreen from './src/screens/AttendanceScreen';
import LogScreen from './src/screens/LogScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import MaterialRequestScreen from './src/screens/MaterialRequestScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Custom Drawer
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Image source={require('./assets/logo.png')} style={styles.drawerLogo} resizeMode="contain" />
        <Text style={styles.drawerTitle}>OBGD LIMITED</Text>
        <Text style={styles.drawerSubtitle}>Engineering & Construction</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

// Drawer Navigator (Main App)
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: '#D4A017',
        drawerInactiveTintColor: '#666',
        drawerLabelStyle: { fontSize: 16, fontWeight: '500' },
        headerStyle: { backgroundColor: '#D4A017' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} options={{ drawerLabel: 'Home', drawerIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} /> }} />
      <Drawer.Screen name="Register" component={RegisterScreen} options={{ drawerLabel: 'Register Employee', drawerIcon: ({ color, size }) => <Ionicons name="person-add" size={size} color={color} /> }} />
      <Drawer.Screen name="Attendance" component={AttendanceScreen} options={{ drawerLabel: 'Take Attendance', drawerIcon: ({ color, size }) => <Ionicons name="checkmark-circle" size={size} color={color} /> }} />
      <Drawer.Screen name="Log" component={LogScreen} options={{ drawerLabel: 'Daily Log', drawerIcon: ({ color, size }) => <Ionicons name="document-text" size={size} color={color} /> }} />
      <Drawer.Screen name="Login" component={LoginScreen} options={{ drawerLabel: 'Login', drawerIcon: ({ color, size }) => <Ionicons name="login" size={size} color={color} /> }} />
      <Drawer.Screen name="Settings" component={SettingsScreen} options={{ drawerLabel: 'Settings', drawerIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} /> }} />
      <Drawer.Screen name="Material Request" component={MaterialRequestScreen} options={{ drawerLabel: 'MaterialRequest', drawerIcon: ({ color, size }) => <Ionicons name="Truck" size={size} color={color} /> }} />
    </Drawer.Navigator>
  );
}

// Main App
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Drawer" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 10,
  },
  drawerLogo: { width: 80, height: 80 },
  drawerTitle: { fontSize: 18, fontWeight: 'bold', color: '#000', marginTop: 8 },
  drawerSubtitle: { fontSize: 13, color: '#666' },
});