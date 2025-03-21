import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { TaskProvider } from '../context/TaskContext';

// Import screens
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import TaskListScreen from '../screens/TaskListScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import CalendarScreen from '../screens/CalendarScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Task Stack Navigator
const TaskStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="TaskList" 
        component={TaskListScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="TaskDetail" 
        component={TaskDetailScreen} 
        options={{ title: 'Task Details' }}
      />
      <Stack.Screen 
        name="AddTask" 
        component={AddTaskScreen} 
        options={{ title: 'Add New Task' }}
      />
    </Stack.Navigator>
  );
};

// Main Tab Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Tasks') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Calendar') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4A80F0',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen 
        name="Tasks" 
        component={TaskStack} 
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Root Navigator
const AppNavigator = () => {
  return (
    <TaskProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Main" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
};

export default AppNavigator;
