import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';

type ResultsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Results'>;

const ResultScreen = () => {
  const navigation = useNavigation<ResultsScreenNavigationProp>();
// const ResultScreen = () => {
  // Static data
  const resultData = {
    NR: 1.02,
    FNDVI: 0.58,
    TNDVI: 0.53,
    RI: 1.08,
    nextCheckDate: 'Feb-5-2025',
    fertilizers: {
      urea: 2.23,
      ammoniumSulfate: 4.88,
      calciumAmmoniumNitrate: 3.94
    }
  };

  const cropImage = require('../assets/images/sample.jpg'); // You'll need to add your own image

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerTitle}>
          Nitrogen App (نائٹروجن ایپ)
        </Text>

        <Text style={styles.mainHeading}>
          تصویر اور نتائج درج ذیل ہیں
        </Text>

        <View style={styles.resultContainer}>
          <View style={styles.metricsContainer}>
            <Text style={styles.metric}>NR: {resultData.NR} kg/acre</Text>
            <Text style={styles.metric}>FNDVI: {resultData.FNDVI}</Text>
            <Text style={styles.metric}>TNDVI: {resultData.TNDVI}</Text>
            <Text style={styles.metric}>RI: {resultData.RI}</Text>
          </View>
          
          <Image 
            source={cropImage}
            style={styles.cropImage}
          />
        </View>

        <View style={styles.fertilizerSection}>
          <Text style={styles.fertilizerHeading}>
            آپ اپنی گندم کی فصل کو مندرجہ ذیل کھادوں میں سے کوئی بھی کھاد ڈال سکتے ہیں
          </Text>
          
          <Text style={styles.fertilizerDetails}>
            {`یوریا ${resultData.fertilizers.urea} کلوگرام فی ایکڑ    یا\n`}
            {`ایمونیم سلفیٹ ${resultData.fertilizers.ammoniumSulfate} کلوگرام فی ایکڑ    یا\n`}
            {`کیلشیم ایمونیم نائٹریٹ ${resultData.fertilizers.calciumAmmoniumNitrate} کلوگرام فی ایکڑ`}
          </Text>
        </View>

        <Text style={styles.nextCheckText}>
          {`اپنی فصل کا ${resultData.nextCheckDate} کو نائٹروجن ایپ سے دوبارہ معائنہ کریں اور کھاد کی اگلی قسط ڈالیں۔`}
        </Text>

        <TouchableOpacity 
          style={styles.restartButton}
          onPress={() => navigation.navigate("BottomTabNavigator")}
        >
          <Text style={styles.restartButtonText}>دوبارہ شروع کریں</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },
  mainHeading: {
    fontSize: 28,
    textAlign: 'center',
    color: '#2E7D32',
    marginBottom: 24,
  },
  resultContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  metricsContainer: {
    flex: 1,
  },
  metric: {
    fontSize: 16,
    marginBottom: 8,
    color: '#2E7D32',
    fontWeight: '600',
  },
  cropImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  fertilizerSection: {
    marginBottom: 24,
  },
  fertilizerHeading: {
    fontSize: 20,
    textAlign: 'right',
    color: '#000',
    marginBottom: 16,
    fontWeight: '700',
  },
  fertilizerDetails: {
    fontSize: 18,
    textAlign: 'right',
    color: '#2E7D32',
    lineHeight: 28,
  },
  nextCheckText: {
    fontSize: 18,
    textAlign: 'right',
    color: 'red',
    marginBottom: 32,
    fontWeight: '600',
  },
  restartButton: {
    backgroundColor: '#8FBC8B',
    borderRadius: 25,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  restartButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
  },
});

export default ResultScreen;