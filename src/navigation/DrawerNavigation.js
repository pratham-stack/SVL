import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeDashboardScreen from '../screens/HomeDashboardScreen';
import 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home Screen">
        <Drawer.Screen name="Home Screen" component={HomeDashboardScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
