import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenContainer } from '../components/ScreenContainer';
import { useAuth } from '../auth/AuthContext';
import { colors } from '../theme/colors';
import { appAssets } from '../theme/assets';

export const SignInScreen: React.FC = () => {
  const { signInWithGoogle, isLoading } = useAuth();

  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.content}>
        {appAssets.logoUri ? (
          <Image source={{ uri: appAssets.logoUri }} style={styles.logo} />
        ) : null}
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>
          Sign in quickly using your Google account.
        </Text>
      </View>
      <PrimaryButton
        title="Continue with Google"
        onPress={signInWithGoogle}
        isLoading={isLoading}
        style={styles.googleButton}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    marginTop: 12,
    fontSize: 16,
    color: colors.muted,
  },
  logo: {
    width: 140,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  googleButton: {
    backgroundColor: colors.primary,
  },
});
