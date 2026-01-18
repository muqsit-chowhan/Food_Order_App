import React, { useLayoutEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { FoodCard } from '../components/FoodCard';
import { ScreenContainer } from '../components/ScreenContainer';
import { foodItems } from '../data/food';
import { useCart } from '../cart/CartContext';
import { AppTabParamList } from '../navigation/AppTabsNavigator';
import { colors } from '../theme/colors';

type FoodListScreenProps = BottomTabScreenProps<
  AppTabParamList,
  'FoodList'
>;

export const FoodListScreen: React.FC<FoodListScreenProps> = ({
  navigation,
}) => {
  const { addItem, removeItem, items, totalItems } = useCart();



  return (
    <ScreenContainer style={styles.container}>
      <FlatList
        data={foodItems}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const entry = items.find(cartItem => cartItem.item.id === item.id);
          const quantity = entry?.quantity ?? 0;
          return (
            <FoodCard
              item={item}
              quantity={quantity}
              onAdd={() => addItem(item)}
              onRemove={() => removeItem(item.id)}
            />
          );
        }}
        ListFooterComponent={<View style={styles.footerSpace} />}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingTop: 0,
  },
  subheading: {
    marginTop: 6,
    marginBottom: 14,
    fontSize: 14,
    color: colors.muted,
  },
  listContent: {
    paddingTop: 0,
  },
  footerSpace: {
    height: 24,
  },
  cartButton: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
});
