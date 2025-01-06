import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';

const AnimatedSplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0.5)).current; // Initial opacity value: 0.5
  const scaleAnim = useRef(new Animated.Value(1.0)).current; // Initial scale value: 1.0

  useEffect(() => {
    // Animate opacity and scale
    Animated.timing(fadeAnim, {
      toValue: 1, // Fully visible (opacity = 1)
      duration: 500, // Duration of the fade
      useNativeDriver: true,
    }).start();

    Animated.spring(scaleAnim, {
      toValue: 1, // Fully scaled to original size
      friction: 3, // Bounce effect
      tension: 100, // Tension for the spring
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imageContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <Image
          source={require('../assets/images/cornlogo.jpeg')} // Ensure corn.jpeg is located in src/assets
          style={styles.image}
        />
      </Animated.View>
      <Animated.Text style={[styles.text, { opacity: fadeAnim }]}> نائٹرو ٹریک</Animated.Text>
      {/* <Animated.Text style={[styles.arrow, { opacity: fadeAnim }]}>→</Animated.Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2D4B43', // Background color based on the shared image
  },
  imageContainer: {
    width: 120,   // Width and height of the container to make it circular
    height: 120,
    borderRadius: 60, // Half of the width/height to make it a circle
    overflow: 'hidden', // To ensure the image fits inside the circle
    marginBottom: 20,
  },
  image: {
    width: '100%', // Full width and height to fill the circular container
    height: '100%',
    resizeMode: 'cover',
  },
  text: {
    fontSize: 30, // Larger font size for the text
    fontWeight: 'bold', // Bold text
    color: 'white',
    marginTop: 20, // Adjust spacing
  },
  arrow: {
    fontSize: 35, // Larger arrow
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10, // Adjust spacing
  },
});

export default AnimatedSplashScreen;
