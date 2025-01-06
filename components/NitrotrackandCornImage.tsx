import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const NitroTrackContainer = () => {
  return (
    <View style={styles.container}>
      {/* NitroTrack Text Container */}
      <View style={styles.nitroTrackContainer}>
        <Text style={styles.nitroTrackText}>نائٹرو ٹریک</Text>
        <Text style={styles.nitrogenAppText}>نائیٹروجن ایپ</Text>
      </View>

      {/* Background Image */}
      <Image
        source={require("../assets/images/cornBackground.jpeg")}
        style={styles.backgroundImage}
      />
      {/* Dark Overlay */}
      <View style={styles.overlay} />
    </View>
  );
};

export default NitroTrackContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute', // Ensures it stays in the background
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '60%',
    resizeMode: 'cover',
    // zIndex:1,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '60%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Adjust the alpha (last value) for desired darkness
    // zIndex: 1,
  },
  nitroTrackContainer: {
    marginTop: height * 0.13,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.06,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '50%',
    height: height * 0.1,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#006400',
    zIndex: 2, // Keeps this container above the image'
    marginLeft: width * 0.24,
  },
  nitroTrackText: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#004d00',
    marginTop: height * 0.002,
    textAlign: 'center',
  },
  nitrogenAppText: {
    fontSize: width * 0.03,
    color: '#000000',
    fontWeight: 'bold',
  },
});
