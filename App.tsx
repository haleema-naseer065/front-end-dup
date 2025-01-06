// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import BottomTabNavigator from './navigation/BottomTabNavigator'; // Use BottomTabNavigator

// export default function App() {
//   return (
//     <NavigationContainer>
//       <BottomTabNavigator /> {/* Use BottomTabNavigator to handle navigation */}
//     </NavigationContainer>
//   );
// }



// import React, { useState, useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import AppSplashScreen from './screens/splashscreen'; // Import your splash screen
// import BottomTabNavigator from './navigation/BottomTabNavigator'; // Use BottomTabNavigator

// export default function App() {
//   const [isSplashVisible, setIsSplashVisible] = useState(true);

//   useEffect(() => {
//     // Set timeout to hide splash screen after 3 seconds
//     setTimeout(() => {
//       setIsSplashVisible(false); // Hide splash screen after timeout
//     }, 8000);
//   }, []);

//   return (
//     <NavigationContainer>
//       {isSplashVisible ? <AppSplashScreen /> : <BottomTabNavigator />}
//     </NavigationContainer>
//   );
// }


import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppSplashScreen from './screens/splashscreen'; // Import your splash screen
import BottomTabNavigator from './navigation/BottomTabNavigator'; // Use BottomTabNavigator
import StackNavigator from './navigation/StackNavigator';

// Define the App component with TypeScript
const App: React.FC = () => {
  const [isSplashVisible, setIsSplashVisible] = useState<boolean>(true);

  useEffect(() => {
    // Set timeout to hide splash screen after 8 seconds
    const timeout = setTimeout(() => {
      setIsSplashVisible(false); // Hide splash screen after timeout
    }, 500);

    // Clean up timeout when the component unmounts
    return () => clearTimeout(timeout);
  }, []);

  return (
    <NavigationContainer>
      {isSplashVisible ? <AppSplashScreen /> : <StackNavigator />}
    </NavigationContainer>
  );
};

export default App;
