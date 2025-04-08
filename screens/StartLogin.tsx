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
import axios from "axios";
import { store } from "../redux/store";
import { jwtDecode } from "jwt-decode";
import { login } from "../redux/slice/userSlice";


// Get screen width and height
const { width, height } = Dimensions.get("window");

// Type definition for navigation
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState<string[]>(["", "", "", ""]);
  const pinRefs = useRef<(TextInput | null)[]>([]);

  const handlePhoneChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, "");
    if (numericText.length === 1 && numericText !== "3") return;
    if (numericText.length <= 10) setPhoneNumber(numericText);
  };

  const handlePinChange = (value: string, index: number) => {
    if (/[^0-9]/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    if (value && index < 3) pinRefs.current[index + 1]?.focus();
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace") {
      const newPin = [...pin];
      if (newPin[index] !== "") {
        newPin[index] = "";
        setPin(newPin);
      }
      if (index > 0 && newPin[index] === "") {
        pinRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleLogin = async () => {
    if (pin.some((digit) => digit === "")) {
      Alert.alert("براہ کرم 4 ہندسوں کا پن کوڈ درج کریں۔");
      return;
    }

    try {
      const payload = {
        phoneNumber: "+92" + phoneNumber,
        pin: pin.join(""),
      };

      const response = await axios.post(
        "https://benitrotrack-production.up.railway.app/api/sign-in",
        payload
      );

      if (response.status === 200) {
        const token = response.data.token;
        const decoded: any = jwtDecode(token);

        const role = decoded.role;

        console.log("Login successful:", decoded);
        store.dispatch(login({ token }));

        // Navigate based on role
        if (role === "admin") {
          navigation.replace("AdminScreen");
        } else {
          navigation.replace("Home");
        }
      } else {
        Alert.alert("Login Error", "Something went wrong");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      Alert.alert("لاگ ان ناکام۔ براہ کرم فون نمبر اور پن دوبارہ چیک کریں۔");
    }
  };

  const dismissKeyboard = () => Keyboard.dismiss();

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
                  contextMenuHidden={true}
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
                  onChangeText={(text) =>
                    /^[0-9]$/.test(text) && handlePinChange(text, index)
                  }
                  onKeyPress={({ nativeEvent }) =>
                    handleKeyPress(nativeEvent.key, index)
                  }
                  contextMenuHidden={true}
                  value={pin[index]}
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
              onPress={() => navigation.navigate("StartSignup")}
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
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    marginTop: width * 0.01,
    width: "100%",
  },
  inputRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    width: width * 0.8,
    height: height * 0.08,
    marginBottom: height * 0.011,
    justifyContent: "center",
  },
  inputRow1: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginTop: height * 0.009,
    marginBottom: height * 0.06,
    justifyContent: "center",
  },
  label: {
    fontSize: width * 0.04,
    fontWeight: "600",
    color: "#20462c",
    writingDirection: "rtl",
    marginRight: width * 0.001,
  },
  pinInput: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pinBox: {
    width: width * 0.09,
    height: width * 0.11,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: width * 0.02,
    textAlign: "center",
    fontSize: width * 0.045,
    marginHorizontal: width * 0.015,
  },
  phoneInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    paddingHorizontal: width * 0.1,
    borderRadius: width * 0.05,
    width: "80%",
    paddingVertical: height * 0.006,
  },
  countryCode: {
    fontSize: width * 0.04,
    fontWeight: "600",
    color: "#20462c",
    marginRight: width * 0.02,
  },
  phoneText: {
    fontSize: width * 0.04,
    color: "#20462c",
    flex: 1,
  },
  resetpin: {
    fontSize: width * 0.037,
    color: "#20462c",
    alignSelf: "flex-start",
    marginRight: width * 0.06,
    marginLeft: width * 0.08,
    marginTop: -height * 0.035,
    writingDirection: "rtl",
    fontWeight: "bold",
  },
  loginButton: {
    backgroundColor: "#3A5F47",
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.05,
    borderRadius: width * 0.04,
    marginTop: height * 0.02,
    width: "60%",
    alignItems: "center",
    alignSelf: "center",
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: width * 0.04,
    textAlign: "center",
  },
  footer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.01,
  },
  footerText: {
    fontSize: width * 0.035,
    color: "#757575",
    writingDirection: "rtl",
    textAlign: "center",
  },
  linkText: {
    fontSize: width * 0.04,
    color: "#20462c",
    fontWeight: "600",
    marginTop: -height * 0.004,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
