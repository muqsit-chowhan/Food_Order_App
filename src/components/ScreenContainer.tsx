import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

type ScreenContainerProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  style,
}) => (
  <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.background,
  },
});
