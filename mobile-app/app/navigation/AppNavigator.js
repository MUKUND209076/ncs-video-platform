import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getToken } from "../services/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import DashboardScreen from "../screens/DashboardScreen";
import VideoPlayerScreen from "../screens/VideoPlayerScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const init = async () => {
      const t = await getToken();
      setToken(t);
      setLoading(false);
    };

    const interval = setInterval(init, 500); // poll token change

    return () => clearInterval(interval);
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!token ? (
          <>
            <Stack.Screen 
              name="Login" 
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Signup" 
              component={SignupScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={({ navigation }) => ({
                headerTitle: () => (
                  <View style={{ marginLeft: 0 }}>
                    <Text style={{ 
                      fontSize: 22, 
                      fontWeight: '800',
                      color: '#111827'
                    }}>
                      NCS Dashboard
                    </Text>
                    <Text style={{ 
                      fontSize: 13, 
                      color: '#6B7280',
                      marginTop: 2
                    }}>
                      No Copyright Sounds Library
                    </Text>
                  </View>
                ),
                headerRight: () => (
                  <TouchableOpacity 
                    onPress={() => navigation.navigate("Settings")}
                    style={{ 
                      width: 44,
                      height: 44,
                      borderRadius: 22,
                      backgroundColor: '#F3F4F6',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 2,
                      borderColor: '#E5E7EB',
                      marginRight: 8
                    }}
                  >
                    <Ionicons name="settings-outline" size={24} color="#4F46E5" />
                  </TouchableOpacity>
                ),
                headerStyle: {
                  backgroundColor: '#FFFFFF',
                },
                headerShadowVisible: false,
                headerTitleAlign: 'left',
              })}
            />
            <Stack.Screen 
              name="VideoPlayer" 
              component={VideoPlayerScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Settings" 
              component={SettingsScreen}
              options={{ 
                title: 'Settings',
                headerStyle: {
                  backgroundColor: '#FFFFFF',
                },
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}