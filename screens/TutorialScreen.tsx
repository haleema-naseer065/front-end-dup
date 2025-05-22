import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Linking, Platform, Alert, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';

const { width, height } = Dimensions.get('window'); // Get screen width and height

const TutorialScreen = () => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>مدد حاصل کریں</Text>
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Video Tutorial Card */}
        <View style={styles.card}>
          <View style={styles.headerContainer}>
            <AntDesign name="questioncircleo" size={20} color="#4B5563" />
            <Text style={styles.headerText}>
              ایپ کے استعمال میں مدد حاصل کرنے کے لیے نیچے دی گئی  ویڈیو کو دیکھیں
            </Text>
          </View>
          <View style={styles.videoContainer}>
            <Video
              ref={video}
              style={styles.video}
              source={require('../assets/videos/tutorial.mp4')}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              isLooping
              shouldPlay={false}
              onPlaybackStatusUpdate={setStatus}
            />
          </View>
        </View>

        {/* Guidelines Card */}
        <View style={styles.card}>
          <View style={styles.headerContainer}>
            <AntDesign name="questioncircleo" size={20} color="#4B5563" />
            <Text style={styles.headerText}>
              نائٹروجن کی درست معلومات کے لیے لی گئی تصویر میں درج ذیل ہدایات کا خیال رکھیں: 
            </Text>
          </View>
          
          <View style={styles.guidelinesContainer}>
            <Text style={styles.guidelineText}>• اپنی ہاتھ کی انگلیوں پر بائیں طرف کافی نائٹروجن مکئی کا پتہ</Text>
            <Text style={styles.guidelineText}>•  دائیں جانب عام پتہ رکھیں جس میں نائٹروجن کھاد کی
            مقدار معلوم کرنی ہے۔</Text>
            <Text style={styles.guidelineText}>• تصویر واضح ہونی چاہیے</Text>
            <Text style={styles.guidelineText}>• تصویر لینے کے بعد تصویر میں سے اپنے پتوں والی جگہ کاٹیں۔</Text>
            <Text style={styles.guidelineText}>• ایک نمونہ تصویر نیچے دی گئی ہے۔</Text>
          </View>
          
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/images/sample.jpg')}
              style={styles.guidelineImageThird}
            />
            <Image
              source={require('../assets/images/cropping.jpg')}
              style={styles.guidelineImageThird}
            />
          </View>
        </View>

        {/* Helpline Card */}
        <View style={styles.card}>
          <Text style={styles.helplineText}>مزید معلومات کے لیے اس نمبر پر کال کریں</Text>
          <TouchableOpacity onPress={() => Linking.openURL(`tel:${'03217643828'}`)}>
            <Text style={[styles.phoneNumber, styles.phoneLink]}>0321-7643828</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    marginTop: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headingText: {
    fontSize: width < 350 ? 18 : 24, // Adjust font size based on screen width
    fontWeight: 'bold',
    color: '#000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: '#D9D9D9',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  headerContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
    marginBottom: 12,
  },
  headerText: {
    color: '#1F2937',
    textAlign: 'right',
    flex: 1,
    fontSize: width < 350 ? 14 : 16, // Adjust font size for smaller screens
  },
  videoContainer: {
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
    borderRadius: 8,
  },
  guidelinesContainer: {
    gap: 8,
    marginBottom: 16,
  },
  guidelineText: {
    color: '#20432E',
    textAlign: 'right',
    fontSize: width < 350 ? 14 : 16, // Adjust font size for smaller screens
    marginRight: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
    flexWrap: 'wrap', // Ensures the images wrap to the next line on smaller screens
  },
  guidelineImageThird: {
    width: width < 350 ? '45%' : '31%', // Adjust width based on screen size
    height: 150,
    borderRadius: 6,
    resizeMode: 'cover',
  },
  helplineText: {
    color: '#1F2937',
    textAlign: 'right',
    fontSize: width < 350 ? 14 : 16, // Adjust font size for smaller screens
  },
  phoneNumber: {
    color: 'green',
    textAlign: 'right',
    marginTop: 4,
    fontSize: width < 350 ? 16 : 18, // Adjust font size for smaller screens
    fontWeight: '500',
  },
  phoneLink: {
    color: '#2563EB',
    textDecorationLine: 'underline',
  },
});

export default TutorialScreen;
