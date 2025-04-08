import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Card from "../components/Card";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

// Get screen width and height
const { width, height } = Dimensions.get("window");

// Type definition for navigation
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState<string[]>(["", "", "", ""]); // State for PIN
  const pinRefs = useRef<(TextInput | null)[]>([]);

  const handlePhoneChange = (text: string) => {
    // Replace non-numeric characters with an empty string
    const numericText = text.replace(/[^0-9]/g, "");
  
    if (numericText.length === 1 && numericText !== "3") {
      return; // Don't allow input if the first digit is not '3'
    }
  
    if (numericText.length <= 10) {
      setPhoneNumber(numericText);
    }
  };

  const handlePinChange = (value: string, index: number) => {
    // Only allow numeric input
    if (/[^0-9]/.test(value)) return; // If value is non-numeric, do nothing

    const newPin = [...pin];
    newPin[index] = value; // Update the current index with the value
    setPin(newPin); // Set the updated pin state

    // If the current input is not empty, move focus to the next input
    if (value && index < 3) {
      pinRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace") {
      const newPin = [...pin];
  
      // If the box is not empty, do not move the cursor to the previous box
      if (newPin[index] !== "") {
        newPin[index] = ""; // Clear the current PIN value
        setPin(newPin); // Update the PIN state
      }
  
      // Only move focus to the previous box if the current one is empty
      if (index > 0 && newPin[index] === "") {
        pinRefs.current[index]?.focus(); // Keep focus in the same box
      }
    }
  };

  const handleLogin = () => {
    // Check if phone number and PIN are valid
    if (phoneNumber.length !== 10) {
      Alert.alert( "براہ کرم ایک درست 10 ہندسوں کا فون نمبر درج کریں۔");
      return;
    }

    if (pin.some((digit) => digit === "")) {
      Alert.alert( "براہ کرم 4 ہندسوں کا پن کوڈ درج کریں۔");
      return;
    }

    // If both phone number and PIN are valid, navigate to the next screen
    navigation.replace("AdminorUserScreen");
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Card
          height={399}
          width="80%"
          backgroundColorTop="#3A5F47"
          backgroundColorBottom="#FFFFFF"
          borderRadius={15}
          topText="لاگ ان"
          topTextStyle={{ fontSize: 24 }}
        >
          <View style={styles.inputContainer}>
            <View style={styles.inputRow}>
              <View style={styles.phoneInput}>
                <Text style={styles.countryCode}>PK | +92</Text>
                <TextInput
                  style={styles.phoneText}
                  placeholder="331 803203"
                  placeholderTextColor="#757575"
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={phoneNumber}
                  onChangeText={handlePhoneChange}
                  contextMenuHidden={true} // Disable context menu
                />
              </View>
            </View>
          </View>

          <View style={styles.inputRow1}>
            <Text style={styles.label}>پن کوڈ:</Text>
            <View style={styles.pinInput}>
              {[...Array(4)].map((_, index) => (
                <TextInput
                  key={index}
                  style={styles.pinBox}
                  maxLength={1}
                  keyboardType="number-pad"
                  ref={(ref) => (pinRefs.current[index] = ref)}
                  onChangeText={(text) => /^[0-9]$/.test(text) && handlePinChange(text, index)}
                  onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                  contextMenuHidden={true} // Disable context menu
                  value={pin[index]} // Set the value of each PIN input
                />
              ))}
            </View>
          </View>

          <Text style={styles.resetpin}>پن کوڈ دوبارہ سیٹ کریں</Text>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>لاگ ان</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>پہلے اکاؤنٹ نہیں ہے؟</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("StartSignup")} // Navigate to StartSignup screen
            >
              <Text style={styles.linkText}>نیا اکاؤنٹ بنائیں</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  // Styles remain unchanged
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    justifyContent: "center",
    alignItems: "center",
  },
  // backIcon: {
  //   position: "absolute",
  //   top: height * 0.05,
  //   left: width * 0.05,
  // },
  inputContainer: {
    marginTop: width *0.01,
    width: "100%",
  },
  inputRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    width:width*0.8,
    height: height*0.08,
    marginBottom: height*0.011,
    justifyContent: "center",
  },
  inputRow1: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginTop:height *0.009,
    marginBottom: height*0.06,
    justifyContent: "center",
  },
  label: {
    fontSize: width * 0.04, // Responsive font size
    fontWeight: "600",
    color: "#20462c",
    writingDirection: "rtl",
    marginRight: width * 0.001, // Responsive margin
  },
  pinInput: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pinBox: {
    width: width * 0.09, // Responsive width
    height: width * 0.11, // Responsive height
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: width * 0.02, // Responsive border radius
    textAlign: "center",
    fontSize: width * 0.045, // Responsive font size
    marginHorizontal: width * 0.015, // Responsive margin
  },
  phoneInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    paddingHorizontal: width * 0.10, // Responsive padding
    borderRadius: width * 0.05, // Responsive border radius
    width: "80%",
    paddingVertical: height * 0.006, // Responsive padding
  },
  countryCode: {
    fontSize: width * 0.04, // Responsive font size
    fontWeight: "600",
    color: "#20462c",
    marginRight: width * 0.02, // Responsive margin
  },
  phoneText: {
    fontSize: width * 0.04, // Responsive font size
    color: "#20462c",
    flex: 1,
  },
  resetpin: {
    fontSize: width * 0.037, // Responsive font size
    color: "#20462c",
    alignSelf: "flex-start",
    marginRight: width * 0.06, // Responsive margin
    marginLeft: width * 0.08, // Responsive margin
    marginTop: -height * 0.035, // Responsive margin
    writingDirection: "rtl",
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: "#3A5F47",
    paddingVertical: height * 0.01, // Responsive padding
    paddingHorizontal: width * 0.05, // Responsive padding
    borderRadius: width * 0.04, // Responsive border radius
    marginTop: height * 0.02, // Responsive margin
    width: "60%",
    alignItems: "center",
    alignSelf: "center",
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: width * 0.04, // Responsive font size
    textAlign: "center",
  },
  footer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.01, // Responsive margin
  },
  footerText: {
    fontSize: width * 0.035, // Responsive font size
    color: "#757575",
    writingDirection: "rtl",
    textAlign: "center",
  },
  linkText: {
    fontSize: width * 0.04, // Responsive font size
    color: "#20462c",
    fontWeight: "600",
    marginTop: -height * 0.004, // Responsive margin
    textAlign: "center",
    textDecorationLine: "underline", 
  },
});
export default LoginScreen;
