import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './src/screens/HomeScreen';
import TrailerScreen from './src/screens/TrailerScreen';
import MenuScreen from './src/screens/MenuScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import RewardsScreen from './src/screens/RewardsScreen';
import PaymentsScreen from './src/screens/PaymentsScreen';
import PastOrdersScreen from './src/screens/PastOrdersScreen';
import MenuItemDetailScreen from './src/screens/MenuItemDetailScreen';

import { ReactQueryCacheProvider, QueryCache } from "react-query";


// Create Profile Stack
const ProfileStack = createStackNavigator();

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

const MenuStack = createStackNavigator();

// Create Order Screen
function MenuScreenStack({navigation}) {
  return (
    <MenuStack.Navigator>
      <MenuStack.Screen name="Menu" component={MenuScreen}/>
      <MenuStack.Screen name="Menu Item Details" component={MenuItemDetailScreen}/>
    </MenuStack.Navigator>
  );
}

const MainTabNav = createBottomTabNavigator();

const queryCache = new QueryCache()

export default function App() {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
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
    </ReactQueryCacheProvider>
  );
}
