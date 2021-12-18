import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Header } from 'react-native-elements';

import { LogBox } from 'react-native';
import _ from 'lodash';

LogBox.ignoreLogs(['Warning:...']); // ignore specific logs
LogBox.ignoreAllLogs(); // ignore all logs
const _console = _.clone(console);
console.warn = message => {
if (message.indexOf('Setting a timer') <= -1) {
   _console.warn(message);
   }
};
// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Screens
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import CalendarScreen from './CalendarScreen';
import SettingsScreen from './SettingsScreen';
import AnalyticsScreen from './AnalyticsScreen';

// Nav part 2
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainHome() {
  return (

    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen}
        options={{
          headerShown: false,
          title: 'Home',
          headerStyle: {
            backgroundColor: '#ff6b4d',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 24,
          }
        }}
      />
      <Stack.Screen name="Details" component={DetailsScreen}
        options={
          ({ route }) => ({
            title: route.params.title,
            headerStyle: {
              backgroundColor: '#ff6b4d',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontSize: 24,
            }
          })}
      />

      <Stack.Screen name="Calendar" component={CalendarScreen}
        options={{
          title: 'Calendar',
          headerStyle: {
            backgroundColor: '#ff6b4d',
            textAlign: 'center'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 24,
            textAlign: 'center'
          }
        }}
      />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>

      <Tab.Navigator
        initialRouteName="MainHome"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            if (route.name === 'MainHome') {
              iconName = focused ? 'home-sharp' : 'home-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings-sharp' : 'settings-outline';
            } else if (route.name === 'Analytics') {
              iconName = focused ? 'bar-chart-sharp' : 'bar-chart-outline';
            }
            return <Ionicons name={iconName} size={24} color={color} />;
          },
          activeTintColor: '#595959',
          tabBarHideOnKeyboard: true,
        })}
      >
        <Tab.Screen
          name="Analytics"
          component={AnalyticsScreen}
        />
        <Tab.Screen
          name="MainHome"
          component={MainHome}
          
          options={{title: 'Home'}}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
