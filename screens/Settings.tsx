import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type SettingsNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

// Get the device's width and height for responsiveness
const { width, height } = Dimensions.get('window');

const SettingsScreenUrdu = () => {
  const navigation = useNavigation<SettingsNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="settings-outline" size={35} color="#333" style={styles.headerIcon} />
        <Text style={styles.headerText}>سیٹنگز</Text>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("EditProfile")}>
          <Ionicons name="person-outline" size={20} color="#555" style={styles.optionIcon} />
          <Text style={styles.optionText}>اپنے اکاؤنٹ کی معلومات تبدیل کریں</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("Tutorial")}>
          <Ionicons name="call-outline" size={20} color="#555" style={styles.optionIcon} />
          <Text style={styles.optionText}>ہیلپ لائن پر کال کریں</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("Tutorial")}>
          <Ionicons name="help-circle-outline" size={20} color="#555" style={styles.optionIcon} />
          <Text style={styles.optionText}>ایپ سے متعلق مدد حاصل کریں</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    padding: width * 0.05, // Use percentage-based padding for responsiveness
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#f5f5f5",
    width: "100%",
  },
  headerIcon: {
    marginTop: height * 0.02, // Use percentage-based margin for responsiveness
    marginBottom: height * 0.01, // Space between icon and text
  },
  headerText: {
    fontSize: width * 0.05, // Make font size responsive
    fontWeight: "bold",
    color: "#333",
  },
  optionsContainer: {
    marginTop: height * 0.02, // Use dynamic margin based on screen height
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: height * 0.02, // Use percentage-based padding for responsiveness
    paddingHorizontal: width * 0.04, // Add responsive horizontal padding
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionIcon: {
    marginRight: width * 0.03, // Responsive margin for icon
  },
  optionText: {
    fontSize: width * 0.04, // Make font size responsive
    textAlign: "right", // Align text to the right for Urdu
    flex: 1, // Ensure text takes up remaining space
    color: "#555",
  },
});

export default SettingsScreenUrdu;
