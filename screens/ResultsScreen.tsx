import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type ResultsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ResultsScreen'>;
type ResultsScreenRouteProp = RouteProp<RootStackParamList, 'ResultsScreen'>;

const ResultScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<ResultsScreenRouteProp>();

  const {
    spad_index,
    nitrogen_required_kg_per_acre,
    urea_kg,
    CAN_kg,
    ammonium_sulphate_kg,
    test_leaf_segmented,
    message,
  } = route.params;

  const isTooHigh = spad_index > 95;
const format = (value: number | undefined) => 
  typeof value === 'number' ? value.toFixed(2) : '0.00';

  console.log('spad',spad_index)
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerTitle}>Nitrogen App (نائٹروجن ایپ)</Text>

        {isTooHigh ? (
          <Text style={styles.mainHeading}>{message}</Text>
        ) : (
          <>
            <Text style={styles.mainHeading}>تصویر اور نتائج درج ذیل ہیں</Text>

            <View style={styles.resultContainer}>
              <View style={styles.metricsContainer}>
                <Text style={styles.metric}>SPAD Index: {spad_index}</Text>
                <Text style={styles.metric}>
                  نائٹروجن درکار: {nitrogen_required_kg_per_acre} کلوگرام فی ایکڑ
                </Text>
              </View>

              <Image
                source={{ uri: `data:image/jpeg;base64,${test_leaf_segmented}` }}
                style={styles.cropImage}
              />
            </View>

            <View style={styles.fertilizerSection}>
              <Text style={styles.fertilizerHeading}>
                آپ اپنی گندم کی فصل کو مندرجہ ذیل کھادوں میں سے کوئی بھی کھاد ڈال سکتے ہیں
              </Text>

              <Text style={styles.fertilizerDetails}>
                {`یوریا ${urea_kg.toFixed(2)} کلوگرام فی ایکڑ    یا\n`}
                {`ایمونیم سلفیٹ ${ammonium_sulphate_kg.toFixed(2)} کلوگرام فی ایکڑ    یا\n`}
                {`کیلشیم ایمونیم نائٹریٹ ${CAN_kg.toFixed(2)} کلوگرام فی ایکڑ`}
              </Text>
            </View>

            <Text style={styles.nextCheckText}>
              اپنی فصل کا چند دن بعد نائٹروجن ایپ سے دوبارہ معائنہ کریں اور کھاد کی اگلی قسط ڈالیں۔
            </Text>
          </>
        )}

        <TouchableOpacity
          style={styles.restartButton}
          onPress={() => navigation.navigate('BottomTabNavigator')}
        >
          <Text style={styles.restartButtonText}>دوبارہ شروع کریں</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { padding: 16 },
  headerTitle: {
    fontSize: 24,
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },
  mainHeading: {
    fontSize: 24,
    textAlign: 'center',
    color: '#2E7D32',
    marginBottom: 24,
    fontWeight: '700',
  },
  resultContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  metricsContainer: { flex: 1 },
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
    marginLeft: 10,
  },
  fertilizerSection: { marginBottom: 24 },
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
