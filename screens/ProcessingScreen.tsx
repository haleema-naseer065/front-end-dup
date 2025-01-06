import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';

type ProcessingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const ProcessingScreen = () => {
  const navigation = useNavigation<ProcessingScreenNavigationProp>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      navigation.replace('ResultsScreen'); // Use replace instead of navigate
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <>
          <Text style={styles.processingText}>
            عمل جاری ہے، براہ کرم
            {"\n"}
            انتظار کریں
          </Text>
          <ActivityIndicator size="large" color="#000" />
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
  },
  processingText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#000',
    marginBottom: 20,
    writingDirection: 'rtl',
  },
});

export default ProcessingScreen;
