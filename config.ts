// import { initializeApp } from 'firebase/app';
// import {
//   initializeAuth,
//   getReactNativePersistence,
// } from 'firebase/auth'; 

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useEffect, useState } from 'react';
        
// const firebaseConfig = {
//   apiKey: 'AIzaSyDNMTC50v_iqhkP_kA4rnX8zMnsl6t6Crs',
//   authDomain: 'crop-maize.firebaseapp.com',
//   projectId: 'crop-maize',
//   storageBucket: 'crop-maize.appspot.com',
//   messagingSenderId: '427707936784',
//   appId: '1:427707936784:web:0995275dc3f70c4afdda95',
// };

// const app = initializeApp(firebaseConfig);

// const auth = initializeAuth(app, {});

// export const useFirebaseReady = () => {
//   const [auth, setAuth] = useState<any>(null);

//   useEffect(() => {
//     const app = initializeApp(firebaseConfig);

//     const initAuth = async () => {
//       const _auth = initializeAuth(app, {
//         persistence: getReactNativePersistence(AsyncStorage),
//       });
//       setAuth(_auth);
//     };

//     initAuth();
//   }, []);

//   return auth;
// };
