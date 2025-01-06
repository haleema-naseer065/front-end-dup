import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the hook
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import HeaderComponent from '../components/header';
import NitroTrackContainer from '../components/NitrotrackandCornImage';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const ViewResults = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>(); 

  return (
    <View style={styles.container}>

      {/* Header */}
      <HeaderComponent
        rightIcons={[
          { name: 'home', onPress: () => navigation.navigate('BottomTabNavigator') },
          { name: 'help-outline', onPress: () => navigation.navigate('Tutorial') },
          { name: 'volume-up', onPress: () => console.log('Volume pressed') },
          { name: 'exit-to-app', onPress: () => navigation.navigate('StartLogin') },
        ]}
        leftIcons={[
          { name: 'arrow-back', onPress: () => navigation.goBack() },
        ]}
      />

      {/* NitroTrackContainer */}
      <NitroTrackContainer />

      {/* Subtitle */}
      <Text style={styles.subtitle}>دی گئی تصویر کے نتائج درج ذیل ہیں</Text>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.button1}
        onPress={() => navigation.navigate('NitrogenDetail')}
      >
        <Text style={styles.buttonText}>نائٹروجن کی مقدار دیکھیں</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button2}
        onPress={() => navigation.navigate('FertilizersRecommendation')}
      >
        <Text style={styles.buttonText}>تجویز کردہ کھادیں دیکھیں</Text>
      </TouchableOpacity>

      {/* Next Date */}
      <Text style={styles.nextDate}>
        اپنی فصل کا 6 نومبر 2024 کو نائٹروجن ایپ سے دوبارہ معائنہ کریں اور کھاد کی اگلی قسط ڈالیں۔
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
   
  },
  subtitle: {
    fontSize: height * 0.025, // Dynamic font size
    color: "#004d00",
    marginVertical: height * 0.02,
    marginTop: height * 0.3,
    textAlign: "center",
  },
  button1: {
    backgroundColor: "rgba(39, 73, 47, 0.8)",
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.1,
    borderRadius: height * 0.03,
    width: "75%",
    alignItems: "center",
    marginTop: height * 0.2,
    borderWidth: 1,
    borderColor: "white",
    alignSelf:'center',
  },
  button2: {
    backgroundColor: "rgba(39, 73, 47, 0.8)",
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.1,
    borderRadius: height * 0.03,
    width: "75%",
    alignItems: "center",
    marginTop: height * 0.07,
    borderWidth: 1,
    borderColor: "white",
    alignSelf:'center',

  },
  buttonText: {
    color: "#FFF",
    fontSize: height * 0.025, // Dynamic font size
  },
  nextDate: {
    fontSize: height * 0.023, // Dynamic font size
    color: "white",
    paddingHorizontal: width*0.05,
    marginVertical: height * 0.1,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default ViewResults;