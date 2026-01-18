import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type OrderStatus = 'Pending' | 'Accepted' | 'Processing' | 'Dispatched';

export type OrderState = {
  status: OrderStatus;
  createdAt: number;
};

const ORDER_STATUS_KEY = 'order.status.v1';
const STEP_MS = 10000;

const statusSteps: OrderStatus[] = [
  'Pending',
  'Accepted',
  'Processing',
  'Dispatched',
];

type OrderContextValue = {
  currentOrder: OrderState | null;
  startOrder: () => Promise<void>;
  clearOrder: () => Promise<void>;
};

const OrderContext = createContext<OrderContextValue | undefined>(undefined);

const calculateStatus = (createdAt: number): OrderStatus => {
  const elapsedSteps = Math.floor((Date.now() - createdAt) / STEP_MS);
  const index = Math.min(elapsedSteps, statusSteps.length - 1);
  return statusSteps[index];
};

export const OrderProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [currentOrder, setCurrentOrder] = useState<OrderState | null>(null);

  useEffect(() => {
    const restore = async () => {
      const raw = await AsyncStorage.getItem(ORDER_STATUS_KEY);
      if (!raw) {
        return;
      }
      const parsed = JSON.parse(raw) as OrderState;
      setCurrentOrder({
        ...parsed,
        status: calculateStatus(parsed.createdAt),
      });
    };
    restore();
  }, []);

  useEffect(() => {
    if (!currentOrder) {
      return;
    }
    const timer = setInterval(() => {
      setCurrentOrder(prev => {
        if (!prev) {
          return prev;
        }
        const nextStatus = calculateStatus(prev.createdAt);
        if (nextStatus === prev.status) {
          return prev;
        }
        return {
          ...prev,
          status: nextStatus,
        };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentOrder]);

  useEffect(() => {
    if (!currentOrder) {
      return;
    }
    AsyncStorage.setItem(ORDER_STATUS_KEY, JSON.stringify(currentOrder));
  }, [currentOrder]);

  const startOrder = useCallback(async () => {
    const order: OrderState = {
      status: 'Pending',
      createdAt: Date.now(),
    };
    setCurrentOrder(order);
    await AsyncStorage.setItem(ORDER_STATUS_KEY, JSON.stringify(order));
  }, []);

  const clearOrder = useCallback(async () => {
    setCurrentOrder(null);
    await AsyncStorage.removeItem(ORDER_STATUS_KEY);
  }, []);

  const value = useMemo(
    () => ({
      currentOrder,
      startOrder,
      clearOrder,
    }),
    [currentOrder, startOrder, clearOrder],
  );

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

export const useOrder = (): OrderContextValue => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
