import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { FoodItem } from '../types/food';

export type CartEntry = {
  item: FoodItem;
  quantity: number;
};

type CartContextValue = {
  items: CartEntry[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: FoodItem) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [cartMap, setCartMap] = useState<Record<string, CartEntry>>({});

  const addItem = useCallback((item: FoodItem) => {
    setCartMap(prev => {
      const existing = prev[item.id];
      const quantity = existing ? existing.quantity + 1 : 1;
      return {
        ...prev,
        [item.id]: { item, quantity },
      };
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setCartMap(prev => {
      const existing = prev[itemId];
      if (!existing) {
        return prev;
      }
      if (existing.quantity <= 1) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [itemId]: {
          ...existing,
          quantity: existing.quantity - 1,
        },
      };
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartMap({});
  }, []);

  const items = useMemo(() => Object.values(cartMap), [cartMap]);

  const totalItems = useMemo(
    () => items.reduce((sum, entry) => sum + entry.quantity, 0),
    [items],
  );

  const totalPrice = useMemo(
    () =>
      items.reduce(
        (sum, entry) => sum + entry.item.price * entry.quantity,
        0,
      ),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      totalItems,
      totalPrice,
      addItem,
      removeItem,
      clearCart,
    }),
    [items, totalItems, totalPrice, addItem, removeItem, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
