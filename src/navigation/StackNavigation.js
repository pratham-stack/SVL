import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import ExistingRetailer from '../screens/ExistingRetailer';
import LinkingUserNamePasswordScreen from '../screens/LinkingUserNamePasswordScreen';
import ConfirmOTPScreen from '../screens/ConfirmOTPScreen';
import DrawerNavigation from './DrawerNavigation';

const Stack = createStackNavigator();

const StackNavigation = () => {

    console.log("Stack Navigation");
    return(
        <Stack.Navigator initialRouteName="splashScreen" 
            screenOptions={{
            headerShown: false
            }}>
          <Stack.Screen name='Splash Screen' component={SplashScreen} />
          <Stack.Screen name='Existing Retailer' component={ExistingRetailer} />
          <Stack.Screen name='Link Username Password' component={LinkingUserNamePasswordScreen} />
          <Stack.Screen name='Confirm OTP' component={ConfirmOTPScreen} />
          <Stack.Screen name='Drawer Navigation' component={DrawerNavigation} />
        </Stack.Navigator>
    )
}

export default StackNavigation

