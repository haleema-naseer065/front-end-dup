import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import HeaderComponent from '../components/header'; // Importing the HeaderComponent

//import { Ionicons } from '@expo/vector-icons';

type UsersActivity1NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const UsersActivity1 = () => {
  const navigation = useNavigation<UsersActivity1NavigationProp>(); 

  const users = [
    { id: '1', phone: 'محمد اکرم', name: '03245078976' },
    { id: '2', phone: 'محمد اسلم', name: '03245679876' },
    { id: '3', phone: 'محمد عادل', name: '03245678907' },
    { id: '4', phone: 'محمد باسط', name: '03245679823' },
    { id: '5', phone: 'محمد عمر', name: '03240698477' },
    { id: '6', phone: 'دانش علی', name: '03240765481' },
    { id: '7', phone: 'فہد حسن', name: '03249875642' },
    { id: '8', phone: 'عمران شاہ', name: '03246789021' },
    { id: '9', phone: 'احمد شفیق', name: '03249987655' },
  ];

  return (
    <View style={styles.container}>
      {/* Header Component */}
      <HeaderComponent
        rightIcons={[
          { name: 'home', onPress: () => navigation.navigate('AdminScreen') },
          // { name: 'help-outline', onPress: () => navigation.navigate('Tutorial') },
          // { name: 'volume-up', onPress: () => console.log('Volume pressed') },
          { name: 'exit-to-app', onPress: () => navigation.navigate('StartLogin') },
        ]}
        leftIcons={[
          { name: 'arrow-back', onPress: () => navigation.goBack() },
        ]}
      />

      {/* Rectangle */}
      <View style={styles.rectangle}>
        <Text style={styles.title}>نائٹرو ٹریک</Text>
        <Text style={styles.subtitle}>نائٹروجن ایپ</Text>
      </View>
      {/* <HeaderComponent */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>یوزر کی ایکٹیویٹی</Text>
      </TouchableOpacity>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderCell, styles.tableHeaderCellBorder]}>فون نمبر</Text>
        <Text style={styles.tableHeaderCell}>نام</Text>
      </View>

      {/* FlatList */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('UsersActivity2', {
                name: item.name,
                phone: item.phone,
              })
            }
          >
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.nameCell]}>{item.name}</Text>
              <Text style={styles.tableCell}>{item.phone}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  rectangle: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: height*0.05,
    marginTop: height * 0.13, 
    alignSelf: 'center',
    width: width * 0.5, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    borderColor: '#3A5F47',
    borderWidth: 2.5,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#3A5F47',
  },
  subtitle: {
    fontSize: 15,
    color: '#555',
    marginTop: 5,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#3A5F47',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginBottom: 15,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  tableContainer: {
    marginHorizontal:width*1.6, 
  },

  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#3A5F47',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  tableHeaderCell: {
    flex: 1,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  tableHeaderCellBorder: {
    borderRightWidth: 1,
    borderRightColor: '#FFF',
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingVertical: 14,
    paddingHorizontal: 9,
    marginVertical: 0,
    marginHorizontal:0,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 4,
    alignItems: 'center',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
  },
  nameCell: {
    borderRightWidth: 1,
    borderRightColor: '#CCC',
  },
});

export default UsersActivity1;
