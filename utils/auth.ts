import AsyncStorage from '@react-native-async-storage/async-storage';

// AsyncStorage keys (should match your OTP component)
const STORAGE_KEYS = {
  AUTH_TOKEN: '@shuttle_auth_token',
  USER_DATA: '@shuttle_user_data',
  IS_LOGGED_IN: '@shuttle_is_logged_in',
  ONBOARDING_COMPLETED: '@shuttle_onboarding_completed',
};

export type UserData = {
  id: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  email?: string | null;
  role: string;
  isVerified: boolean;
  createdAt: string;
};

export interface AuthState {
  token: string | null;
  userData: UserData | null;
  isLoggedIn: boolean;
  onboardingCompleted: boolean;
}

/**
 * Check if user is authenticated and get stored credentials
 */
export const checkAuthStatus = async (): Promise<AuthState> => {
  try {
    console.log('🔍 Checking authentication status...');
    
    // Get all stored values at once
    const values = await AsyncStorage.multiGet([
      STORAGE_KEYS.AUTH_TOKEN,
      STORAGE_KEYS.USER_DATA,
      STORAGE_KEYS.IS_LOGGED_IN,
      STORAGE_KEYS.ONBOARDING_COMPLETED,
    ]);

    const token = values[0][1];
    const userDataString = values[1][1];
    const isLoggedIn = values[2][1] === 'true';
    const onboardingCompleted = values[3][1] === 'true';

    const userData = userDataString ? JSON.parse(userDataString) : null;

    console.log('📊 Auth check results:', {
      hasToken: !!token,
      hasUserData: !!userData,
      isLoggedIn,
      onboardingCompleted,
      userData: userData ? {
        id: userData.id,
        phoneNumber: userData.phoneNumber,
        name: `${userData.firstName} ${userData.lastName}`,
      } : null,
    });

    // Validate token existence and expiry (if you have token expiry)
    if (token && userData) {
      // Optional: Check token expiry if you have expiration timestamp
      // const isTokenValid = checkTokenExpiry(token);
      // if (!isTokenValid) {
      //   console.log('⚠️ Token expired, logging out...');
      //   await clearCredentials();
      //   return { token: null, userData: null, isLoggedIn: false, onboardingCompleted };
      // }
      
      console.log('✅ User is authenticated');
      return { token, userData, isLoggedIn, onboardingCompleted };
    }

    console.log('❌ User is not authenticated');
    return { token: null, userData: null, isLoggedIn: false, onboardingCompleted };
    
  } catch (error) {
    console.error('❌ Error checking auth status:', error);
    return { token: null, userData: null, isLoggedIn: false, onboardingCompleted: false };
  }
};

/**
 * Save user credentials to AsyncStorage
 */
export const saveCredentials = async (token: string, userData: UserData): Promise<boolean> => {
  try {
    console.log('💾 Saving credentials...');
    
    await AsyncStorage.multiSet([
      [STORAGE_KEYS.AUTH_TOKEN, token],
      [STORAGE_KEYS.USER_DATA, JSON.stringify(userData)],
      [STORAGE_KEYS.IS_LOGGED_IN, 'true'],
    ]);
    
    console.log('✅ Credentials saved successfully');
    return true;
  } catch (error) {
    console.error('❌ Error saving credentials:', error);
    return false;
  }
};

/**
 * Mark onboarding as completed
 */
export const markOnboardingCompleted = async (): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, 'true');
    console.log('✅ Onboarding marked as completed');
    return true;
  } catch (error) {
    console.error('❌ Error marking onboarding as completed:', error);
    return false;
  }
};

/**
 * Clear all stored credentials (logout)
 */
export const clearCredentials = async (): Promise<boolean> => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.AUTH_TOKEN,
      STORAGE_KEYS.USER_DATA,
      STORAGE_KEYS.IS_LOGGED_IN,
    ]);
    console.log('✅ Credentials cleared');
    return true;
  } catch (error) {
    console.error('❌ Error clearing credentials:', error);
    return false;
  }
};

/**
 * Get current user data
 */
export const getCurrentUser = async (): Promise<UserData | null> => {
  try {
    const userDataString = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
    return userDataString ? JSON.parse(userDataString) : null;
  } catch (error) {
    console.error('❌ Error getting user data:', error);
    return null;
  }
};

/**
 * Check if onboarding has been completed
 */
export const isOnboardingCompleted = async (): Promise<boolean> => {
  try {
    const completed = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED);
    return completed === 'true';
  } catch (error) {
    console.error('❌ Error checking onboarding status:', error);
    return false;
  }
};