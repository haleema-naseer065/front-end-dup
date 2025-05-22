import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

import { StackNavigationProp } from '@react-navigation/stack';
import BackgroundAndLogo from '../components/BackgroundandLogo';
import HeaderComponent from '../components/header'; // Import HeaderComponent
import { RootStackParamList } from '../types';
import { store } from '../redux/store';
import { logout } from '../redux/slice/userSlice';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  // Handle navigation on button press
  const handleNitrogenEstimation = () => {
    navigation.navigate('MaizeTypes');
  };

  const handleViewHistory = () => {
    navigation.navigate('HistoryDetails');
  };
  const handleLogout = () => {
    // Dispatch logout action to clear user state
    store.dispatch(logout());
    
    // Reset navigation stack completely
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'StartLogin' }],
      })
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Component */}
      <HeaderComponent
  rightIcons={[
    { name: 'person', onPress: () => navigation.navigate('EditProfile') },
    // { name: 'volume-up', onPress: () => console.log('Volume pressed') },
    { name: 'exit-to-app', onPress: handleLogout },  ]}
  leftIcons={[
    // { name: 'arrow-back', onPress: () => navigation.goBack() },
  ]}
/>


      {/* Background and Logo */}
      <BackgroundAndLogo />

      {/* Top Icon and Title */}
      <View style={styles.header}>
        <BlurView intensity={10} style={styles.blurredContainer}>
          <Text style={styles.title}>نائٹرو ٹریک</Text>
        </BlurView>
      </View>

      {/* Nitrogen Estimation Button */}
      <TouchableOpacity style={styles.button} onPress={handleNitrogenEstimation}>
        <Image
          source={require('../assets/images/sample.jpg')} // Use the nitrogen image
          style={styles.buttonImage}
        />
        <Text style={styles.buttonText}>
          اپنی مکئی کی فصل میں نائٹروجن کھاد کی مقدار معلوم کریں
        </Text>
      </TouchableOpacity>

      {/* View History Button */}
      {/* <TouchableOpacity style={styles.button} onPress={handleViewHistory}>
        <Text style={styles.buttonText}>
          پہلے کئے گئے نائٹروجن کھاد کے حساب کتاب کی تفصیل دیکھیں
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    marginTop: height * 0.05, // 5% of screen height
    alignItems: 'center',
  },
  blurredContainer: {
    backgroundColor: 'rgba(116, 117, 66, 0.5)',
    paddingVertical: height * 0.01, // Adjust based on screen height
    paddingHorizontal: width * 0.05,
    borderRadius: 30,
    padding: width * 0.05,
  },
  title: {
    fontSize: width * 0.08, // Scaled font size (8% of screen width)
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    paddingVertical: height * 0.02, // 2% of screen height
    paddingHorizontal: width * 0.05,
    width: '80%', // Button width is 80% of the screen width
    // marginTop: height * 0.03, // 3% of screen height as margin
    marginBottom: Dimensions.get('window').height * -0.21, // Responsive bottom margin
    marginTop: Dimensions.get('window').height * 0.24, // Responsive top margin
    flexDirection: 'row',
    // alignItems: 'center',
    elevation: 5, // Shadow for Android
  },
  buttonImage: {
    width: width * 0.15, // 15% of screen width
    height: height * 0.1, // 10% of screen height
    marginRight: width * 0.03, // 3% of screen width
    borderRadius: 10,
    elevation: 5,
  },
  buttonText: {
    fontSize: width * 0.05, // 5% of screen width
    color: '#20432E',
    textAlign: 'right',
    flexShrink: 1,
  },
});
export default HomeScreen;
