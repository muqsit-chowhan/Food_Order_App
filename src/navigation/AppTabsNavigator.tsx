import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import { FoodListScreen } from '../screens/FoodListScreen';
import { CartScreen } from '../screens/CartScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ActiveOrderScreen } from '../screens/ActiveOrderScreen';
import { colors } from '../theme/colors';
import { useCart } from '../cart/CartContext';

export type AppTabParamList = {
  FoodList: undefined;
  Cart: undefined;
  Orders: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<AppTabParamList>();

export const AppTabsNavigator: React.FC = () => {
  const { totalItems } = useCart();

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.white,
        headerTitleStyle: { fontWeight: '900' },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: () => null,
        tabBarIconStyle: { display: 'none' },
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.primarySoft,
          paddingTop: 15,
        },
      }}
    >
      <Tab.Screen
        name="FoodList"
        component={FoodListScreen}
        options={{ title: 'Cafe de Academia', tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: 'Cart',
          tabBarLabel: ({ color }) => (
            <View style={styles.cartLabel}>
              <Text style={[styles.cartLabelText, { color }]}>Cart</Text>
              {totalItems > 0 ? (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{totalItems}</Text>
                </View>
              ) : null}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={ActiveOrderScreen}
        options={{ title: 'Active order', tabBarLabel: 'Orders' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabLabel: {
    fontSize: 14,
    fontWeight: '800',
  },
  cartLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cartLabelText: {
    fontSize: 14,
    fontWeight: '800',
  },
  cartBadge: {
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: colors.textDark,
    fontSize: 12,
    fontWeight: '700',
  },
});
