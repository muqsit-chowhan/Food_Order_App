import {
  GoogleSignin,
  User,
  statusCodes,
  SignInResponse,
} from '@react-native-google-signin/google-signin';
import { Platform } from 'react-native';
import { googleOAuthConfig } from '../config/google';
import { AuthUser } from '../types/auth';

const hasValidWebClientId =
  !!googleOAuthConfig.webClientId &&
  !googleOAuthConfig.webClientId.startsWith('YOUR_');

const mapGoogleUser = (userInfo: User, idToken?: string): AuthUser => ({
  id: userInfo.user.id,
  name: userInfo.user.name ?? 'Google User',
  email: userInfo.user.email,
  photoUrl: userInfo.user.photo ?? undefined,
  idToken,
});

export const configureGoogleAuth = () => {
  const config: { iosClientId?: string; webClientId?: string } = {
    iosClientId: googleOAuthConfig.iosClientId,
  };

  if (hasValidWebClientId) {
    config.webClientId = googleOAuthConfig.webClientId;
  }

  GoogleSignin.configure(config);
};

export const googleSignIn = async (): Promise<AuthUser> => {
  try {
    if (Platform.OS === 'android') {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
    }

    const signInResponse: SignInResponse = await GoogleSignin.signIn();
    if (signInResponse.type !== 'success') {
      throw new Error('Google sign-in was cancelled.');
    }

    const userInfo = signInResponse.data;
    if (!hasValidWebClientId) {
      return mapGoogleUser(userInfo);
    }

    const tokens = await GoogleSignin.getTokens();
    return mapGoogleUser(userInfo, tokens.idToken ?? undefined);
  } catch (error) {
    const code = (error as { code?: string }).code;
    if (code === statusCodes.SIGN_IN_CANCELLED) {
      throw new Error('Google sign-in was cancelled.');
    }
    if (code === statusCodes.IN_PROGRESS) {
      throw new Error('Google sign-in is already in progress.');
    }
    if (code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      throw new Error('Google Play Services is not available.');
    }
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Google sign-in failed. Please try again.');
  }
};

export const googleSignOut = async () => {
  await GoogleSignin.signOut();
};

export const googleSignInSilently = async (): Promise<AuthUser | null> => {
  const hasPreviousSignIn = GoogleSignin.hasPreviousSignIn();
  if (!hasPreviousSignIn) {
    return null;
  }
  const response = await GoogleSignin.signInSilently();
  if (response.type !== 'success') {
    return null;
  }
  return mapGoogleUser(response.data);
};
