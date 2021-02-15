// Import core app libraries
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Import screens for navigator
import HomeScreen from './src/screens/HomeScreen';
import TrailerScreen from './src/screens/TrailerScreen';
import MenuScreen from './src/screens/MenuScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import RewardsScreen from './src/screens/RewardsScreen';
import PaymentsScreen from './src/screens/PaymentsScreen';
import PastOrdersScreen from './src/screens/PastOrdersScreen';
import MenuItemDetailScreen from './src/screens/MenuItemDetailScreen';

// Import react-query libraries
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
// Setup react-query QueryClient
const queryClient = new QueryClient()


// Create Profile screens
function ProfileScreenStack({navigation}) {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="Rewards" component={RewardsScreen} />
      <ProfileStack.Screen name="Payments" component={PaymentsScreen} />
      <ProfileStack.Screen name="Past Orders" component={PastOrdersScreen} />
    </ProfileStack.Navigator>
  );
}
// Create Profile Stack
const ProfileStack = createStackNavigator();

// Create Menu/Order Screen
function MenuScreenStack({navigation}) {
  return (
    <MenuStack.Navigator>
      <MenuStack.Screen name="Menu" component={MenuScreen}/>
      <MenuStack.Screen name="Menu Item Details" component={MenuItemDetailScreen}/>
    </MenuStack.Navigator>
  );
}
// Create the Menu stack navigator
const MenuStack = createStackNavigator();


// Create App BottomTabNavigator
const MainTabNav = createBottomTabNavigator();

// Render the app
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <MainTabNav.Navigator>
          <MainTabNav.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" size={size} color={color}/>
              ),
            }} />
          <MainTabNav.Screen 
            name="Menu" 
            component={MenuScreenStack}
            options={{
              tabBarLabel: 'Order To-Go',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="food-fork-drink" size={size} color={color}/>
              ),
          }}/>
          <MainTabNav.Screen 
            name="Profile" 
            component={ProfileScreenStack}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account" size={size} color={color}/>
              ),
          }}/>
          <MainTabNav.Screen 
            name="Trailer" 
            component={TrailerScreen}
            options={{
              tabBarLabel: 'Trailer Locator',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="map-marker" size={size} color={color}/>
              ),
            }} />
        </MainTabNav.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
