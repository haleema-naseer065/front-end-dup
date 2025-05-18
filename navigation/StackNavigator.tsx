// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import { RootStackParamList } from '../types'; // Import RootStackParamList
// import HomeScreen from '../screens/HomeScreen';
// import TutorialScreen from '../screens/TutorialScreen';
// import Settings from '../screens/Settings';
// import MaizeTypes from '../screens/MaizeTypes'; // Import your screen
// import HistoryDetails from '../screens/HistoryDetails'; // Import another screen (e.g., Details screen)
// import imageselection from '../screens/imageselection';
// import LandingScreenAfterSplash from '../screens/LandingScreenAfterSplash';
// import StartSignup from '../screens/StartSignup';
// import StartLogin from '../screens/StartLogin';
// import ConfirmPin from '../screens/ConfirmPin';
// import BottomTabNavigator from '../navigation/BottomTabNavigator';
// import NitrogenDetail from '../screens/NitrogenDetail';
// import ProcessingScreen from '../screens/ProcessingScreen';
// import FertilizersRecommendation from '../screens/FertilizersRecommendation';
// import ViewResults from '../screens/ViewResults';
// import ResultsScreen from '../screens/ResultsScreen';
// import SignupVerify from '../screens/SignupVerify';
// import SignupPin from '../screens/SignupPin';
// import SignupName from '../screens/SignupName';
// import EditProfile from '../screens/EditProfile';
// import AdminorUserScreen from '../screens/AdminorUserScreen';
// import AdminScreen from '../screens/AdminScreen';
// import RegisteredUsersScreen from '../screens/RegisteredUsersScreen';
// import UsersActivity1 from '../screens/UsersActivity1';
// import UsersActivity2 from '../screens/UsersActivity2';
// import ViewHistoryActivity from '../screens/ViewHistoryActivity';
// import { useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
// const Stack = createStackNavigator();

// const StackNavigator = () => {
//   const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

//   return (
//     <Stack.Navigator initialRouteName="LandingScreenAfterSplash">
//       <Stack.Screen name="LandingScreenAfterSplash" component={LandingScreenAfterSplash} options={{ headerShown: false }} />
//       <Stack.Screen name="StartSignup" component={StartSignup} options={{ headerShown: false }} />
//       <Stack.Screen name="SignupVerify" component={SignupVerify} options={{ headerShown: false }} />
//       <Stack.Screen name="SignupPin" component={SignupPin} options={{ headerShown: false }} />
//       <Stack.Screen name="ConfirmPin" component={ConfirmPin} options={{ headerShown: false }} />
//       <Stack.Screen name="SignupName" component={SignupName} options={{ headerShown: false }} />
//       <Stack.Screen name="StartLogin" component={StartLogin} options={{ headerShown: false }} />

//       <Stack.Screen name="AdminorUserScreen" component={AdminorUserScreen} options={{ headerShown: false }} />
//       <Stack.Screen name="AdminScreen" component={AdminScreen} options={{ headerShown: false }} />
//       <Stack.Screen name="RegisteredUsersScreen" component={RegisteredUsersScreen} options={{ headerShown: false }} />
//       <Stack.Screen name="UsersActivity1" component={UsersActivity1} options={{ headerShown: false }} />
//       <Stack.Screen name="UsersActivity2" component={UsersActivity2} options={{ headerShown: false }} />
//       <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
//       <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{ headerShown: false }} />

//       <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
//       <Stack.Screen name="Tutorial" component={TutorialScreen} options={{ headerShown: false }} />
//       <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
//       <Stack.Screen name="MaizeTypes" component={MaizeTypes} options={{ headerShown: false }} />
//       <Stack.Screen name="HistoryDetails" component={HistoryDetails} options={{ headerShown: false }} />
//       <Stack.Screen name="imageselection" component={imageselection} options={{ headerShown: false }} />
//       <Stack.Screen name="ProcessingScreen" component={ProcessingScreen} options={{ headerShown: false }} />
//       <Stack.Screen name="ViewResults" component={ViewResults} options={{ headerShown: false }} />
//       <Stack.Screen name="NitrogenDetail" component={NitrogenDetail} options={{ headerShown: false }} />
//       <Stack.Screen name="FertilizersRecommendation" component={FertilizersRecommendation} options={{ headerShown: false }} />
//       <Stack.Screen name="ResultsScreen" component={ResultsScreen} options={{ headerShown: false }} />
//       <Stack.Screen name="ViewHistoryActivity" component={ViewHistoryActivity} options={{ headerShown: false }} />
//     </Stack.Navigator>
//   );
// };

// export default StackNavigator;

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { RootStackParamList } from '../types';

// Screens
import LandingScreenAfterSplash from '../screens/LandingScreenAfterSplash';
import StartSignup from '../screens/StartSignup';
import StartLogin from '../screens/StartLogin';
import ConfirmPin from '../screens/ConfirmPin';
import SignupVerify from '../screens/SignupVerify';
import SignupPin from '../screens/SignupPin';
import SignupName from '../screens/SignupName';
import AdminorUserScreen from '../screens/AdminorUserScreen';
import AdminScreen from '../screens/AdminScreen';
import RegisteredUsersScreen from '../screens/RegisteredUsersScreen';
import UsersActivity1 from '../screens/UsersActivity1';
import UsersActivity2 from '../screens/UsersActivity2';
import EditProfile from '../screens/EditProfile';
import BottomTabNavigator from '../navigation/BottomTabNavigator';
import HomeScreen from '../screens/HomeScreen';
import TutorialScreen from '../screens/TutorialScreen';
import Settings from '../screens/Settings';
import MaizeTypes from '../screens/MaizeTypes';
import HistoryDetails from '../screens/HistoryDetails';
import imageselection from '../screens/imageselection';
import NitrogenDetail from '../screens/NitrogenDetail';
import ProcessingScreen from '../screens/ProcessingScreen';
import FertilizersRecommendation from '../screens/FertilizersRecommendation';
import ViewResults from '../screens/ViewResults';
import ResultsScreen from '../screens/ResultsScreen';
import ViewHistoryActivity from '../screens/ViewHistoryActivity';

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  return (
    <Stack.Navigator
      initialRouteName={
        !isAuthenticated
          ? 'LandingScreenAfterSplash'
          : user?.role === 'admin'
          ? 'AdminScreen'
          : 'BottomTabNavigator'
      }
    >
      {!isAuthenticated && (
        <>
          <Stack.Screen name="LandingScreenAfterSplash" component={LandingScreenAfterSplash} options={{ headerShown: false }} />
          <Stack.Screen name="StartSignup" component={StartSignup} options={{ headerShown: false }} />
          <Stack.Screen name="SignupVerify" component={SignupVerify} options={{ headerShown: false }} />
          <Stack.Screen name="SignupPin" component={SignupPin} options={{ headerShown: false }} />
          <Stack.Screen name="ConfirmPin" component={ConfirmPin} options={{ headerShown: false }} />
          <Stack.Screen name="SignupName" component={SignupName} options={{ headerShown: false }} />
          <Stack.Screen name="StartLogin" component={StartLogin} options={{ headerShown: false }} />
        </>
      )}

      {isAuthenticated && user?.role === 'admin' && (
        <>
          <Stack.Screen name="AdminScreen" component={AdminScreen} options={{ headerShown: false }} />
          <Stack.Screen name="RegisteredUsersScreen" component={RegisteredUsersScreen} options={{ headerShown: false }} />
          <Stack.Screen name="UsersActivity1" component={UsersActivity1} options={{ headerShown: false }} />
          <Stack.Screen name="UsersActivity2" component={UsersActivity2} options={{ headerShown: false }} />
          
        </>
      )}

      {isAuthenticated && user?.role !== 'admin' && (
        <>
          <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{ headerShown: false }} />
        </>
      )}

      {/* Shared Screens */}
      <Stack.Screen name="AdminorUserScreen" component={AdminorUserScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Tutorial" component={TutorialScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
      <Stack.Screen name="MaizeTypes" component={MaizeTypes} options={{ headerShown: false }} />
      <Stack.Screen name="HistoryDetails" component={HistoryDetails} options={{ headerShown: false }} />
      <Stack.Screen name="imageselection" component={imageselection} options={{ headerShown: false }} />
      <Stack.Screen name="ProcessingScreen" component={ProcessingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ViewResults" component={ViewResults} options={{ headerShown: false }} />
      <Stack.Screen name="NitrogenDetail" component={NitrogenDetail} options={{ headerShown: false }} />
      <Stack.Screen name="FertilizersRecommendation" component={FertilizersRecommendation} options={{ headerShown: false }} />
      <Stack.Screen name="ResultsScreen" component={ResultsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ViewHistoryActivity" component={ViewHistoryActivity} options={{ headerShown: false }} />
      <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
