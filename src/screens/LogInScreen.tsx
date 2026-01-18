import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenContainer } from '../components/ScreenContainer';
import { useAuth } from '../auth/AuthContext';
import { colors } from '../theme/colors';

export const LoggedInScreen: React.FC = () => {
  const { user, signOut, isLoading } = useAuth();

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <Text style={styles.title}>You are signed in</Text>
        {user?.photoUrl ? (
          <Image source={{ uri: user.photoUrl }} style={styles.avatar} />
        ) : null}
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>
      <PrimaryButton title="Sign out" onPress={signOut} isLoading={isLoading} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 16,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
  },
  email: {
    marginTop: 6,
    fontSize: 14,
    color: colors.mutedDark,
  },
});
