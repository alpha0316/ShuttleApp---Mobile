import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Call the onComplete callback to update the parent state
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <View style={styles.container}>
      <Text className='font-bold text-green-600 text-[40px]'>Shuttle</Text>
      <Text className='text-amber-400 text-[40px]'>App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontWeight: '700',
    fontSize: 40,
  },
});