import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function OrderTracker() {


    return (
        <View style={styles.container}>
            <View className='flex flex-row items-center justify-between'>
                <Text style={styles.brandText}>Connect.</Text>

                <View className='flex flex-row items-center gap-2'>
                    <View className='p-1.5 bg-neutral-50 rounded-[60px] inline-flex justify-start items-center gap-2.5'>
                        <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <Path d="M4 3H10.5M4 6H10.5M4 9H10.5M1.5 3H1.505M1.5 6H1.505M1.5 9H1.505" stroke="black" stroke-opacity="0.5" stroke-linecap="round" stroke-linejoin="round" />
                        </Svg>
                    </View>
                    <View className='p-1.5 bg-neutral-50 rounded-[60px] inline-flex justify-start items-center gap-2.5'>
                        <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <Path d="M4.5 11H7.5C10 11 11 10 11 7.5V4.5C11 2 10 1 7.5 1H4.5C2 1 1 2 1 4.5V7.5C1 10 2 11 4.5 11Z" stroke="black" stroke-opacity="0.5" stroke-linecap="round" stroke-linejoin="round" />
                            <Path d="M1.01465 4.25H10.9996" stroke="black" stroke-opacity="0.5" stroke-linecap="round" stroke-linejoin="round" />
                            <Path d="M1.01465 7.75H10.9996" stroke="black" stroke-opacity="0.5" stroke-linecap="round" stroke-linejoin="round" />
                            <Path d="M4.25488 10.995V1.005" stroke="black" stroke-opacity="0.5" stroke-linecap="round" stroke-linejoin="round" />
                            <Path d="M7.75488 10.995V1.005" stroke="black" stroke-opacity="0.5" stroke-linecap="round" stroke-linejoin="round" />
                        </Svg>
                    </View>
                    <View className='p-1.5 bg-green-600 rounded-[60px] inline-flex justify-start items-center gap-2.5'>
                        <Svg  width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <Path d="M8.095 1H6.375V4V4.375V6.875H11V4.375V4V3.905C11 2.085 9.915 1 8.095 1Z" fill="white" />
                            <Path d="M1 5.125V7.625V7.875V8.095C1 9.915 2.085 11 3.905 11H5.625V7.875V7.625V5.125H1Z" fill="white" />
                            <Path d="M5.625 1V4.375H1V3.905C1 2.085 2.085 1 3.905 1H5.625Z" fill="white" />
                            <Path d="M11 7.625V8.095C11 9.915 9.915 11 8.095 11H6.375V7.625H11Z" fill="white" />
                        </Svg>
                    </View>
                </View>

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