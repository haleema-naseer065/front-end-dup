import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  Dimensions,
} from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import { MaterialIcons } from '@expo/vector-icons';


// Your OpenWeatherMap API Key
const WEATHER_API_KEY = "281b1eccbe377336d610ed678c546b94";

const { width, height } = Dimensions.get("window");

interface LocationData {
  latitude: number;
  longitude: number;
}

interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
}

const WeatherComponent = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getLocationAndWeather();
  }, []);

  const getLocationAndWeather = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "مقام تک رسائی کی اجازت درکار ہے",
        "اس ایپ کو آپ کے مقام تک رسائی کی اجازت کی ضرورت ہے تاکہ موسم کی معلومات دکھا سکیں۔"
      );
      setError("مقام کی اجازت ضروری ہے");
      return;
    }

    const locationData = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    const { latitude, longitude } = locationData.coords;
    setLocation({ latitude, longitude });

    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API_KEY}&lang=ur`
      );
      setWeather(weatherResponse.data);
    } catch (error) {
      setError("موسم کی معلومات حاصل کرنے میں مسئلہ آیا۔");
    }
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.weatherContainer}>
        <Text style={styles.temperature}>
          درجہ حرارت: {weather?.main?.temp}°C
        </Text>
      {/* <View style={styles.weatherIcon}>
          <Image
            source={{
              uri: https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png,
            }}
            style={styles.icon}
          /> */}
          {/* <Text style={styles.weatherDescription}> */}
            {/* {weather?.weather[1]?.description} */}
          {/* </Text> */}
          </View>
      </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  weatherContainer: {
    width: width * 0.6, // 80% of screen width
    height: height * 0.1, // 10% of screen height
    borderColor: "#006400",
    borderWidth: 2,
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginTop:height*0.29,
    alignSelf:'center',
  },
  temperature: {
    fontSize: width * 0.045, // Scaled font size
    textAlign: "center",
    color: "#444",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: width * 0.04, // Scaled font size
    color: "red",
    textAlign: "center",
  },
});

export default WeatherComponent;
