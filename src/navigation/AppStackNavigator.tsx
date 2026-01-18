import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppTabsNavigator } from './AppTabsNavigator';
import { OrderStatusScreen } from '../screens/OrderStatusScreen';

export type AppStackParamList = {
  AppTabs: undefined;
  OrderStatus: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppStackNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AppTabs" component={AppTabsNavigator} />
    <Stack.Screen name="OrderStatus" component={OrderStatusScreen} />
  </Stack.Navigator>
);
