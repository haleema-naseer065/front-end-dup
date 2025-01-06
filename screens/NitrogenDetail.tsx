import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderComponent from '../components/header';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import NitroTrackContainer from '../components/NitrotrackandCornImage'; // Import the new component
import Results from '../components/WeatherInfo'
type NitrogenDetailNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const { width, height } = Dimensions.get('window');

const NitrogenDetail = () => {
  const navigation = useNavigation<NitrogenDetailNavigationProp>();
  const handleStartAgain = () => {
    navigation.navigate('imageselection');
  };

  return (
    <View style={styles.container}>
      {/* Header Component */}
      <HeaderComponent
        rightIcons={[
          { name: 'home', onPress: () => navigation.navigate('BottomTabNavigator') },
          { name: 'help-outline', onPress: () =>navigation.navigate('Tutorial') },
          { name: 'volume-up', onPress: () => console.log('Volume pressed') },
          { name: 'exit-to-app', onPress: () => navigation.navigate('StartLogin') },
        ]}
        leftIcons={[
          { name: 'arrow-back', onPress: () => navigation.goBack() },
        ]}
      />

      {/* NitroTrackContainer */}
      <NitroTrackContainer />

      <Results/>

      <View style = {styles.resultscontainer}>
        </View>
        <TouchableOpacity style = {styles.againbutton} onPress={handleStartAgain}>
        <Text style = {styles.againText}> دوبارہ شروع کریں </Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    top: 0,
  },
  subtitle: {
    fontSize: width * 0.05,
    color: "#004d00",
    marginVertical: height * 0.35,
    textAlign: "center",
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: "rgba(39, 73, 47, 0.8)",
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.1,
    borderRadius: 40,
    marginVertical: height * 0.02,
    width: "75%",
    alignItems: "center",
    marginTop: height * -0.23,
    marginBottom: height * 0.29,
    borderWidth: 2,
    borderColor: "white",
  },
  buttonText: {
    color: "#FFF",
    fontSize: width * 0.05,
    fontWeight: "bold",
  },
  resultscontainer:{
    backgroundColor:"rgba(39, 73, 47, 0.85)",
    borderColor:'white',
    borderWidth:1,
    borderRadius:12,
    width:width*0.8,
    height:height*0.3,
    alignSelf:'center',
    marginTop: height*0.5,
    marginBottom:height*0.5,
  },
  againbutton:{
    backgroundColor:'white',
    width: width*0.6,
    height: height*0.07,
    marginTop:height * 0.9,
    alignSelf:'center',
    borderRadius:30,
    // zIndex:1,
    position:'absolute',
    alignItems:'center',
  },
  againText:
  {
    color: '#004d00',
    textAlign: 'center',
    fontSize: width* 0.06,
    // marginVertical: height*0.9,
    marginTop: height * 0.011,
  },
});

export default NitrogenDetail;
