import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenContainer } from '../components/ScreenContainer';
import { useAuth } from '../auth/AuthContext';
import { colors } from '../theme/colors';

export const ProfileScreen: React.FC = () => {
  const { user, signOut, isLoading } = useAuth();

  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.content}>
        <View style={styles.card}>
          {user?.photoUrl ? (
            <Image source={{ uri: user.photoUrl }} style={styles.avatar} />
          ) : null}
          <Text style={styles.name}>{user?.name ?? 'Foodie'}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
        <View style={styles.footer}>
          <PrimaryButton
            title="Sign out"
            onPress={signOut}
            isLoading={isLoading}
            style={styles.signOutButton}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  card: {
    backgroundColor: colors.primarySoft,
    borderRadius: 20,
    padding: 24,
    marginTop: 24,
    alignItems: 'center',
    shadowColor: colors.shadowDark,
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
  },
  email: {
    marginTop: 6,
    fontSize: 14,
    color: colors.mutedDark,
  },
  footer: {
    marginTop: 'auto',
  },
  signOutButton: {
    width: '100%',
  },
});
