import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenContainer } from '../components/ScreenContainer';
import { useAuth } from '../auth/AuthContext';
import { RootStackParamList } from '../navigation/RootNavigator';
import { colors } from '../theme/colors';

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export const SignUpScreen: React.FC<SignUpScreenProps> = ({
  navigation,
}) => {
  const { signInWithGoogle, isLoading } = useAuth();

  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.subtitle}>
          Sign up instantly using your Google account.
        </Text>
      </View>
      <PrimaryButton
        title="Create account with Google"
        onPress={signInWithGoogle}
        isLoading={isLoading}
      />
      <Pressable
        onPress={() => navigation.navigate('SignIn')}
        style={styles.linkButton}
      >
        <Text style={styles.linkText}>Already have an account? Sign in</Text>
      </Pressable>
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
  linkButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
});
