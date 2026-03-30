
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { initDB } from './src/database/db';
import Colors from './src/theme/colors';

import AddStockScreen from './src/screens/AddStockScreen';
import BackupScreen from './src/screens/BackupScreen';
import BillScreen from './src/screens/BillScreen';
import CartScreen from './src/screens/CartScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import ReportsScreen from './src/screens/ReportsScreen';
import SearchScreen from './src/screens/SearchScreen';
import StockScreen from './src/screens/StockScreen';

const Stack = createStackNavigator();

export default function App() {
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    initDB()
      .then(() => setDbReady(true))
      .catch(err => console.error('DB init error:', err));
  }, []);

  // show loading screen while DB initializes
  if (!dbReady) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Starting...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Stock"     component={StockScreen}     />
          <Stack.Screen name="AddStock"  component={AddStockScreen}  />
          <Stack.Screen name="Search"    component={SearchScreen}    />
          <Stack.Screen name="Cart"      component={CartScreen}      />
          <Stack.Screen name="Bill"      component={BillScreen}      />
          <Stack.Screen name="Reports"   component={ReportsScreen}   />
          <Stack.Screen name="Backup"    component={BackupScreen}    />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading:      {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    backgroundColor: Colors.darkBlue,
  },
  loadingText:  { color: Colors.white, fontSize: 16, fontWeight: '500' },
});