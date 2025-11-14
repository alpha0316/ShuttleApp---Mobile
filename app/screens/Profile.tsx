import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';


export default function OrderTracker() {
 

    return (
        <View style={styles.container}>
            <Text style={styles.brandText}>Profile.</Text>

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