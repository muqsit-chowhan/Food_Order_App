import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer } from '../components/ScreenContainer';
import { useOrder } from '../order/OrderContext';
import { colors } from '../theme/colors';
import { AppStackParamList } from '../navigation/AppStackNavigator';

export const ActiveOrderScreen: React.FC = () => {
  const { currentOrder } = useOrder();
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const hasActiveOrder =
    !!currentOrder && currentOrder.status !== 'Dispatched';
  const hasInactiveOrder =
    !!currentOrder && currentOrder.status === 'Dispatched';

  return (
    <ScreenContainer style={styles.container}>
      <Text style={styles.title}>Active Order</Text>
      {!hasActiveOrder ? (
        <Text style={styles.emptyText}>No active orders yet.</Text>
      ) : (
        <Pressable
          style={styles.card}
          onPress={() => navigation.navigate('OrderStatus')}
        >
          <Text style={styles.cardTitle}>Order in progress</Text>
          <Text style={styles.cardStatus}>Status: {currentOrder.status}</Text>
          <Text style={styles.cardHint}>Tap to view full status</Text>
        </Pressable>
      )}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dispatched Orders</Text>
        {!hasInactiveOrder ? (
          <Text style={styles.emptyText}>No orders.</Text>
        ) : (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Last order</Text>
            <Text style={styles.cardStatus}>
              Status: {currentOrder.status}
            </Text>
            <Text style={styles.cardHint}>Delivered</Text>
          </View>
        )}
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  emptyText: {
    color: colors.muted,
    fontSize: 14,
  },
  card: {
    backgroundColor: colors.cardDark,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  cardStatus: {
    marginTop: 8,
    fontSize: 14,
    color: colors.primary,
  },
  cardHint: {
    marginTop: 8,
    fontSize: 12,
    color: colors.muted,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
});
