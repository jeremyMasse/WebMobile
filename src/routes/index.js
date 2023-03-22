import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ExercicesList from '../screens/ExercicesList';
import FavoritesList from '../screens/FavoritesList';
import ExerciceDetail from '../screens/ExerciceDetail';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/**
 * Navigateur du bas de page
 */
const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Exercises" component={ExercicesList} />
    <Tab.Screen name="Favorites" component={FavoritesList} />
  </Tab.Navigator>
);

/**
 * Navigateur du haut de page
 */
const MainNavigator = () => (
  <Stack.Navigator initialRouteName="TabNavigator">
    <Stack.Screen name="TabNavigator" component={TabNavigator} options={{headerShown: false}}/>
    <Stack.Screen name="ExerciseDetails" component={ExerciceDetail} />
  </Stack.Navigator>
);

const Routes = () => (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
);

export default Routes;
