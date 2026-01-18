import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Alert } from 'react-native';
import { AuthUser } from '../types/auth';
import {
  configureGoogleAuth,
  googleSignIn,
  googleSignOut,
  googleSignInSilently,
} from './googleAuth';

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    configureGoogleAuth();
    const restoreSession = async () => {
      try {
        const existingUser = await googleSignInSilently();
        if (existingUser) {
          setUser(existingUser);
        }
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Failed to restore session.';
        Alert.alert('Sign in failed', message);
      }
    };
    restoreSession();
  }, []);

  const signInWithGoogle = useCallback(async () => {
    setIsLoading(true);
    try {
      const authUser = await googleSignIn();
      setUser(authUser);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Google sign-in failed.';
      Alert.alert('Sign in failed', message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    setIsLoading(true);
    try {
      await googleSignOut();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      signInWithGoogle,
      signOut,
    }),
    [user, isLoading, signInWithGoogle, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
