import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import HeaderComponent from '../components/header';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';

type RegisteredUserScreen = StackNavigationProp<RootStackParamList, 'Home'>;

const { width, height } = Dimensions.get('window');

interface User {
  id: string;
  name: string;
  phone: string;
}

const RegisteredUsersScreen = () => {
  const navigation = useNavigation<RegisteredUserScreen>();
  // Sample data
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'محمد اکرم', phone: '03245678976' },
    { id: '2', name: 'محمد اسلام', phone: '03245678978' },
    { id: '3', name: 'محمد عامر', phone: '03245678967' },
    { id: '4', name: 'محمد عاصف', phone: '03245678983' },
    { id: '5', name: 'محمد سلمان', phone: '03456789823' },
  
  ]);

  // Function to handle user deletion
  const deleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  // Confirmation Alert
  const confirmDelete = (userId: string) => {
    Alert.alert(
      'کیا آپ واقعی ڈیلیٹ کرنا چاہتے ہیں؟',
      '',
      [
        { text: 'نہیں', style: 'cancel' },
        { text: 'جی ہاں', onPress: () => deleteUser(userId) },
      ]
    );
  };

  const renderItem = ({ item }: { item: User }) => (
  <View style={styles.row}>
    <Text style={[styles.cell, styles.id]}>{item.id}</Text>
    <Text style={[styles.cell, styles.name]}>{item.name}</Text>
    <Text style={[styles.cell, styles.phone]}>{item.phone}</Text>
    <TouchableOpacity onPress={() => confirmDelete(item.id)} style={[styles.cell, styles.iconContainer]}>
      <MaterialIcons name="delete" size={24} color="#C4C4C4" />
    </TouchableOpacity>
  </View>
);

  return (
    
    <View style={styles.container}>
      {/* Header Component */}
      <HeaderComponent
        rightIcons={[
            { name: 'home', onPress: () => navigation.navigate('AdminScreen') },
            // { name: 'help-outline', onPress: () =>navigation.navigate('Tutorial') },
            // { name: 'volume-up', onPress: () => console.log('Volume pressed') },
            { name: 'exit-to-app', onPress: () => navigation.navigate('StartLogin') },
          ]}
          leftIcons={[
            { name: 'arrow-back', onPress: () => navigation.goBack() },
          ]}
        containerStyle={styles.headerStyle}
      />
      {/* NitroTrack Component */}
      <View style={styles.nitroTrackContainer}>
        <Text style={styles.nitroTrackText}>نائٹرو ٹریک</Text>
        <Text style={styles.nitrogenAppText}>نائیٹروجن ایپ</Text>
      </View>

      <Text style={styles.headerTitle}>رجسٹرڈ یوزرز</Text>

      <View style={styles.tableContainer}>
      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, styles.id]}>ID</Text>
        <Text style={[styles.headerCell, styles.name]}>نام</Text>
        <Text style={[styles.headerCell, styles.phone]}>فون نمبر</Text>
        <Text style={[styles.headerCell, styles.iconContainer]}>ڈیلیٹ کریں</Text>
      </View>

      {/* User List */}
      <FlatList
      data={users}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.tableBody}
      />
     </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#F3F3F3',
  },
  headerStyle: {
    width: '100%', // Ensure it spans the entire screen
    paddingHorizontal: 0, // Remove padding
    alignSelf: 'stretch', // Force it to stretch
    backgroundColor: '#D9D9D9',
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
    alignSelf: 'center',
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
  headerTitle: {
    marginTop: height * 0.07,
    fontSize: width * 0.06,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: height * 0.02,
    color: "rgba(39, 73, 47, 0.9)",
  },
  tableContainer: {
    width: '90%', // Set the table width to 90% of the screen width
    alignSelf: 'center', // Center the table horizontally
    marginTop: height * 0.02, // Add spacing from the top
    backgroundColor: '#FFFFFF', // Optional: background color for the container
    borderRadius: 10, // Optional: rounded corners
    overflow: 'hidden', // Prevent overflow
    elevation: 2, // Optional: shadow for Android
    shadowColor: '#000', // Optional: shadow for iOS
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  tableHeader: {
    flexDirection: 'row-reverse',
    backgroundColor: "rgba(39, 73, 47, 0.9)",
    paddingVertical: height * 0.015,
    borderTopLeftRadius: 10, // Rounded corners for the top
    borderTopRightRadius: 10,
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
  tableBody: {
    marginTop: 0, // Ensure no extra margin within the table
  },
  row: {
    flexDirection: 'row-reverse',
    backgroundColor: '#FFFFFF',
    paddingVertical: height * 0.015,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: width * 0.04,
  },
  id: {
    flex: 1, // Width for the ID column
  },
  name: {
    flex: 2, // Width for the name column
  },
  phone: {
    flex: 2, // Width for the phone column
  },
  iconContainer: {
    flex: 1, // Width for the icon column
    alignItems: 'center',
  },
});
export default RegisteredUsersScreen;