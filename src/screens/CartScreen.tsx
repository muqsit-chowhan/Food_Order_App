import React from 'react';
import { Alert, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenContainer } from '../components/ScreenContainer';
import { useCart } from '../cart/CartContext';
import { colors } from '../theme/colors';
import { appAssets } from '../theme/assets';
import { AppStackParamList } from '../navigation/AppStackNavigator';
import { useOrder } from '../order/OrderContext';

export const CartScreen: React.FC = () => {
  const { items, totalItems, totalPrice, addItem, removeItem, clearCart } =
    useCart();
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const { startOrder } = useOrder();

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      Alert.alert('Cart is empty', 'Add items before placing your order.');
      return;
    }
    clearCart();
    await startOrder();
    navigation.navigate('OrderStatus');
  };

  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.logoCircle}>
          {appAssets.logoUri ? (
            <Image source={{ uri: appAssets.logoUri }} style={styles.logo} />
          ) : (
            <Text style={styles.logoFallback}>Cart</Text>
          )}
        </View>
        <Text style={styles.heading}>Your cart</Text>
      </View>
      <Text style={styles.subheading}>
        {totalItems} items • Rs {totalPrice.toFixed(2)}
      </Text>
      <FlatList
        data={items}
        keyExtractor={entry => entry.item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.cartRow}>
            <View style={styles.cartInfo}>
              <Text style={styles.name}>{item.item.name}</Text>
              <Text style={styles.price}>
                Rs {item.item.price.toFixed(2)}
              </Text>
            </View>
            <View style={styles.controls}>
              <Text style={styles.controlLabel}>Qty</Text>


              <View style={styles.controls}>
                <Pressable onPress={() => removeItem(item.item.id)} style={styles.controlButton}>
                  <Text style={styles.controlText}>-</Text>
                </Pressable>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <Pressable onPress={() => addItem(item.item)} style={styles.controlButton}>
                  <Text style={styles.controlText}>+</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Your cart is empty.</Text>
        }
        ListFooterComponent={<View style={styles.footerSpace} />}
      />
      <View style={styles.summaryBox}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total</Text>
          <Text style={styles.summaryValue}>Rs {totalPrice.toFixed(2)}</Text>
        </View>
        <PrimaryButton title="Place order" onPress={handlePlaceOrder} />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  logoFallback: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  subheading: {
    marginTop: 6,
    marginBottom: 14,
    fontSize: 14,
    color: colors.muted,
  },
  listContent: {
    paddingBottom: 12,
  },
  cartRow: {
    backgroundColor: colors.primarySoft,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    shadowColor: colors.shadowDark,
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  cartInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controlLabel: {
    fontSize: 12,
    color: colors.textDark,
    fontWeight: '600',
  },
  quantityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  controlButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  quantity: {
    marginHorizontal: 8,
    fontWeight: '600',
    color: colors.textDark,
  },
  summaryBox: {
    backgroundColor: colors.primarySoft,
    borderRadius: 16,
    padding: 16,
    shadowColor: colors.shadowDark,
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.muted,
    marginTop: 24,
  },
  footerSpace: {
    height: 16,
  },
});
