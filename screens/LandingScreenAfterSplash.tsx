import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import BackgroundAndLogo from '../components/BackgroundandLogo'; // Import the new component

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const LandingScreenAfterSplash = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleCreateAccount = () => {
    console.log("Pressed");
    navigation.navigate("StartSignup");
  };

  const handleOpenAccount = () => {
    navigation.navigate('StartLogin');
  };

  return (
    <View style={styles.container}>
      {/* Background and Logo Component */}
      <BackgroundAndLogo />

      {/* Blurred Rectangle */}
      <BlurView intensity={10} style={styles.blurredContainer}>
        <Text style={styles.title}>نائٹرو ٹریک</Text>
        <Text style={styles.subtitle}>نائٹروجن کھاد کی مقدار معلوم کریں</Text>
      </BlurView>

      {/* Create Account Button */}
      <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>نیا اکاؤنٹ بنائیں</Text>
      </TouchableOpacity>

      {/* Link Text */}
      <Text style={styles.beforelinkText}>کیا آپ کا اکاؤنٹ پہلے سے موجود ہے؟</Text>
      <TouchableOpacity onPress={handleOpenAccount}>
        <Text style={styles.linkText}>یہاں سے اکاؤنٹ کھولیں۔</Text>
      </TouchableOpacity>

      {/* <MaterialIcons name="person" size={width * 0.11} color="#20432E" style={styles.profileIcon} /> */}

      {/* Speaker Icon */}
      {/* <MaterialIcons name="volume-up" size={width * 0.11} color="#20432E" style={styles.speakerIcon} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  blurredContainer: {
    backgroundColor: 'rgba(116, 117, 66, 0.4)',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.04,
    borderRadius: 30,
    marginTop: height * 0.3,
    marginBottom: height * 0.25,
    // position:'absolute',
    // zIndex: 1, // Ensures it appears above the background
  },
  title: {
    fontSize: width * 0.08,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: height * 0.01,
  },
  subtitle: {
    fontSize: width * 0.04,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: height * 0.03,
    fontWeight: 'bold',

  },
  button: {
    
    backgroundColor: '#D9D9D9',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.13,
    borderRadius: 30,
    elevation: 2,
    marginTop:height * 0.04,
    marginBottom: height * 0.02,
  },
  buttonText: {
    fontSize: width * 0.05,
    color: '#20432E',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  beforelinkText: {
    fontSize: width * 0.04,
    color: '#fff',
    textAlign: 'center',
    marginTop: height * 0.01,
  },
  linkText: {
    fontSize: width * 0.045,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: height * 0.1,
  },
  speakerIcon: {
    position: 'absolute',
    top: height * 0.05,
    right: width * 0.05,
  },
  profileIcon: {
    position: 'absolute',
    top: height * 0.05,
    left: width * 0.05,
  },
});

export default LandingScreenAfterSplash;

// import React from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
// import { BlurView } from 'expo-blur';
// import { useNavigation } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RootStackParamList } from '../types';
// import BackgroundAndLogo from '../components/BackgroundandLogo'; // Import the new component
// import HeaderComponent from '../components/header'; // Import HeaderComponent

// type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

// const { width, height } = Dimensions.get('window'); // Get screen dimensions

// const LandingScreenAfterSplash = () => {
//   const navigation = useNavigation<HomeScreenNavigationProp>();

//   const handleCreateAccount = () => {
//     console.log('Pressed');
//     navigation.navigate('StartSignup');
//   };

//   const handleOpenAccount = () => {
//     navigation.navigate('BottomTabNavigator');
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <HeaderComponent
//         onProfilePress={() => console.log('Profile pressed')}
//         onVolumePress={() => console.log('Volume pressed')}
//       />

//       {/* Background and Logo Component */}
//       <BackgroundAndLogo />

//       {/* Blurred Rectangle */}
//       <BlurView intensity={1} style={styles.blurredContainer}>
//         <Text style={styles.title}>نائٹرو ٹریک</Text>
//         <Text style={styles.subtitle}>نائٹروجن کھاد کی مقدار معلوم کریں</Text>
//       </BlurView>

//       {/* Create Account Button */}
//       <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
//         <Text style={styles.buttonText}>نیا اکاؤنٹ بنائیں</Text>
//       </TouchableOpacity>

//       {/* Link Text */}
//       <Text style={styles.beforelinkText}>کیا آپ کا اکاؤنٹ پہلے سے موجود ہے؟</Text>
//       <TouchableOpacity onPress={handleOpenAccount}>
//         <Text style={styles.linkText}>یہاں سے اکاؤنٹ کھولیں۔</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   blurredContainer: {
//     backgroundColor: 'rgba(116, 117, 66, 0.3',
//     paddingVertical: height * 0.02,
//     paddingHorizontal: width * 0.04,
//     borderRadius: 30,
//     marginTop: height * 0.2,
//     marginBottom: height * 0.25,
//     zIndex: 1, // Ensures it appears above the background
//   },
//   title: {
//     fontSize: width * 0.08,
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: height * 0.01,
//   },
//   subtitle: {
//     fontSize: width * 0.04,
//     color: '#FFFFFF',
//     textAlign: 'center',
//     marginBottom: height * 0.03,
//     fontWeight: 'bold',
//   },
//   button: {
//     backgroundColor: '#D9D9D9',
//     paddingVertical: height * 0.015,
//     paddingHorizontal: width * 0.15,
//     borderRadius: 30,
//     elevation: 2,
//     marginTop: height * 0.04,
//     marginBottom: height * 0.02,
//   },
//   buttonText: {
//     fontSize: width * 0.05,
//     color: 'green',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   beforelinkText: {
//     fontSize: width * 0.04,
//     color: '#fff',
//     textAlign: 'center',
//     marginTop: height * 0.01,
//   },
//   linkText: {
//     fontSize: width * 0.045,
//     color: '#fff',
//     textAlign: 'center',
//     fontWeight: 'bold',
//     marginBottom: height * 0.1,
//   },
// });

// export default LandingScreenAfterSplash;










// LandingScreenAfterSplash.tsx

// import React from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RootStackParamList } from '../types';
// import HeaderSection from '../components/BackgroundandLogo';  // Import the new component

// type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

// const { width, height } = Dimensions.get('window');

// const LandingScreenAfterSplash = () => {
//   const navigation = useNavigation<HomeScreenNavigationProp>();

//   const handleCreateAccount = () => {
//     console.log("Pressed");
//     navigation.navigate("StartSignup");
//   };

//   const handleOpenAccount = () => {
//     navigation.navigate('BottomTabNavigator');
//   };

//   return (
//     <View style={styles.container}>
//       <HeaderSection />  {/* Use the new HeaderSection component */}
      
//       {/* Create Account Button */}
//       <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
//         <Text style={styles.buttonText}>نیا اکاؤنٹ بنائیں</Text>
//       </TouchableOpacity>

//       {/* Link Text */}
//       <Text style={styles.beforelinkText}>کیا آپ کا اکاؤنٹ پہلے سے موجود ہے؟</Text>
//       <TouchableOpacity onPress={handleOpenAccount}>
//         <Text style={styles.linkText}>یہاں سے اکاؤنٹ کھولیں۔</Text>
//       </TouchableOpacity>

//       {/* Speaker Icon */}
//       <MaterialIcons name="volume-up" size={width * 0.06} color="#20432E" style={styles.speakerIcon} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   button: {
//     backgroundColor: '#D9D9D9',
//     paddingVertical: height * 0.015,
//     paddingHorizontal: width * 0.20,
//     borderRadius: 30,
//     elevation: 2,
//     marginTop: height * 0.04,
//     marginBottom: height * 0.02,
//   },
//   buttonText: {
//     fontSize: width * 0.045,
//     color: 'green',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   beforelinkText: {
//     fontSize: width * 0.04,
//     color: '#fff',
//     textAlign: 'center',
//     marginTop: height * 0.01,
//   },
//   linkText: {
//     fontSize: width * 0.045,
//     color: '#fff',
//     textAlign: 'center',
//     fontWeight: 'bold',
//     marginTop: height * 0.01,
//   },
//   speakerIcon: {
//     position: 'absolute',
//     top: height * 0.05,
//     right: width * 0.05,
//   },
// });

// export default LandingScreenAfterSplash;
