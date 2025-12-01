import React, { useState } from 'react';
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
} from 'react-native';

interface AuthProps {
  onSuccess: (data: { 
    phoneNumber: string; 
    firstName: string; 
    lastName: string;
    isLogin: boolean;
  }) => void;
  onSkip?: () => void;
}

const Auth = ({ onSuccess, onSkip }: AuthProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  
  const BASE_URL = 'https://shuttle-backend-0.onrender.com';

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'firstName':
        if (!value.trim()) {
          return 'First name is required';
        }
        if (value.trim().length < 2) {
          return 'First name must be at least 2 characters';
        }
        if (!/^[a-zA-Z\s'-]+$/.test(value)) {
          return 'First name can only contain letters, spaces, hyphens, and apostrophes';
        }
        return '';

      case 'lastName':
        if (!value.trim()) {
          return 'Last name is required';
        }
        if (value.trim().length < 2) {
          return 'Last name must be at least 2 characters';
        }
        if (!/^[a-zA-Z\s'-]+$/.test(value)) {
          return 'Last name can only contain letters, spaces, hyphens, and apostrophes';
        }
        return '';

      case 'phone':
        if (!value) {
          return 'Phone number is required';
        }
        const cleanPhone = value.replace(/\D/g, '');
        if (cleanPhone.length !== 10) {
          return 'Phone number must be exactly 10 digits';
        }
        if (!/^0\d{9}$/.test(cleanPhone)) {
          return 'Phone number must start with 0 (e.g., 0551234567)';
        }
        return '';

      default:
        return '';
    }
  };

  const validateForm = () => {
    const newErrors: { [key in keyof typeof formData]?: string } = {};
    (Object.keys(formData) as Array<keyof typeof formData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (name: string, value: string) => {
    if (name === 'phone') {
      const cleanValue = value.replace(/\D/g, '');
      setFormData({
        ...formData,
        [name]: cleanValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    if (touched[name] && errors[name]) {
      const error = validateField(name, value);
      setErrors({
        ...errors,
        [name]: error,
      });
    }
  };

  const handleBlur = (name: keyof typeof formData) => {
    setTouched({
      ...touched,
      [name]: true,
    });

    const error = validateField(name, formData[name]);
    if (error) {
      setErrors({
        ...errors,
        [name]: error,
      });
    } else {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  // Function to handle login for existing users
  const handleExistingUserLogin = async (phoneNumber: string) => {
    try {
      console.log('🔄 Initiating login for existing user:', phoneNumber);
      
      const response = await fetch(`${BASE_URL}/api/auth/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
        }),
      });

      console.log('📥 Login API response status:', response.status);

      let data;
      try {
        data = await response.json();
        console.log('📥 Login API response data:', data);
      } catch (e) {
        console.error('❌ Failed to parse login response');
        return false;
      }

      if (response.ok) {
        console.log('✅ Login API call successful, OTP should be sent');
        return true;
      } else {
        console.error('❌ Login API call failed:', response.status, data);
        return false;
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      return false;
    }
  };

const handleSubmit = async () => {
  setTouched({
    firstName: true,
    lastName: true,
    phone: true,
  });

  if (!validateForm()) {
    console.log('❌ Form validation failed');
    return;
  }

  setIsLoading(true);

  try {
    const requestBody = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      phoneNumber: formData.phone,
    };

    console.log('📤 Sending registration request:', requestBody);
    console.log('📱 DEBUG - Phone number to be sent to OTP:', formData.phone);

    const response = await fetch(`${BASE_URL}/api/auth/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('📥 Registration response status:', response.status);
    
    let data;
    try {
      data = await response.json();
      console.log('📥 Registration response data:', data);
    } catch (parseError) {
      console.error('❌ Failed to parse response');
      throw new Error('Invalid response from server');
    }

    // Check if user already exists
    const userAlreadyExists = response.status === 409 || 
                             (response.status === 400 && 
                              (data.message?.toLowerCase().includes('already exists') ||
                               data.message?.toLowerCase().includes('user exists')));

    if (response.ok) {
      // New user registration successful - call onSuccess
      console.log('✅ Registration successful, OTP sent - Calling onSuccess');
      onSuccess({
        phoneNumber: formData.phone,
        firstName: formData.firstName,
        lastName: formData.lastName,
        isLogin: false, // This is a NEW user registration
      });
    } else if (userAlreadyExists) {
      // User already exists - call login endpoint to send OTP
      console.log('⚠️ User already exists. Initiating login flow...');
      
      const loginSuccess = await handleExistingUserLogin(formData.phone);
      
      if (loginSuccess) {
        console.log('✅ Login OTP sent - Calling onSuccess with isLogin: TRUE');
        // CRITICAL FIX: Pass isLogin: true for existing users
        onSuccess({
          phoneNumber: formData.phone,
          firstName: formData.firstName,
          lastName: formData.lastName,
          isLogin: true, // THIS MUST BE TRUE FOR EXISTING USERS
        });
      } else {
        Alert.alert(
          'Error',
          'Unable to send OTP. Please try again.'
        );
        setErrors({
          phone: 'Unable to send OTP. Please try again.',
        });
        setIsLoading(false); // Make sure to set loading to false on error
      }
    } else if (response.status === 400) {
      // Bad Request - show validation errors
      console.error('❌ 400 Bad Request:', data);
      
      let errorMessage = data.message || 'Invalid input. Please check your details and try again.';
      
      if (data.errors && Array.isArray(data.errors)) {
        // Handle field-specific errors from backend
        const fieldErrors: { [key: string]: string } = {};
        data.errors.forEach((err: any) => {
          if (err.path) {
            fieldErrors[err.path] = err.msg || err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        Alert.alert('Validation Error', errorMessage);
      }
      setIsLoading(false);
    } else {
      // Other errors
      console.error('❌ Unexpected error:', response.status, data);
      Alert.alert(
        'Registration Failed',
        data.message || 'Registration failed. Please try again.'
      );
      setIsLoading(false);
    }
  } catch (error) {
    console.error('❌ Registration error:', error);
    Alert.alert(
      'Connection Error', 
      'Unable to connect to the server. Please check your internet connection and try again.'
    );
    setIsLoading(false);
  }
  // Remove the finally block to avoid setting isLoading to false prematurely
};

  const isFormComplete = Object.values(formData).every((field) => field.trim() !== '');

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
          <View style={styles.titleSection}>
            <Text style={styles.title}>Let's get you started!</Text>
            <Text style={styles.subtitle}>Enter your details to continue</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* First Name Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={[
                  styles.input,
                  errors.firstName && touched.firstName && styles.inputError
                ]}
                placeholder="Enter your first name"
                value={formData.firstName}
                onChangeText={(value) => handleChange('firstName', value)}
                onBlur={() => handleBlur('firstName')}
                editable={!isLoading}
                autoComplete="name-given"
                autoCapitalize="words"
                returnKeyType="next"
              />
              {errors.firstName && touched.firstName && (
                <Text style={styles.errorText}>{errors.firstName}</Text>
              )}
            </View>

            {/* Last Name Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={[
                  styles.input,
                  errors.lastName && touched.lastName && styles.inputError
                ]}
                placeholder="Enter your last name"
                value={formData.lastName}
                onChangeText={(value) => handleChange('lastName', value)}
                onBlur={() => handleBlur('lastName')}
                editable={!isLoading}
                autoComplete="name-family"
                autoCapitalize="words"
                returnKeyType="next"
              />
              {errors.lastName && touched.lastName && (
                <Text style={styles.errorText}>{errors.lastName}</Text>
              )}
            </View>

            {/* Phone Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={[
                  styles.input,
                  errors.phone && touched.phone && styles.inputError
                ]}
                placeholder="e.g. 0551234567"
                value={formData.phone}
                onChangeText={(value) => handleChange('phone', value)}
                onBlur={() => handleBlur('phone')}
                editable={!isLoading}
                keyboardType="phone-pad"
                autoComplete="tel"
                returnKeyType="done"
                maxLength={10}
              />
              {errors.phone && touched.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[
                styles.button,
                (!isFormComplete || isLoading) && styles.buttonDisabled
              ]}
              onPress={handleSubmit}
              disabled={!isFormComplete || isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Continue</Text>
              )}
            </TouchableOpacity>

            <Text style={styles.footerText}>
              An OTP code will be sent to your number for verification
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
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  header: {
    marginBottom: 20,
  },
  logo: {
    fontSize: 20,
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
  },
  titleSection: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.6)',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.7)',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    backgroundColor: 'white',
  },
  inputError: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    backgroundColor: '#16a34a',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#9ca3af',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 14,
    marginTop: 20,
  },
});

export default Auth;