import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import Svg, { Path, G } from 'react-native-svg';
import PrimaryButton from '../../components/PrimaryButton';

export default function OrderTracker() {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleTrackOrder = () => {
        // Validate phone number
        if (!phoneNumber.trim()) {
            Alert.alert('Error', 'Please enter your phone number');
            return;
        }

        // Basic phone number validation (adjust regex for your country format)
        const phoneRegex = /^[0-9]{10,15}$/;
        const cleanNumber = phoneNumber.replace(/\s/g, '');
        
        if (!phoneRegex.test(cleanNumber)) {
            Alert.alert('Error', 'Please enter a valid phone number');
            return;
        }

    // Navigate to the map tracking page
    router.push({ pathname: '/screens/RiderInfo', params: { phoneNumber: cleanNumber } });
    };

    const clearPhoneNumber = () => {
        setPhoneNumber('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.brandText}>track.</Text>

            <View style={styles.headerSection}>
                <Text style={styles.title}>Let's Help You Track Your Order</Text>
                <Text style={styles.subtitle}>
                    Kindly enter your phone number to track your order
                </Text>
            </View>

            <View style={styles.inputSection}>
                <Text style={styles.label}>Your Phone Number</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter your phone number'
                        placeholderTextColor='rgba(0,0,0,0.4)'
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        keyboardType='phone-pad'
                        maxLength={15}
                    />

                    {phoneNumber.length > 0 && (
                        <TouchableOpacity onPress={clearPhoneNumber}>
                            <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <G opacity="0.4">
                                    <Path 
                                        d="M4.26634 12.6667L3.33301 11.7334L7.06634 8.00004L3.33301 4.26671L4.26634 3.33337L7.99967 7.06671L11.733 3.33337L12.6663 4.26671L8.93301 8.00004L12.6663 11.7334L11.733 12.6667L7.99967 8.93337L4.26634 12.6667Z" 
                                        fill="#1D1B20" 
                                    />
                                </G>
                            </Svg>
                        </TouchableOpacity>
                    )}
                </View>

                <PrimaryButton 
                    title='Track Order' 
                    onPress={handleTrackOrder}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
        paddingTop: 74,
        paddingHorizontal: 16,
    },
    brandText: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 8,
        color: 'rgba(0,0,0,0.5)',
    },
    headerSection: {
        flexDirection: 'column',
        gap: 8,
        marginTop: 90,
        width: 240,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: 'black',
    },
    subtitle: {
        fontSize: 14,
        color: 'rgba(0,0,0,0.6)',
    },
    inputSection: {
        flexDirection: 'column',
        gap: 12,
        marginTop: 50,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.02)',
        borderRadius: 16,
        padding: 12,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: 'white',
        borderColor: 'rgba(0,0,0,0.2)',
        borderWidth: 0.5,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
});