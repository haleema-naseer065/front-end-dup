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
        {/* <Text style={styles.headerTitle}>Nitrogen App (نائٹروجن ایپ)</Text> */}

        {isTooHigh ? (
          <Text style={styles.mainHeading}>{message}</Text>
        ) : (
          <>
            <Text style={styles.mainHeading}>تصویر اور نتائج درج ذیل ہیں</Text>

            {/* Center Image Section */}
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: `data:image/jpeg;base64,${test_leaf_segmented}` }}
                style={styles.cropImage}
              />
            </View>

            {/* SPAD and Nitrogen Results Card */}
            <View style={styles.resultsCard}>
              <Text style={styles.cardTitle}>تجزیہ کے نتائج</Text>
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>SPAD Index:</Text>
                <Text style={styles.resultValue}>{spad_index}</Text>
              </View>
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>نائٹروجن درکار:</Text>
                <Text style={styles.resultValue}>{nitrogen_required_kg_per_acre} کلوگرام فی ایکڑ</Text>
              </View>
            </View>

            {/* Fertilizer Recommendations Section */}
            <View style={styles.fertilizerCard}>
              <Text style={styles.cardTitle}>کھاد کی سفارشات</Text>
              <Text style={styles.fertilizerSubheading}>
                آپ اپنی گندم کی فصل کو مندرجہ ذیل کھادوں میں سے کوئی بھی کھاد ڈال سکتے ہیں:
              </Text>

              <View style={styles.fertilizerOption}>
                <View style={styles.fertilizerHeader}>
                  <Text style={styles.fertilizerName}>یوریا</Text>
                  <Text style={styles.fertilizerAmount}>{urea_kg.toFixed(2)} کلوگرام فی ایکڑ</Text>
                </View>
              </View>

              <View style={styles.fertilizerDivider} />

              <View style={styles.fertilizerOption}>
                <View style={styles.fertilizerHeader}>
                  <Text style={styles.fertilizerName}>ایمونیم سلفیٹ</Text>
                  <Text style={styles.fertilizerAmount}>{ammonium_sulphate_kg.toFixed(2)} کلوگرام فی ایکڑ</Text>
                </View>
              </View>

              <View style={styles.fertilizerDivider} />

              <View style={styles.fertilizerOption}>
                <View style={styles.fertilizerHeader}>
                  <Text style={styles.fertilizerName} >کیلشیم ایمونیم نائٹریٹ</Text>
                  <Text style={styles.fertilizerAmount}>{CAN_kg.toFixed(2)} کلوگرام فی ایکڑ</Text>
                </View>
              </View>
            </View>

            {/* Important Note */}
            <View style={styles.noteCard}>
              <Text style={styles.noteText}>
                اپنی فصل کا چند دن بعد نائٹروجن ایپ سے دوبارہ معائنہ کریں اور کھاد کی اگلی قسط ڈالیں۔
              </Text>
            </View>
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
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f5' 
  },
  scrollContent: { 
    padding: 16 
  },
  headerTitle: {
    fontSize: 24,
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '700',
  },
  mainHeading: {
    fontSize: 22,
    textAlign: 'center',
    color:"rgba(39, 73, 47, 0.8)",
    marginTop: 40,
    marginBottom: 30,
    fontWeight: '700',
  },
  
  // Image Section
  imageContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  cropImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'gray',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  // Results Card
  resultsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderLeftWidth: 4,
    borderLeftColor: 'gray',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: "rgba(39, 73, 47, 0.8)",
    textAlign: 'center',
    marginBottom: 16,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  resultLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    flex: 1,
  },
  resultValue: {
    fontSize: 16,
    color: 'black',
    fontWeight: '700',
    textAlign: 'right',
    flex: 1,
  },

  // Fertilizer Card
  fertilizerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderLeftWidth: 4,
    borderLeftColor: 'gray',
  },
  fertilizerSubheading: {
    fontSize: 16,
    textAlign: 'right',
    color: '#666',
    marginBottom: 16,
    lineHeight: 24,
  },
  fertilizerOption: {
    paddingVertical: 12,
  },
  fertilizerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fertilizerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E7D32',
    flex: 1,
    textAlign: 'right',
  },
  fertilizerAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
    flex: 1,
    textAlign: 'left',
  },
  fertilizerDivider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
  },

  // Note Card
  noteCard: {
    backgroundColor: '#fff3cd',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#ff6b35',
  },
  noteText: {
    fontSize: 16,
    textAlign: 'right',
    color: '#856404',
    fontWeight: '600',
    lineHeight: 24,
  },

  // Restart Button
  restartButton: {
    backgroundColor: "rgba(39, 73, 47, 0.8)",
    borderRadius: 25,
    padding: 16,
    paddingHorizontal:9,
    alignItems: 'center',
    marginBottom: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  restartButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
});

export default ResultScreen;