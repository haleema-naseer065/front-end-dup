// import React from 'react';
// import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground } from 'react-native';

// interface ScreenProps {
//   backgroundImage: any; // Background crop image
//   iconImage: any; // Rounded corn logo

// }

// const ReusableScreen: React.FC<ScreenProps> = ({
//   backgroundImage,
//   iconImage,

// }) => {
//   return (
//     <ImageBackground source={require("../assets/images/backgroundCrop.jpg")} 
//      style={styles.background}>
//       <View style={styles.container}>
//         <Image source={require('../assets/images/cornlogo.jpeg')} 
//          style={styles.icon} />
//       </View>
//     </ImageBackground>
//   );
// };

// export default ReusableScreen;

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     resizeMode: 'cover',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   container: {
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   icon: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 20,
//   },
// });




// HeaderSection.tsx

import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const BackgroundAndLogo = () => {
  return (
    <View style={styles.container}>
      {/* Background image */}
      <Image 
        source={require("../assets/images/backgroundCrop.jpg")} 
        style={styles.backgroundImage} 
      />

      {/* Circular Corn Image */}
      <View style={styles.emojiContainer}>
        <Image source={require('../assets/images/cornlogo.jpeg')}
         style={styles.cornImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute', // Ensures it stays in the background
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    position:"absolute",
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  emojiContainer: {
    position: 'absolute', // Layer it above the background
    marginTop: height * 0.13, // Adjust for screen layout
    alignItems: 'center',
    zIndex:1,
    top: height * 0.05, // Adjust position as needed
    alignSelf: 'center',
  },
  cornImage: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: (width * 0.25) / 2,
    elevation: 2,
  },
});

export default BackgroundAndLogo;
