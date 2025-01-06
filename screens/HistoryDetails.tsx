import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextStyle, Dimensions } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';

const { width, height } = Dimensions.get('window');
type ResultsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Results'>;

const CalendarApp = () => {
  const navigation = useNavigation<ResultsScreenNavigationProp>();


type RootStackParamList = {
  Detail: { date: string };
};

// type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const urduDays: string[] = ['اتوار', 'پیر', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'];
const urduMonths: string[] = [
  'جنوری', 'فروری', 'مارچ', 'اپریل', 'مئی', 'جون',
  'جولائی', 'اگست', 'ستمبر', 'اکتوبر', 'نومبر', 'دسمبر'
];

// const CalendarApp: React.FC = () => {
  // const navigation = useNavigation<NavigationProp>();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const redMarkedDates: number[] = [7]; // Only red marked dates

  const getMonthData = (year: number, month: number): (number | null)[] => {
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days = Array(firstDay).fill(null);
    for (let day = 1; day <= totalDays; day++) {
      days.push(day);
    }

    while (days.length % 7 !== 0) {
      days.push(null);
    }

    return days;
  };

  const changeMonth = (direction: number): void => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + direction,
      1
    );
    setCurrentDate(newDate);
  };

  const onDatePress = (day: number | null): void => {
    if (day && redMarkedDates.includes(day)) {
      // const dateString = `${urduMonths[currentDate.getMonth()]} ${day}, ${currentDate.getFullYear()}`;
      navigation.navigate('ViewHistoryActivity');
    }
  };

  const getDayStyle = (day: number | null): TextStyle => {
    if (day && redMarkedDates.includes(day)) {
      return { color: 'red', fontWeight: 'bold' };
    }
    return { color: '#333' };
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = getMonthData(year, month);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>پرانے ریکارڈ کی تفصیل</Text>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={() => changeMonth(-1)}>
          <Text style={styles.buttonText}>پچھلا</Text>
        </TouchableOpacity>
        <Text style={styles.month}>
          {urduMonths[month]} {year}
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => changeMonth(1)}>
          <Text style={styles.buttonText}>اگلا</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.calendar}>
        <View style={styles.row}>
          {urduDays.map((day, index) => (
            <Text key={index} style={styles.dayHeader}>
              {day}
            </Text>
          ))}
        </View>
        <FlatList
          data={days}
          numColumns={7}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.dayCell}
              onPress={() => onDatePress(item)}
              disabled={item === null || !redMarkedDates.includes(item)}
            >
              <Text style={[styles.dayText, item !== null && getDayStyle(item)]}>
                {item !== null ? item : ''}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05, // Relative padding
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  header: {
    fontSize: width * 0.07, // Responsive font size
    textAlign: 'center',
    marginTop: height * 0.1, // Relative margin
    marginBottom: height * 0.1, // Relative margin
    fontWeight: 'bold',
    color: '#20432E',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.02, // Responsive margin
  },
  button: {
    backgroundColor: 'rgba(191, 191, 191, 0.85)',
    padding: width * 0.03, // Responsive padding
    borderRadius: 5,
  },
  buttonText: {
    color: '#20432E',
    fontSize: width * 0.04, // Responsive font size
  },
  month: {
    fontSize: width * 0.05, // Responsive font size
    fontWeight: 'bold',
    color: '#333',
  },
  calendar: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: height * 0.02, // Responsive margin
  },
  dayHeader: {
    fontSize: width * 0.04, // Responsive font size
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
    flex: 1,
  },
  dayCell: {
    flex: 1,
    height: height * 0.07, // Responsive height
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  dayText: {
    fontSize: width * 0.04, // Responsive font size
  },
});

export default CalendarApp;
