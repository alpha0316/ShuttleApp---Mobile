import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface OTPProps {
  phoneNumber: string;
  firstName: string;
  lastName: string;
  isLogin?: boolean;
  onSuccess: () => void;
  onBack: () => void;
}

// AsyncStorage keys
const STORAGE_KEYS = {
  AUTH_TOKEN: '@shuttle_auth_token',
  USER_DATA: '@shuttle_user_data',
  IS_LOGGED_IN: '@shuttle_is_logged_in',
};

const OTP = ({ phoneNumber, firstName, lastName, isLogin = false, onSuccess, onBack }: OTPProps) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [shakeAnimation] = useState(new Animated.Value(0));
  
  const inputRefs = useRef<Array<TextInput | null>>([]);
  
  const BASE_URL = 'https://shuttle-backend-0.onrender.com';

  // Debug log to check received parameters
  useEffect(() => {
    console.log('📱 OTP Screen - Received props:', {
      phoneNumber,
      firstName,
      lastName,
      isLogin
    });
  }, []);

  // Countdown timer for resend cooldown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendCooldown > 0) {
      interval = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendCooldown]);

  // Shake animation for errors
  const shakeInputs = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  // Save credentials to AsyncStorage
  const saveCredentials = async (token: string, userData: any) => {
    try {
      console.log('💾 Saving credentials to AsyncStorage...');
      
      await AsyncStorage.multiSet([
        [STORAGE_KEYS.AUTH_TOKEN, token],
        [STORAGE_KEYS.USER_DATA, JSON.stringify(userData)],
        [STORAGE_KEYS.IS_LOGGED_IN, 'true'],
      ]);
      
      console.log('✅ Credentials saved successfully');
      console.log('👤 User data:', userData);
      
      return true;
    } catch (error) {
      console.error('❌ Error saving credentials:', error);
      return false;
    }
  };

  // Clear credentials (for logout)
  const clearCredentials = async () => {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.AUTH_TOKEN,
        STORAGE_KEYS.USER_DATA,
        STORAGE_KEYS.IS_LOGGED_IN,
      ]);
      console.log('🗑️ Credentials cleared');
      return true;
    } catch (error) {
      console.error('❌ Error clearing credentials:', error);
      return false;
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (error) setError('');
    if (successMessage) setSuccessMessage('');

    // Only allow single digit numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  // Handle paste from clipboard
  const handlePaste = (pastedText: string) => {
    const digits = pastedText.replace(/\D/g, '').slice(0, 6).split('');
    const newOtp = [...otp];
    
    digits.forEach((digit, index) => {
      if (index < 6) {
        newOtp[index] = digit;
      }
    });
    
    setOtp(newOtp);
    
    // Focus last filled input or verify button
    const nextIndex = Math.min(digits.length, 5);
    inputRefs.current[nextIndex]?.focus();

    // Auto-submit if all 6 digits are pasted
    if (digits.length === 6) {
      setTimeout(() => handleSubmit(newOtp), 100);
    }
  };

  const handleSubmit = async (otpArray?: string[]) => {
    const otpCode = (otpArray || otp).join('');
    
    if (otpCode.length !== 6) {
      setError('Please enter all 6 digits');
      shakeInputs();
      return;
    }

    // Validate we have a phone number
    if (!phoneNumber || phoneNumber === 'none') {
      setError('Phone number not found. Please go back and try again.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const endpoint = isLogin 
        ? `${BASE_URL}/api/auth/user/login/verify`
        : `${BASE_URL}/api/auth/user/register/verify`;

      console.log(`📤 Verifying OTP for ${isLogin ? 'LOGIN' : 'REGISTRATION'}:`, {
        phoneNumber,
        endpoint,
        isLogin
      });

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          otp: otpCode,
        }),
      });

      const data = await response.json();
      console.log('📥 OTP verification response:', {
        status: response.status,
        data: data,
        isLogin: isLogin
      });

      if (response.ok) {
        // Store user data and token
        if (data.data) {
          console.log('✅ OTP verification successful:', data.data);
          
          if (data.data.token) {
            console.log('🔐 Auth token received');
            
            // Prepare user data to save
            const userData = {
              id: data.data.user?.id || data.data.userId,
              phoneNumber: phoneNumber,
              firstName: data.data.user?.firstName || firstName,
              lastName: data.data.user?.lastName || lastName,
              email: data.data.user?.email || null,
              role: data.data.user?.role || 'user',
              isVerified: true,
              createdAt: data.data.user?.createdAt || new Date().toISOString(),
            };

            // Save credentials to AsyncStorage
            const saved = await saveCredentials(data.data.token, userData);
            
            if (saved) {
              console.log('💾 Credentials saved to AsyncStorage');
            } else {
              console.warn('⚠️ Failed to save credentials to AsyncStorage');
            }
          }
        }

        const successMsg = isLogin 
          ? '🎉 Welcome back!' 
          : '🎉 Registration successful!';
        
        setSuccessMessage(successMsg);
        
        setTimeout(() => {
          onSuccess(); // Call the success callback to navigate to main
        }, 1500);
      } else {
        // Handle specific error cases
        if (response.status === 400 || response.status === 401) {
          setError(data.message || 'Invalid OTP. Please try again.');
          shakeInputs();
          setOtp(['', '', '', '', '', '']);
          inputRefs.current[0]?.focus();
        } else if (response.status === 404) {
          const errorMsg = isLogin
            ? 'Login session expired. Please try logging in again.'
            : 'Registration session expired. Please start over.';
          setError(errorMsg);
          setTimeout(() => onBack(), 2000);
        } else if (response.status === 410) {
          setError('OTP has expired. Please request a new one.');
          setResendCooldown(0);
        } else if (response.status === 429) {
          setError('Too many attempts. Please try again later.');
        } else {
          setError(data.message || 'Verification failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('❌ Verification error:', error);
      setError('Unable to connect to the server. Please check your internet connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;

    // Validate we have a phone number
    if (!phoneNumber || phoneNumber === 'none') {
      setError('Phone number not found. Please go back and try again.');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const endpoint = isLogin
        ? `${BASE_URL}/api/auth/user/login`
        : `${BASE_URL}/api/auth/user/register`;

      const requestBody = isLogin
        ? { phoneNumber }
        : { firstName, lastName, phoneNumber };

      console.log(`📤 Resending OTP for ${isLogin ? 'LOGIN' : 'REGISTRATION'}:`, {
        endpoint,
        requestBody,
        isLogin
      });

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log('📥 Resend response:', {
        status: response.status,
        data: data,
        isLogin: isLogin
      });

      if (response.ok) {
        setSuccessMessage('✅ OTP resent successfully!');
        setResendCooldown(60);
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      } else {
        // If registration fails because user exists, switch to login flow
        if (!isLogin && (response.status === 409 || 
            data.message?.toLowerCase().includes('already exists'))) {
          console.log('🔄 User exists, switching to login flow for resend');
          
          const loginResponse = await fetch(`${BASE_URL}/api/auth/user/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phoneNumber }),
          });

          const loginData = await loginResponse.json();
          
          if (loginResponse.ok) {
            setSuccessMessage('✅ OTP resent successfully!');
            setResendCooldown(60);
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
          } else {
            setError(loginData.message || 'Failed to resend OTP. Please try again.');
          }
        } else {
          setError(data.message || 'Failed to resend OTP. Please try again.');
        }
      }
    } catch (error) {
      console.error('❌ Resend error:', error);
      setError('Unable to resend OTP. Please check your internet connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== '');
  const maskedPhone = phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1***$3');

  // Show error if no phone number
  if (!phoneNumber || phoneNumber === 'none') {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Phone Number Missing</Text>
          <Text style={styles.errorText}>
            Unable to verify your phone number. Please go back and try again.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={onBack}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>
            <Text style={styles.logoGreen}>Shuttle</Text>
            <Text style={styles.logoAmber}>App</Text>
          </Text>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Icon */}
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Text style={styles.icon}>📱</Text>
            </View>
          </View>

          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>
              {isLogin ? 'Welcome Back!' : 'Verify Your Number'}
            </Text>
            <Text style={styles.subtitle}>
              {isLogin 
                ? 'Enter the 6-digit code sent to'
                : 'We sent a 6-digit code to'
              }
            </Text>
            <Text style={styles.phoneNumber}>
              {maskedPhone}
            </Text>
          </View>

          {/* OTP Input Fields */}
          <View style={styles.otpContainer}>
            <Animated.View 
              style={[
                styles.otpInputs,
                { transform: [{ translateX: shakeAnimation }] }
              ]}
            >
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => { inputRefs.current[index] = ref; }}
                  style={[
                    styles.otpInput,
                    error && styles.otpInputError,
                    successMessage && styles.otpInputSuccess,
                    digit && !error && !successMessage && styles.otpInputFilled,
                  ]}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(index, value)}
                  onKeyPress={({ nativeEvent: { key } }) => handleKeyPress(index, key)}
                  onPaste={(e: { preventDefault: () => void; nativeEvent: { text: any; }; }) => {
                    if (index === 0) {
                      e.preventDefault();
                      handlePaste(e.nativeEvent.text || '');
                    }
                  }}
                  keyboardType="number-pad"
                  maxLength={1}
                  editable={!isLoading}
                  selectTextOnFocus
                  autoFocus={index === 0}
                />
              ))}
            </Animated.View>

            {/* Messages */}
            {error ? (
              <View style={styles.messageContainer}>
                <View style={styles.errorBox}>
                  <Text style={styles.errorIcon}>⚠️</Text>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              </View>
            ) : null}

            {successMessage ? (
              <View style={styles.messageContainer}>
                <View style={styles.successBox}>
                  <Text style={styles.successText}>{successMessage}</Text>
                </View>
              </View>
            ) : null}
          </View>

          {/* Resend Code */}
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn't receive the code? </Text>
            {resendCooldown > 0 ? (
              <View style={styles.cooldownContainer}>
                <Text style={styles.cooldownText}>
                  Resend in {resendCooldown}s
                </Text>
              </View>
            ) : (
              <TouchableOpacity 
                onPress={handleResend} 
                disabled={isLoading}
                style={styles.resendButtonContainer}
              >
                <Text style={styles.resendButton}>Resend Code</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.button,
              (!isOtpComplete || isLoading) && styles.buttonDisabled,
            ]}
            onPress={() => handleSubmit()}
            disabled={!isOtpComplete || isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <View style={styles.buttonContent}>
                <ActivityIndicator color="#fff" size="small" />
                <Text style={[styles.buttonText, { marginLeft: 8 }]}>
                  Verifying...
                </Text>
              </View>
            ) : (
              <Text style={styles.buttonText}>Verify & Continue →</Text>
            )}
          </TouchableOpacity>

          {/* Back Link */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
            disabled={isLoading}
          >
            <Text style={styles.backText}>
              ← Back to {isLogin ? 'login' : 'registration'}
            </Text>
          </TouchableOpacity>

          {/* Security Note */}
          <View style={styles.securityNote}>
            <Text style={styles.securityIcon}>🔒</Text>
            <Text style={styles.securityText}>
              Your information is secure and encrypted
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  header: {
    marginBottom: 30,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoGreen: {
    color: '#16a34a',
  },
  logoAmber: {
    color: '#f59e0b',
    fontWeight: 'normal',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 24,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0fdf4',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#16a34a',
  },
  icon: {
    fontSize: 40,
  },
  titleSection: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.6)',
    textAlign: 'center',
    marginBottom: 4,
  },
  phoneNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#16a34a',
    textAlign: 'center',
  },
  otpContainer: {
    width: '100%',
    marginBottom: 32,
  },
  otpInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  otpInput: {
    width: 52,
    height: 64,
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    backgroundColor: 'white',
    color: '#000',
  },
  otpInputFilled: {
    borderColor: '#16a34a',
    backgroundColor: '#f0fdf4',
  },
  otpInputError: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2',
  },
  otpInputSuccess: {
    borderColor: '#16a34a',
    backgroundColor: '#f0fdf4',
  },
  messageContainer: {
    marginTop: 8,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#ef4444',
  },
  errorIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  errorText: {
    flex: 1,
    color: '#ef4444',
    fontSize: 14,
    fontWeight: '500',
  },
  successBox: {
    backgroundColor: '#f0fdf4',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#16a34a',
  },
  successText: {
    color: '#16a34a',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    flexWrap: 'wrap',
  },
  resendText: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.6)',
  },
  resendButtonContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  resendButton: {
    fontSize: 14,
    color: '#16a34a',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  cooldownContainer: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  cooldownText: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.5)',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#16a34a',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#9ca3af',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    padding: 12,
    marginBottom: 24,
  },
  backText: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 14,
    textAlign: 'center',
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  securityIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  securityText: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.5)',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ef4444',
    marginBottom: 10,
  },
});

export default OTP;

// Export utility functions for use in other components
export const getStoredCredentials = async () => {
  try {
    const values = await AsyncStorage.multiGet([
      STORAGE_KEYS.AUTH_TOKEN,
      STORAGE_KEYS.USER_DATA,
      STORAGE_KEYS.IS_LOGGED_IN,
    ]);
    
    const token = values[0][1];
    const userData = values[1][1] ? JSON.parse(values[1][1]) : null;
    const isLoggedIn = values[2][1] === 'true';
    
    return { token, userData, isLoggedIn };
  } catch (error) {
    console.error('Error getting stored credentials:', error);
    return { token: null, userData: null, isLoggedIn: false };
  }
};

export const clearStoredCredentials = async () => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.AUTH_TOKEN,
      STORAGE_KEYS.USER_DATA,
      STORAGE_KEYS.IS_LOGGED_IN,
    ]);
    return true;
  } catch (error) {
    console.error('Error clearing stored credentials:', error);
    return false;
  }
};