import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import TutorialScreen from '../screens/TutorialScreen';
import Settings from '../screens/Settings';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          // Default value to avoid using uninitialized variable
          let iconName: 'home' | 'help-circle' | 'settings' = 'home'; 

          // Assign the correct iconName based on route.name
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Tutorial') {
            iconName = 'help-circle';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        tabBarLabel: route.name === 'Home' ? 'ہوم' : 
                    route.name === 'Tutorial' ? 'مدد حاصل کریں' : 
                    'سیٹنگز',
        headerShown: false, // Disable header for all screens in Bottom Tab
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Tutorial" component={TutorialScreen} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
