import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { colors } from '../theme/colors';
import { useOrder } from '../order/OrderContext';

const statusSteps = ['Pending', 'Accepted', 'Processing', 'Dispatched'] as const;

const statusMessages: Record<(typeof statusSteps)[number], string> = {
  Pending: 'We received your order.',
  Accepted: 'Your order has been accepted.',
  Processing: 'We are preparing your items.',
  Dispatched: 'Your food is on the way.',
};

export const OrderStatusScreen: React.FC = () => {
  const { currentOrder } = useOrder();
  const currentStatus = currentOrder?.status ?? 'Pending';

  const timeline = useMemo(
    () =>
      statusSteps.map((status, index) => ({
        status,
        isActive: index === statusSteps.indexOf(currentStatus),
      })),
    [currentStatus],
  );

  return (
    <ScreenContainer style={styles.container}>
      <Text style={styles.title}>Order Status</Text>
      <Text style={styles.subtitle}>{statusMessages[currentStatus]}</Text>
      <View style={styles.card}>
        {timeline.map(({ status, isActive }) => (
          <View key={status} style={styles.row}>
            <View
              style={[
                styles.dot,
                isActive ? styles.dotActive : styles.dotInactive,
              ]}
            />
            <Text
              style={[
                styles.statusText,
                isActive ? styles.statusActive : styles.statusInactive,
              ]}
            >
              {status}
            </Text>
          </View>
        ))}
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
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: colors.muted,
    marginBottom: 18,
  },
  card: {
    backgroundColor: colors.cardDark,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  dotActive: {
    backgroundColor: colors.primary,
  },
  dotInactive: {
    backgroundColor: colors.dotInactive,
  },
  statusText: {
    fontSize: 15,
    fontWeight: '600',
  },
  statusActive: {
    color: colors.text,
  },
  statusInactive: {
    color: colors.muted,
  },
  timerHint: {
    marginTop: 16,
    fontSize: 12,
    color: colors.muted,
  },
});
