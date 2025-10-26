import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: string;
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function CustomButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  size = 'medium',
  style,
  textStyle,
}: CustomButtonProps) {
  
  const getButtonStyle = () => {
    const baseStyle = [styles.button];
    
    // Size styles
    if (size === 'small') baseStyle.push(styles.buttonSmall);
    if (size === 'large') baseStyle.push(styles.buttonLarge);
    
    // Variant styles
    switch (variant) {
      case 'primary':
        baseStyle.push(styles.buttonPrimary);
        break;
      case 'secondary':
        baseStyle.push(styles.buttonSecondary);
        break;
      case 'outline':
        baseStyle.push(styles.buttonOutline);
        break;
      case 'danger':
        baseStyle.push(styles.buttonDanger);
        break;
      case 'ghost':
        baseStyle.push(styles.buttonGhost);
        break;
    }
    
    // State styles
    if (disabled || loading) baseStyle.push(styles.buttonDisabled);
    if (fullWidth) baseStyle.push(styles.buttonFullWidth);
    
    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.buttonText];
    
    // Size styles
    if (size === 'small') baseStyle.push(styles.textSmall);
    if (size === 'large') baseStyle.push(styles.textLarge);
    
    // Variant styles
    switch (variant) {
      case 'primary':
        baseStyle.push({ color: styles.textPrimary.color });
        break;
      case 'secondary':
        baseStyle.push({ color: styles.textSecondary.color });
        break;
      case 'outline':
        baseStyle.push({ color: styles.textOutline.color });
        break;
      case 'danger':
        baseStyle.push({ color: styles.textDanger.color });
        break;
      case 'ghost':
        baseStyle.push({ color: styles.textGhost.color });
        break;
    }
    
    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={[...getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' || variant === 'danger' ? '#fff' : '#34A853'} 
          size="small" 
        />
      ) : (
        <>
          {icon && <Text style={styles.icon}>{icon}</Text>}
          <Text style={[...getTextStyle(), textStyle]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Base button styles
  button: {
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 6,
  },
  buttonSmall: {
    height: 32,
    paddingHorizontal: 12,
  },
  buttonLarge: {
    height: 44,
    paddingHorizontal: 20,
  },
  buttonFullWidth: {
    width: '100%',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  
  // Variant styles
  buttonPrimary: {
    backgroundColor: '#34A853',
  },
  buttonSecondary: {
    backgroundColor: '#f5f5f5',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#34A853',
  },
  buttonDanger: {
    backgroundColor: '#EA4335',
  },
  buttonGhost: {
    backgroundColor: 'transparent',
  },
  
  // Text styles
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  textSmall: {
    fontSize: 13,
  },
  textLarge: {
    fontSize: 15,
  },
  textPrimary: {
    color: '#fff',
  },
  textSecondary: {
    color: '#333',
  },
  textOutline: {
    color: '#34A853',
  },
  textDanger: {
    color: '#fff',
  },
  textGhost: {
    color: '#34A853',
  },
  
  // Icon style
  icon: {
    fontSize: 16,
  },
});