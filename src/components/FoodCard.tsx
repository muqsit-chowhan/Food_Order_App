import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { FoodItem } from '../types/food';
import { colors } from '../theme/colors';

type FoodCardProps = {
  item: FoodItem;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
};

export const FoodCard: React.FC<FoodCardProps> = ({
  item,
  quantity,
  onAdd,
  onRemove,
}) => (
  <View style={styles.card}>
    <Image
      source={{ uri: item.imageUrl }}
      style={styles.image}
      resizeMode="cover"
    />
    <View style={styles.content}>
      <View style={styles.headerRow}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>Rs {item.price.toFixed(2)}</Text>
      </View>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.footerRow}>
        <Text style={styles.category}>{item.category}</Text>
        <View style={styles.controls}>
          <Pressable onPress={onRemove} style={styles.controlButton}>
            <Text style={styles.controlText}>-</Text>
          </Pressable>
          <Text style={styles.quantity}>{quantity}</Text>
          <Pressable onPress={onAdd} style={styles.controlButton}>
            <Text style={styles.controlText}>+</Text>
          </Pressable>
        </View>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primarySoft,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 18,
    shadowColor: colors.shadowDark,
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  name: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  description: {
    marginTop: 6,
    fontSize: 14,
    color: colors.mutedDark,
  },
  footerRow: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
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
    minWidth: 24,
    textAlign: 'center',
    fontWeight: '600',
    color: colors.textDark,
    marginHorizontal: 6,
  },
});
