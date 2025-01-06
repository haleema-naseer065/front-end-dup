import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, I18nManager } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import HeaderComponent from '../components/header';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

I18nManager.allowRTL(true);

type UsersActivity2RouteProp = RouteProp<RootStackParamList, 'UsersActivity2'>;
type UsersActivity2NavigationProp = StackNavigationProp<RootStackParamList, 'UsersActivity2'>;

type Props = {
    route: UsersActivity2RouteProp;
};

const UserActivity2 = ({ route }: Props) => {
    const navigation = useNavigation<UsersActivity2NavigationProp>();

    const { name,phone } = route.params;

    const tableData = [
        { date1: '3 نومبر 2023', date2: '13 نومبر 2023', date3: '23 نومبر 2023' },
        { date1: '4 نومبر 2023', date2: '14 نومبر 2023', date3: '24 نومبر 2023' },
        { date1: '5 نومبر 2023', date2: '15 نومبر 2023', date3: '25 نومبر 2023' },
        { date1: '6 نومبر 2023', date2: '16 نومبر 2023', date3: '26 نومبر 2023' },
        { date1: '7 نومبر 2023', date2: '17 نومبر 2023', date3: '27 نومبر 2023' },
        { date1: '8 نومبر 2023', date2: '18 نومبر 2023', date3: '28 نومبر 2023' },
    ];

    return (
        <View style={styles.container}>
            {/* Updated Header Component */}
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

            {/* Optional Blur View for Header Background */}
            <View style={styles.header}>
                <BlurView intensity={10} style={styles.tableContainer}>
                    <Text style={styles.title}>{/* Title can be added here if desired */}</Text>
                </BlurView>
            </View>

            {/* User Info Container (including activity header and table) */}
            <View style={styles.infoContainer}>
                {/* User Activity Header */}
                <View style={styles.userActivityHeader}>
                    <Text style={styles.userActivityHeaderText}>یوزرز کی ایکٹیویٹی</Text>
                </View>

                {/* User Name and Phone */}
                <View style={styles.userInfoContainer}>
                    <Text style={styles.userInfoText}>نام: {phone}</Text>
                    <Text style={styles.userInfoText}>فون نمبر: {name}</Text>
                </View>

                {/* Table Section */}
                <View style={styles.tableContainer}>
                    {/* Table Header */}
                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableHeaderCell, styles.borderRight]}>بوائ کی تاریخ</Text>
                        <Text style={[styles.tableHeaderCell, styles.borderRight]}>معائنے کی تاریخ</Text>
                        <Text style={styles.tableHeaderCell}>اگلے معائنے کی تاریخ</Text>
                    </View>

                    {/* Table Rows */}
                    <FlatList
                        data={tableData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, styles.borderRight]}>{item.date1}</Text>
                                <Text style={[styles.tableCell, styles.borderRight]}>{item.date2}</Text>
                                <Text style={styles.tableCell}>{item.date3}</Text>
                            </View>
                        )}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        marginTop: height * 0.05, 
    },

    title: {
        fontSize: width * 0.08,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
    },
    infoContainer: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    userActivityHeader: {
        alignItems: 'center',
        backgroundColor: '#3A5F47',
        paddingVertical: 10,
        borderRadius: 12,
        width: '100%',
    },
    userActivityHeaderText: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    userInfoContainer: {
        marginTop: 15,
    },
    userInfoText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#3A5F47',
        marginBottom: 9,
        textAlign: 'right',
    },
    tableContainer: {
        marginTop: 20,
        backgroundColor: '#F8F8F8',
        padding: 10,
        borderRadius: 10,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#3A5F47',
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderRadius: 10,
        alignSelf: 'center',
        width: '95%',
        marginBottom: 5,
    },
    tableHeaderCell: {
        flex: 1,
        fontSize: 16,
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    borderRight: {
        borderRightWidth: 1,
        borderRightColor: '#FFF',
    },
    tableRow: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
        alignSelf: 'center',
        width: '95%',
    },
    tableCell: {
        flex: 1,
        fontSize: 15,
        color: '#3A5F47',
        textAlign: 'center',
    },
});

export default UserActivity2;